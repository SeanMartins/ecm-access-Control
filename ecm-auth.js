// ecm-auth.js v3 — Anti-logout definitivo con authStateReady()
import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, doc, getDoc, addDoc, collection, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged, signOut, setPersistence, browserLocalPersistence } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const FB = {
  apiKey: "AIzaSyBfq6dHq7JQRC2AtBf7obTM6End2NftwxA",
  authDomain: "ecm-access-control.firebaseapp.com",
  projectId: "ecm-access-control",
  storageBucket: "ecm-access-control.firebasestorage.app",
  messagingSenderId: "727782311741",
  appId: "1:727782311741:web:4aaf570b1a05caf4192754"
};

const SUPER_ADMIN_EMAIL = 'martinsosem@gmail.com';
const PAGINA_LOGIN = 'ecm-login.html';

let _app, _db, _auth, _persistenceReady = false;
let _currentUser = null, _profilo = null;

function getApp() {
  if (!_app) _app = getApps().length ? getApps()[0] : initializeApp(FB);
  return _app;
}
function getDB() {
  if (!_db) _db = getFirestore(getApp());
  return _db;
}

async function getAuthInstance() {
  if (!_auth) {
    _auth = getAuth(getApp());
    // Imposta persistenza locale UNA SOLA VOLTA e ASPETTA il completamento
    // Questo è critico: senza await, la sessione potrebbe non essere persistente
    try {
      await setPersistence(_auth, browserLocalPersistence);
    } catch(e) {
      console.warn('Auth: setPersistence fallito', e);
    }
  }
  return _auth;
}

// authStateReady() — aspetta che Firebase carichi lo stato dalla cache locale
// Questo è il modo ufficiale Firebase 10+ per evitare il flash-logout
async function waitForAuthReady(auth) {
  // Firebase 10.x ha authStateReady() — usiamolo se disponibile
  if (typeof auth.authStateReady === 'function') {
    await auth.authStateReady();
    return auth.currentUser;
  }
  
  // Fallback per versioni precedenti: Promise che aspetta onAuthStateChanged
  return new Promise((resolve) => {
    const unsub = onAuthStateChanged(auth, (user) => {
      unsub();
      resolve(user);
    });
  });
}

function getModuloCorrente() {
  const page = window.location.pathname.split('/').pop().replace('.html','');
  const mappa = {
    'ecm-blocco2':'blocco2','ecm-blocco3':'blocco3','ecm-blocco4':'blocco4',
    'ecm-blocco5':'blocco5','ecm-blocco6':'blocco6','ecm-blocco7':'blocco7',
    'congress-programma':'congress','congress-checkin':'congress','congress-agenda':'congress',
    'congress-report':'congress','congress-certificato':'congress','congress-archivio':'congress',
    'convention-manager':'convention','convention-programma':'convention','convention-stand':'convention',
    'convention-checkin':'convention','convention-catering':'convention','convention-navette':'convention',
    'convention-report':'convention','wedding-manager':'wedding','ecm-pagamenti':'pagamenti',
    'ecm-admin':'admin','ecm-superadmin':'superadmin','ecm-certificati':'certificati','ecm-scarica-certificato':'pubblico','congress-dashboard':'congress',
    'ecm-fad-admin':'fad','ecm-fad-corso':'pubblico'
  };
  return mappa[page] || 'ecm';
}

function isScaduto(profilo) {
  if (!profilo?.dataFine) return false;
  const fine = new Date(profilo.dataFine);
  fine.setHours(23, 59, 59);
  return fine < new Date();
}

function hasModuloPermesso(profilo, modulo) {
  if (!profilo) return false;
  if (profilo.email === SUPER_ADMIN_EMAIL) return true;
  if (profilo.stato === 'sospeso' || profilo.stato === 'in_attesa') return false;
  if (isScaduto(profilo)) return false;
  const moduli = profilo.moduli || ['tutti'];
  if (moduli.includes('tutti') || moduli.includes(modulo)) return true;
  if (modulo === 'ecm') return true;
  return false;
}

async function caricaProfilo(user) {
  if (user.email === SUPER_ADMIN_EMAIL) {
    _profilo = {
      uid: user.uid, email: user.email, ruolo: 'superadmin',
      nome: 'Martins', cognome: 'Osemwengie', moduli: ['tutti']
    };
    localStorage.setItem('ecm_profilo', JSON.stringify({ ruolo: 'superadmin', email: user.email }));
    return;
  }
  try {
    const uDoc = await getDoc(doc(getDB(), 'utenti', user.uid));
    if (uDoc.exists()) {
      _profilo = { uid: user.uid, ...uDoc.data() };
    } else {
      _profilo = { uid: user.uid, email: user.email, ruolo: 'viewer', moduli: ['ecm'] };
    }
    // Salva profilo per layout.js (isSuperAdmin)
    localStorage.setItem('ecm_profilo', JSON.stringify({
      ruolo: _profilo.ruolo || 'viewer',
      email: _profilo.email || user.email
    }));
    // Salva branding se presente
    const _p = _profilo;
    if (_p.brandNome || _p.brandLogo) {
      localStorage.setItem('ecm_brand', JSON.stringify({
        nome: _p.brandNome || null,
        sub:  _p.brandSub  || null,
        logo: _p.brandLogo || null,
      }));
    } else {
      localStorage.removeItem('ecm_brand');
    }
  } catch(e) {
    console.warn('Auth: errore caricamento profilo Firestore', e.message);
    // In caso di errore rete, usa il profilo cached se disponibile
    const cached = localStorage.getItem('ecm_profilo');
    if (cached) {
      try {
        const cp = JSON.parse(cached);
        _profilo = { uid: user.uid, email: user.email, ruolo: cp.ruolo || 'viewer', moduli: ['tutti'] };
      } catch(_) {}
    }
    if (!_profilo) {
      _profilo = { uid: user.uid, email: user.email, ruolo: 'viewer', moduli: ['ecm'] };
    }
  }
}

// ── requireAuth — versione definitiva con authStateReady() ──────
export async function requireAuth() {
  const auth = await getAuthInstance();

  // PASSO 1: aspetta che Firebase carichi lo stato dalla cache IndexedDB
  // authStateReady() risolve PRIMA di fare qualsiasi network call
  // Non spara mai null falsamente — è l'API ufficiale per questo caso
  let user = await waitForAuthReady(auth);

  // PASSO 2: se ancora null dopo authStateReady, l'utente è davvero non loggato
  if (!user) {
    window.location.href = PAGINA_LOGIN;
    throw new Error('Non autenticato');
  }

  _currentUser = user;
  await caricaProfilo(user);

  // PASSO 3: controlla stato account
  if (_profilo.stato === 'sospeso') {
    localStorage.removeItem('ecm_brand');
    localStorage.removeItem('ecm_profilo');
    await signOut(auth);
    window.location.href = PAGINA_LOGIN + '?errore=sospeso';
    throw new Error('Account sospeso');
  }
  if (_profilo.stato === 'in_attesa') {
    await signOut(auth);
    window.location.href = PAGINA_LOGIN + '?errore=attesa';
    throw new Error('Account in attesa');
  }
  if (isScaduto(_profilo)) {
    await signOut(auth);
    window.location.href = PAGINA_LOGIN + '?errore=scaduto';
    throw new Error('Account scaduto');
  }
  const modulo = getModuloCorrente();
  if (!hasModuloPermesso(_profilo, modulo)) {
    window.location.href = PAGINA_LOGIN + '?errore=permesso';
    throw new Error('Permesso negato: ' + modulo);
  }

  return user;
}

// ── injectUserBar ───────────────────────────────────────────────
export async function injectUserBar(slotId) {
  const slot = document.getElementById(slotId);
  if (!slot) return;
  const auth = await getAuthInstance();

  async function renderBar(user) {
    if (!user) return;
    let profilo = _profilo;
    if (!profilo) {
      try {
        const uDoc = await getDoc(doc(getDB(), 'utenti', user.uid));
        profilo = uDoc.exists() ? { uid: user.uid, ...uDoc.data() } : { uid: user.uid, email: user.email };
      } catch(e) {
        profilo = { uid: user.uid, email: user.email };
      }
    }

    const isSuper = user.email === SUPER_ADMIN_EMAIL || profilo?.ruolo === 'superadmin';
    const ruolo = isSuper ? 'superadmin' : (profilo?.ruolo || 'viewer');
    const nomeBreve = profilo?.nome ? profilo.nome.split(' ')[0] : 'Utente';
    const iniziali = ((profilo?.nome || '?')[0] + (profilo?.cognome || '?')[0]).toUpperCase();
    const ruoloColor = {
      superadmin:'#3730A3', admin:'#2563EB', operatore:'#059669',
      scanner:'#D97706', viewer:'#9499B0'
    }[ruolo] || '#9499B0';
    const ruoloLabel = isSuper ? '⭐ Super Admin' : ruolo.charAt(0).toUpperCase() + ruolo.slice(1);

    slot.innerHTML =
      '<div style="display:flex;align-items:center;gap:8px;cursor:pointer" id="userBarToggle">' +
        '<div style="width:34px;height:34px;border-radius:50%;background:' + ruoloColor + ';display:flex;align-items:center;justify-content:center;color:white;font-size:13px;font-weight:700">' + iniziali + '</div>' +
        '<div style="display:flex;flex-direction:column;line-height:1.2">' +
          '<span style="font-size:13px;font-weight:600">' + esc(nomeBreve) + '</span>' +
          '<span style="font-size:10px;opacity:.7">' + ruoloLabel + '</span>' +
        '</div>' +
      '</div>' +
      '<div id="userDropdown" style="display:none;position:absolute;top:calc(100% + 8px);right:0;background:white;border:1px solid #DDE1E9;border-radius:12px;box-shadow:0 8px 32px rgba(0,0,0,.15);min-width:200px;z-index:200;overflow:hidden">' +
        '<div style="padding:12px 14px;border-bottom:1px solid #DDE1E9;background:#F4F6F9">' +
          '<div style="font-size:13px;font-weight:600">' + esc((profilo?.nome || '') + ' ' + (profilo?.cognome || '')) + '</div>' +
          '<div style="font-size:11px;color:#9499B0">' + esc(user.email || '') + '</div>' +
        '</div>' +
        (isSuper ? '<a href="ecm-superadmin.html" style="display:flex;align-items:center;gap:8px;padding:10px 14px;text-decoration:none;color:#1A1D2E;font-size:13px">⭐ Super Admin Panel</a>' : '') +
        '<a href="ecm-home.html" style="display:flex;align-items:center;gap:8px;padding:10px 14px;text-decoration:none;color:#1A1D2E;font-size:13px">🏠 Home</a>' +
        '<div style="border-top:1px solid #DDE1E9"></div>' +
        '<button id="btnLogoutECM" style="display:flex;align-items:center;gap:8px;padding:10px 14px;width:100%;border:none;background:none;cursor:pointer;color:#DC2626;font-size:13px;font-family:inherit">🚪 Esci</button>' +
      '</div>';

    slot.style.position = 'relative';

    document.getElementById('userBarToggle')?.addEventListener('click', (e) => {
      e.stopPropagation();
      const dd = document.getElementById('userDropdown');
      if (dd) dd.style.display = dd.style.display === 'none' ? 'block' : 'none';
    });
    document.addEventListener('click', () => {
      const dd = document.getElementById('userDropdown');
      if (dd) dd.style.display = 'none';
    });

    document.getElementById('btnLogoutECM')?.addEventListener('click', async () => {
      try {
        await addDoc(collection(getDB(), 'log_attivita'), {
          tipo: 'logout', email: user.email,
          dettaglio: 'Logout: ' + user.email,
          ts: serverTimestamp(), data: new Date().toISOString()
        });
      } catch(e) {}
      localStorage.removeItem('ecm_brand');
      localStorage.removeItem('ecm_profilo');
      await signOut(auth);
      window.location.href = PAGINA_LOGIN;
    });

    // Compatibilità con layout.js (sidebarLogout → __ecmSignOut)
    window.__ecmSignOut = async () => {
      try {
        await addDoc(collection(getDB(), 'log_attivita'), {
          tipo: 'logout', email: user.email,
          dettaglio: 'Logout sidebar: ' + user.email,
          ts: serverTimestamp(), data: new Date().toISOString()
        });
      } catch(e) {}
      localStorage.removeItem('ecm_brand');
      localStorage.removeItem('ecm_profilo');
      await signOut(auth);
      window.location.href = PAGINA_LOGIN;
    };
    // Alias per compatibilità
    window._logoutECM = window.__ecmSignOut;
  }

  // Usa authStateReady per avere l'utente corretto
  const user = await waitForAuthReady(auth);
  if (user) await renderBar(user);
}

function esc(s) { return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

export function getCurrentUser()    { return _currentUser; }
export function getCurrentProfilo() { return _profilo; }
export function canAccess(modulo)   { return hasModuloPermesso(_profilo, modulo); }

export async function signOutUser() {
  const auth = await getAuthInstance();
  try {
    await addDoc(collection(getDB(), 'log_attivita'), {
      tipo: 'logout', email: auth.currentUser?.email || '—',
      ts: serverTimestamp(), data: new Date().toISOString()
    });
  } catch(e) {}
  localStorage.removeItem('ecm_brand');
  localStorage.removeItem('ecm_profilo');
  await signOut(auth);
  window.location.href = PAGINA_LOGIN;
}
