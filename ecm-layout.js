// ═══════════════════════════════════════════════════════
//  ECM ACCESS CONTROL — Shared Sidebar v2.0
// ═══════════════════════════════════════════════════════

const ECM_VERSION = 'v2.0.0';

// ── ICONE SVG ────────────────────────────────────────
const ICONS = {
  events: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  setup: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/><path d="M14.83 9.17a4 4 0 0 1 0 5.66M9.17 9.17a4 4 0 0 0 0 5.66"/></svg>`,
  badge: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`,
  scanner: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M23 7V1h-6"/><path d="M1 7V1h6"/><path d="M23 17v6h-6"/><path d="M1 17v6h6"/><line x1="1" y1="12" x2="23" y2="12"/></svg>`,
  report: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>`,
  survey: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/><circle cx="10" cy="13" r="1"/><circle cx="10" cy="17" r="1"/><line x1="13" y1="13" x2="17" y2="13"/><line x1="13" y1="17" x2="17" y2="17"/></svg>`,
  register: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>`,
  quiz: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  tablet: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>`,
  admin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`,
  home: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>`,
  logout: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16,17 21,12 16,7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`,
  menu: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`,
  chevron: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15,18 9,12 15,6"/></svg>`,
};

// ── NAV ITEMS ────────────────────────────────────────
const NAV_ITEMS = [
  { section: 'Principale' },
  { id: 'eventi',   label: 'I miei eventi',    icon: 'events',   href: 'ecm-eventi.html' },
  { id: 'home',     label: 'Dashboard',         icon: 'home',     href: 'ecm-home.html' },
  { section: 'Gestione evento' },
  { id: 'setup',    label: 'Setup evento',      icon: 'setup',    href: 'ecm-blocco1.html' },
  { id: 'badge',    label: 'Generazione badge', icon: 'badge',    href: 'ecm-blocco2.html' },
  { id: 'scanner',  label: 'Controllo accessi', icon: 'scanner',  href: 'ecm-blocco3.html' },
  { id: 'report',   label: 'Report presenze',   icon: 'report',   href: 'ecm-blocco4.html' },
  { section: 'Partecipanti' },
  { id: 'register', label: 'Registrazione',     icon: 'register', href: 'ecm-blocco6.html' },
  { id: 'survey',   label: 'Survey',            icon: 'survey',   href: 'ecm-blocco5.html' },
  { id: 'quiz',     label: 'Questionario ECM',  icon: 'quiz',     href: 'ecm-blocco7.html' },
  { section: 'Sistema' },
  { id: 'tablet',   label: 'Connetti tablet',   icon: 'tablet',   href: 'ecm-connetti.html' },
  { id: 'admin',    label: 'Amministrazione',   icon: 'admin',    href: 'ecm-admin.html', adminOnly: true },
];

// ── RENDER SIDEBAR ───────────────────────────────────
function renderSidebar(activeId) {
  const isCollapsed = localStorage.getItem('ecm_sidebar_collapsed') === '1';
  const sidebar = document.getElementById('ecmSidebar');
  if (!sidebar) return;
  if (isCollapsed) sidebar.classList.add('collapsed');

  // Logo
  sidebar.innerHTML = `
    <div class="sidebar-toggle" id="sidebarToggle" title="Comprimi menu">
      ${ICONS.chevron}
    </div>
    <div class="sidebar-logo">
      <div class="logo-icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
        </svg>
      </div>
      <div class="logo-text">
        ECM Access
        <span class="logo-sub">Control System</span>
      </div>
    </div>
    <nav class="sidebar-nav" id="sidebarNav"></nav>
    <div class="sidebar-footer">
      <div class="sidebar-footer-inner" id="sidebarFooter">
        <div class="user-avatar-sm" id="sidebarAvatar">U</div>
        <div class="user-info-sm">
          <div class="user-name-sm" id="sidebarUserName">Utente</div>
          <div class="user-role-sm" id="sidebarUserRole">—</div>
        </div>
      </div>
    </div>`;

  // Nav items
  const nav = document.getElementById('sidebarNav');
  const op = JSON.parse(localStorage.getItem('ecm_op_user') || 'null');
  const isAdmin = !op;

  NAV_ITEMS.forEach(item => {
    if (item.section) {
      const label = document.createElement('div');
      label.className = 'nav-section-label';
      label.textContent = item.section;
      nav.appendChild(label);
      return;
    }
    if (item.adminOnly && !isAdmin) return;
    // Scanner: solo se ha accesso
    if (item.id === 'scanner' && op && op.ruolo !== 'scanner' && op.ruolo !== 'operatore') return;

    const a = document.createElement('a');
    a.className = 'nav-item' + (activeId === item.id ? ' active' : '');
    a.href = item.href;
    a.dataset.label = item.label;
    a.innerHTML = `<span class="nav-icon">${ICONS[item.icon] || ''}</span><span class="nav-label">${item.label}</span>`;
    nav.appendChild(a);
  });

  // Divider + logout
  const div = document.createElement('div');
  div.className = 'nav-divider';
  nav.appendChild(div);

  const logoutBtn = document.createElement('button');
  logoutBtn.className = 'nav-item';
  logoutBtn.dataset.label = 'Esci';
  logoutBtn.innerHTML = `<span class="nav-icon">${ICONS.logout}</span><span class="nav-label">Esci</span>`;
  logoutBtn.style.color = 'rgba(239,68,68,.7)';
  logoutBtn.addEventListener('click', () => {
    if (window.__ecmSignOut) window.__ecmSignOut();
    else { localStorage.removeItem('ecm_op_user'); window.location.href = 'ecm-login-op.html'; }
  });
  nav.appendChild(logoutBtn);

  // Toggle collapse
  document.getElementById('sidebarToggle').addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    localStorage.setItem('ecm_sidebar_collapsed', sidebar.classList.contains('collapsed') ? '1' : '0');
  });

  // Mobile toggle
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const overlay = document.getElementById('sidebarOverlay');
  if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
      sidebar.classList.toggle('mobile-open');
      if (overlay) overlay.classList.toggle('show');
    });
  }
  if (overlay) {
    overlay.addEventListener('click', () => {
      sidebar.classList.remove('mobile-open');
      overlay.classList.remove('show');
    });
  }

  // User info
  updateSidebarUser(op);
}

function updateSidebarUser(op) {
  const nameEl = document.getElementById('sidebarUserName');
  const roleEl = document.getElementById('sidebarUserRole');
  const avatarEl = document.getElementById('sidebarAvatar');
  if (!nameEl) return;

  if (op) {
    nameEl.textContent = op.nome || op.username || 'Operatore';
    roleEl.textContent = op.ruolo === 'scanner' ? 'Scanner accessi' : op.ruolo === 'operatore' ? 'Operatore completo' : 'Report';
    if (avatarEl) avatarEl.textContent = (op.nome || op.username || 'O')[0].toUpperCase();
  } else {
    // Google auth — aggiornato dopo onAuthStateChanged
    nameEl.textContent = 'Admin';
    roleEl.textContent = 'Amministratore';
    if (avatarEl) { avatarEl.textContent = 'A'; avatarEl.style.background = '#D97706'; }
  }
}

// Aggiorna user info quando auth è pronta
window.updateSidebarUserGoogle = function(user) {
  const nameEl = document.getElementById('sidebarUserName');
  const roleEl = document.getElementById('sidebarUserRole');
  const avatarEl = document.getElementById('sidebarAvatar');
  if (!nameEl) return;
  nameEl.textContent = user.displayName || user.email || 'Admin';
  roleEl.textContent = 'Amministratore';
  if (avatarEl) {
    if (user.photoURL) {
      avatarEl.style.backgroundImage = `url(${user.photoURL})`;
      avatarEl.style.backgroundSize = 'cover';
      avatarEl.textContent = '';
    } else {
      avatarEl.textContent = (user.displayName || user.email || 'A')[0].toUpperCase();
    }
    avatarEl.style.background = '#D97706';
  }
};

// ── VERSION FOOTER ───────────────────────────────────
function renderVersionFooter() {
  const footer = document.getElementById('ecmVersionFooter');
  if (!footer) return;
  footer.innerHTML = `ECM Access Control &nbsp;·&nbsp; <span>${ECM_VERSION}</span> &nbsp;·&nbsp; ${new Date().getFullYear()}`;
}

// Auto-init
document.addEventListener('DOMContentLoaded', () => {
  renderVersionFooter();
});
