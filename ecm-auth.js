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

export function requireAuth(onReady) {
  return new Promise((resolve) => {
    const op = getOpSession();
    if (op) {
      if (onReady) onReady(null, op);
      resolve({ googleUser: null, opUser: op });
      return;
    }
    const unsub = onAuthStateChanged(auth, user => {
      unsub();
      if (!user) {
        window.location.href = 'ecm-login-op.html';
      } else {
        if (onReady) onReady(user, null);
        resolve({ googleUser: user, opUser: null });
      }
    });
  });
}

export function requireRole(allowedRoles) {
  const op = getOpSession();
  if (!op) return;
  if (!allowedRoles.includes(op.ruolo)) {
    document.body.innerHTML = `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;font-family:'DM Sans',sans-serif;color:#FF4D4D;font-size:16px;text-align:center;padding:20px;background:#0D0F14">
      ⛔ Non hai i permessi per questa sezione.<br><br>
      <span style="color:#8B93B8;font-size:13px">Ruolo: <strong style="color:#F0F2FF">${op.ruolo}</strong></span><br><br>
      <a href="ecm-blocco3.html" style="color:#4D6EFF">← Vai allo scanner</a></div>`;
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
    slot.innerHTML = `<div style="display:flex;align-items:center;gap:8px">
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
    slot.innerHTML = `<div style="display:flex;align-items:center;gap:8px">
      ${user.photoURL
        ? `<img src="${user.photoURL}" style="width:28px;height:28px;border-radius:50%;border:1px solid rgba(255,255,255,.2)" alt="">`
        : `<div style="width:28px;height:28px;border-radius:50%;background:#FFB547;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;color:#0D0F14">${initial}</div>`}
      <div style="display:flex;flex-direction:column">
        <span style="font-size:11px;color:rgba(255,255,255,.6)">${user.displayName||user.email}</span>
        <span style="font-size:10px;color:#FFB547">👑 Admin</span>
      </div>
      <button onclick="window.__ecmSignOut()" style="background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);color:rgba(255,255,255,.5);padding:4px 10px;border-radius:6px;font-size:11px;cursor:pointer;font-family:'DM Sans',sans-serif">Esci</button>
    </div>`;
    window.__ecmSignOut = () => signOut();
  });
}
