// ─── ECM Auth Guard ─────────────────────────────────────────
import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut as fbSignOut, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const FB = {
  apiKey: "AIzaSyBfq6dHq7JQRC2AtBf7obTM6End2NftwxA",
  authDomain: "ecm-access-control.firebaseapp.com",
  projectId: "ecm-access-control",
  storageBucket: "ecm-access-control.firebasestorage.app",
  messagingSenderId: "727782311741",
  appId: "1:727782311741:web:4aaf570b1a05caf4192754"
};

const app = getApps().length ? getApps()[0] : initializeApp(FB);
const auth = getAuth(app);

const ADMIN_EMAIL = 'martinsosem@gmail.com';

// Legge sessione operatore da localStorage
function getOpSession() {
  try {
    const raw = localStorage.getItem('ecm_op_user');
    if (!raw) return null;
    const op = JSON.parse(raw);
    if (new Date(op.scadenza) < new Date()) {
      localStorage.removeItem('ecm_op_user');
      return null;
    }
    return op;
  } catch { return null; }
}

// Controlla se è admin Google
function isAdminUser(user) {
  return user && user.email === ADMIN_EMAIL;
}

// requireAuth: accetta Google Auth (admin) OPPURE sessione operatore
export function requireAuth(onReady) {
  return new Promise((resolve) => {
    // Prima controlla sessione operatore
    const op = getOpSession();
    if (op) {
      if (onReady) onReady(null, op);
      resolve({ googleUser: null, opUser: op });
      return;
    }
    // Altrimenti controlla Google Auth
    const unsub = onAuthStateChanged(auth, user => {
      unsub();
      if (!user) {
        // Salva pagina corrente per tornare dopo login
        const currentPage = window.location.pathname.split('/').pop();
        if (currentPage && currentPage !== 'ecm-login-op.html') {
          sessionStorage.setItem('ecm_redirect_after_login', currentPage);
        }
        window.location.href = 'ecm-login-op.html';
      } else {
        if (onReady) onReady(user, null);
        resolve({ googleUser: user, opUser: null });
      }
    });
  });
}

// requireRole: admin Google bypassa sempre, operatori vengono controllati
export function requireRole(allowedRoles) {
  const op = getOpSession();
  // Se non c'è sessione operatore = è admin Google = accesso completo
  if (!op) return;
  // Se è operatore, controlla il ruolo
  if (!allowedRoles.includes(op.ruolo)) {
    const dest = op.ruolo === 'scanner' ? 'ecm-blocco3.html' : 'ecm-eventi.html';
    document.body.innerHTML = `
      <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;font-family:'DM Sans',sans-serif;color:#FF4D4D;font-size:16px;text-align:center;padding:20px;background:#0D0F14">
        ⛔ Non hai i permessi per questa sezione.<br><br>
        <span style="color:#8B93B8;font-size:13px">Ruolo: <strong style="color:#F0F2FF">${op.ruolo}</strong></span><br><br>
        <a href="${dest}" style="color:#4D6EFF;font-size:14px">← Torna indietro</a>
      </div>`;
    throw new Error('Accesso negato: ' + op.ruolo);
  }
}

export function getCurrentUser() {
  const op = getOpSession();
  if (op) return { tipo: 'operatore', ...op };
  const gu = auth.currentUser;
  if (gu) return { tipo: 'admin', email: gu.email, nome: gu.displayName, uid: gu.uid };
  return null;
}

export async function signOut() {
  localStorage.removeItem('ecm_op_user');
  sessionStorage.removeItem('ecm_redirect_after_login');
  try { await fbSignOut(auth); } catch {}
  window.location.href = 'ecm-login-op.html';
}

export function injectUserBar(containerId = 'userBarSlot') {
  const slot = document.getElementById(containerId);
  if (!slot) return;

  const op = getOpSession();
  if (op) {
    const icon = op.ruolo === 'scanner' ? '📷' : op.ruolo === 'report' ? '📊' : '🔧';
    const roleLabel = op.ruolo === 'scanner' ? 'Scanner' : op.ruolo === 'report' ? 'Report' : 'Operatore';
    const scad = new Date(op.scadenza).toLocaleDateString('it-IT');
    slot.innerHTML = `
      <div style="display:flex;align-items:center;gap:8px">
        <div style="display:flex;flex-direction:column;align-items:flex-end">
          <span style="font-size:12px;color:rgba(255,255,255,.7);font-weight:500">${icon} ${op.nome||op.username}</span>
          <span style="font-size:10px;color:rgba(255,255,255,.35)">${roleLabel} · scade ${scad}</span>
        </div>
        <button onclick="window.__ecmSignOut()" style="background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);color:rgba(255,255,255,.5);padding:4px 10px;border-radius:6px;font-size:11px;cursor:pointer;font-family:'DM Sans',sans-serif">Esci</button>
      </div>`;
    window.__ecmSignOut = () => signOut();
    return;
  }

  onAuthStateChanged(auth, user => {
    if (!user || !slot) return;
    const initial = (user.displayName || user.email || '?')[0].toUpperCase();
    const isAdmin = isAdminUser(user);
    slot.innerHTML = `
      <div style="display:flex;align-items:center;gap:8px">
        ${user.photoURL
          ? `<img src="${user.photoURL}" style="width:28px;height:28px;border-radius:50%;border:2px solid ${isAdmin?'#FFB547':'rgba(255,255,255,.2)'}" alt="">`
          : `<div style="width:28px;height:28px;border-radius:50%;background:${isAdmin?'#FFB547':'var(--accent)'};display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;color:#0D0F14">${initial}</div>`}
        <div style="display:flex;flex-direction:column">
          <span style="font-size:11px;color:rgba(255,255,255,.6)">${user.displayName||user.email}</span>
          ${isAdmin?`<span style="font-size:10px;color:#FFB547">👑 Admin</span>`:`<span style="font-size:10px;color:var(--accent)">Utente Google</span>`}
        </div>
        <button onclick="window.__ecmSignOut()" style="background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);color:rgba(255,255,255,.5);padding:4px 10px;border-radius:6px;font-size:11px;cursor:pointer;font-family:'DM Sans',sans-serif">Esci</button>
      </div>`;
    window.__ecmSignOut = () => signOut();
  });
}
