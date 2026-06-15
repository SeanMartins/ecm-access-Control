// ecm-auth.js — Sistema autenticazione con controllo moduli e scadenza
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

let _app, _db, _auth, _currentUser = null, _profilo = null;

function getApp() {
  if (!_app) _app = getApps().length ? getApps()[0] : initializeApp(FB);
  return _app;
}
function getDB() { if (!_db) _db = getFirestore(getApp()); return _db; }

function getAuthInstance() {
  if (!_auth) {
    _auth = getAuth(getApp());
    // Persistenza locale: la sessione sopravvive alla navigazione tra pagine
    setPersistence(_auth, browserLocalPersistence).catch(() => {});
  }
  return _auth;
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
    'ecm-admin':'admin','ecm-superadmin':'superadmin'
  };
  return mappa[page] || 'ecm';
}

function isScaduto(profilo) {
  if (!profilo?.dataFine) return false;
  const fine = new Date(profilo.dataFine);
  fine.setHours(23,59,59);
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

// ── CUORE DEL FIX ANTI-LOGOUT ──────────────────────────────────
// Strategia: auth.currentUser è disponibile SUBITO se la sessione
// è in cache locale. onAuthStateChanged può sparare null durante
// l'inizializzazione — non gli affidiamo mai la decisione di logout.
// Solo il logout esplicito dell'utente deve fare redirect a login.

async function caricaProfilo(user) {
  if (user.email === SUPER_ADMIN_EMAIL) {
    _profilo = { uid: user.uid, email: user.email, ruolo: 'superadmin',
                 nome: 'Martins', cognome: 'Osemwengie', moduli: ['tutti'] };
    return;
  }
  try {
    const uDoc = await getDoc(doc(getDB(), 'utenti', user.uid));
    if (uDoc.exists()) {
      _profilo = { uid: user.uid, ...uDoc.data() };
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
    } else {
      _profilo = { uid: user.uid, email: user.email, ruolo: 'viewer', moduli: ['ecm'] };
    }
  } catch(e) {
    console.warn('Auth: errore Firestore', e);
    _profilo = { uid: user.uid, email: user.email, ruolo: 'viewer', moduli: ['ecm'] };
  }
}

export async function requireAuth() {
  const auth = getAuthInstance();

  return new Promise((resolve, reject) => {
    let handled = false;

    // Timeout di sicurezza: 10 secondi massimo
    const timer = setTimeout(() => {
      if (!handled) {
        handled = true;
        // Prima di arrendersi, controlla currentUser un'ultima volta
        if (auth.currentUser) {
          handleUser(auth.currentUser);
        } else {
          window.location.href = PAGINA_LOGIN;
          reject(new Error('Timeout auth'));
        }
      }
    }, 10000);

    async function handleUser(user) {
      if (handled) return;
      handled = true;
      clearTimeout(timer);
      _currentUser = user;

      await caricaProfilo(user);

      // Controlla stato account
      if (_profilo.stato === 'sospeso') {
        localStorage.removeItem('ecm_brand');
        await signOut(auth);
        window.location.href = PAGINA_LOGIN + '?errore=sospeso';
        reject(new Error('Sospeso')); return;
      }
      if (_profilo.stato === 'in_attesa') {
        await signOut(auth);
        window.location.href = PAGINA_LOGIN + '?errore=attesa';
        reject(new Error('In attesa')); return;
      }
      if (isScaduto(_profilo)) {
        await signOut(auth);
        window.location.href = PAGINA_LOGIN + '?errore=scaduto';
        reject(new Error('Scaduto')); return;
      }
      const modulo = getModuloCorrente();
      if (!hasModuloPermesso(_profilo, modulo)) {
        window.location.href = PAGINA_LOGIN + '?errore=permesso';
        reject(new Error('Permesso negato: ' + modulo)); return;
      }
      resolve(user);
    }

    // PASSO 1: controlla subito auth.currentUser (disponibile dalla cache locale)
    // Questo evita il flash-logout durante la navigazione tra pagine
    if (auth.currentUser) {
      handleUser(auth.currentUser);
      return;
    }

    // PASSO 2: se currentUser non è ancora disponibile, aspetta onAuthStateChanged
    // ma con un double-check: se spara null, aspettiamo ancora un po'
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (handled) { unsub(); return; }

      if (user) {
        unsub();
        handleUser(user);
        return;
      }

      // user === null: potrebbe essere transitorio durante l'inizializzazione
      // Aspetta 2 secondi e ricontrolla currentUser prima di fare redirect
      await new Promise(r => setTimeout(r, 2000));

      if (handled) { unsub(); return; }

      const stillUser = auth.currentUser;
      if (stillUser) {
        unsub();
        handleUser(stillUser);
      } else {
        // Solo adesso siamo sicuri che non è loggato
        if (!handled) {
          handled = true;
          clearTimeout(timer);
          unsub();
          window.location.href = PAGINA_LOGIN;
          reject(new Error('Non autenticato'));
        }
      }
    });
  });
}

export function injectUserBar(slotId) {
  const slot = document.getElementById(slotId);
  if (!slot) return;
  const auth = getAuthInstance();

  async function renderBar(user) {
    if (!user) return;
    let profilo = _profilo;
    if (!profilo) {
      try {
        const uDoc = await getDoc(doc(getDB(), 'utenti', user.uid));
        profilo = uDoc.exists() ? { uid: user.uid, ...uDoc.data() } : { uid: user.uid, email: user.email };
      } catch(e) { profilo = { uid: user.uid, email: user.email }; }
    }

    const isSuper = user.email === SUPER_ADMIN_EMAIL || profilo?.ruolo === 'superadmin';
    const ruolo = isSuper ? 'Super Admin' : (profilo?.ruolo || 'utente');
    const nome = profilo?.nome ? profilo.nome.split(' ')[0] : (user.displayName||'Utente').split(' ')[0];
    const initiali = ((profilo?.nome||'?')[0]+(profilo?.cognome||'?')[0]).toUpperCase();
    const ruoloColor = {superadmin:'#3730A3',admin:'#2563EB',operatore:'#059669',scanner:'#D97706',viewer:'#9499B0'}[profilo?.ruolo||'viewer']||'#9499B0';

    slot.innerHTML = `
      <div style="display:flex;align-items:center;gap:8px;cursor:pointer" id="userBarToggle">
        <div style="width:34px;height:34px;border-radius:50%;background:${ruoloColor};display:flex;align-items:center;justify-content:center;color:white;font-size:13px;font-weight:700">${initiali}</div>
        <div style="display:flex;flex-direction:column;line-height:1.2">
          <span style="font-size:13px;font-weight:600">${esc(nome)}</span>
          <span style="font-size:10px;opacity:.7;text-transform:capitalize">${isSuper?'⭐ Super Admin':esc(ruolo)}</span>
        </div>
      </div>
      <div id="userDropdown" style="display:none;position:absolute;top:calc(100% + 8px);right:0;background:white;border:1px solid #DDE1E9;border-radius:12px;box-shadow:0 8px 32px rgba(0,0,0,.15);min-width:200px;z-index:200;overflow:hidden">
        <div style="padding:12px 14px;border-bottom:1px solid #DDE1E9;background:#F4F6F9">
          <div style="font-size:13px;font-weight:600">${esc(profilo?.nome||'')} ${esc(profilo?.cognome||'')}</div>
          <div style="font-size:11px;color:#9499B0">${esc(user.email||'')}</div>
        </div>
        ${isSuper?'<a href="ecm-superadmin.html" style="display:flex;align-items:center;gap:8px;padding:10px 14px;text-decoration:none;color:#1A1D2E;font-size:13px" onmouseover="this.style.background=\'#F4F6F9\'" onmouseout="this.style.background=\'\'">⭐ Super Admin Panel</a>':''}
        <a href="ecm-home.html" style="display:flex;align-items:center;gap:8px;padding:10px 14px;text-decoration:none;color:#1A1D2E;font-size:13px" onmouseover="this.style.background=\'#F4F6F9\'" onmouseout="this.style.background=\'\'">🏠 Home</a>
        <div style="border-top:1px solid #DDE1E9"></div>
        <button onclick="window._logoutECM()" style="display:flex;align-items:center;gap:8px;padding:10px 14px;width:100%;border:none;background:none;cursor:pointer;color:#DC2626;font-size:13px;font-family:inherit" onmouseover="this.style.background=\'#FEF2F2\'" onmouseout="this.style.background=\'\'">🚪 Esci</button>
      </div>`;

    slot.style.position = 'relative';
    document.getElementById('userBarToggle')?.addEventListener('click', (e) => {
      e.stopPropagation();
      const dd = document.getElementById('userDropdown');
      dd.style.display = dd.style.display==='none' ? 'block' : 'none';
    });
    document.addEventListener('click', () => {
      const dd = document.getElementById('userDropdown');
      if(dd) dd.style.display = 'none';
    });

    window._logoutECM = async () => {
      try {
        await addDoc(collection(getDB(),'log_attivita'),{
          tipo:'logout',email:user.email,
          dettaglio:'Logout: '+user.email,
          ts:serverTimestamp(),data:new Date().toISOString()
        });
      } catch(e) {}
      localStorage.removeItem('ecm_brand');
      await signOut(auth);
      window.location.href = PAGINA_LOGIN;
    };
  }

  // Usa currentUser se disponibile, altrimenti aspetta onAuthStateChanged
  if (auth.currentUser) {
    renderBar(auth.currentUser);
  } else {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) { unsub(); renderBar(user); }
    });
  }
}

function esc(s) { return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

export function getCurrentUser()    { return _currentUser; }
export function getCurrentProfilo() { return _profilo; }
export function canAccess(modulo)   { return hasModuloPermesso(_profilo, modulo); }

export async function signOutUser() {
  const auth = getAuthInstance();
  try {
    await addDoc(collection(getDB(),'log_attivita'),{
      tipo:'logout', email: auth.currentUser?.email||'—',
      dettaglio:'Logout: '+(auth.currentUser?.email||'—'),
      ts: serverTimestamp(), data: new Date().toISOString()
    });
  } catch(e) {}
  localStorage.removeItem('ecm_brand');
  await signOut(auth);
  window.location.href = PAGINA_LOGIN;
}
