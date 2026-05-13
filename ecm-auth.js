// ─── ECM Auth Guard ─────────────────────────────────────────
// Importa questo modulo in ogni pagina HTML per proteggere l'accesso.
// Uso: <script type="module"> import { requireAuth, getUser, signOut } from './ecm-auth.js'; </script>

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

// Controlla autenticazione e reindirizza al login se non loggato
export function requireAuth(onReady) {
  return new Promise((resolve) => {
    const unsub = onAuthStateChanged(auth, user => {
      unsub();
      if (!user) {
        window.location.href = 'ecm-login.html';
      } else {
        if (onReady) onReady(user);
        resolve(user);
      }
    });
  });
}

// Restituisce l'utente corrente (null se non loggato)
export function getUser() {
  return auth.currentUser;
}

// Logout
export async function signOut() {
  await fbSignOut(auth);
  window.location.href = 'ecm-login.html';
}

// Inietta la barra utente nell'header (nome + avatar + logout)
export function injectUserBar(containerId = 'userBarSlot') {
  onAuthStateChanged(auth, user => {
    const slot = document.getElementById(containerId);
    if (!slot || !user) return;
    const initial = (user.displayName || user.email || '?')[0].toUpperCase();
    slot.innerHTML = `
      <div style="display:flex;align-items:center;gap:8px">
        ${user.photoURL
          ? `<img src="${user.photoURL}" style="width:28px;height:28px;border-radius:50%;border:1px solid rgba(255,255,255,.2)" alt="">`
          : `<div style="width:28px;height:28px;border-radius:50%;background:var(--accent);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;color:white">${initial}</div>`
        }
        <span style="font-size:12px;color:rgba(255,255,255,.6);max-width:120px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${user.displayName || user.email}</span>
        <button onclick="window.__ecmSignOut()" style="background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);color:rgba(255,255,255,.6);padding:4px 10px;border-radius:6px;font-size:11px;cursor:pointer;font-family:'DM Sans',sans-serif">Esci</button>
      </div>`;
    window.__ecmSignOut = () => signOut();
  });
}
