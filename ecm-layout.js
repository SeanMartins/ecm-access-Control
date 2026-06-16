// ECM ACCESS CONTROL — Layout & Sidebar v2.2
(function(window) {
  'use strict';

  var VERSION = 'v2.9.0';

  // ── ICONE SVG ──────────────────────────────────────
  var IC = {
    events:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
    home:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>',
    setup:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/><path d="M14.83 9.17a4 4 0 0 1 0 5.66M9.17 9.17a4 4 0 0 0 0 5.66"/></svg>',
    badge:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>',
    scanner:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M23 7V1h-6"/><path d="M1 7V1h6"/><path d="M23 17v6h-6"/><path d="M1 17v6h6"/><line x1="1" y1="12" x2="23" y2="12"/></svg>',
    report:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
    register: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>',
    survey:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/><circle cx="10" cy="13" r="1"/><circle cx="10" cy="17" r="1"/><line x1="13" y1="13" x2="17" y2="13"/><line x1="13" y1="17" x2="17" y2="17"/></svg>',
    quiz:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    tablet:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>',
    admin:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>',
    logout:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16,17 21,12 16,7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>',
    globe:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
    convention: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>',
    stand: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
    catering: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>',
    superadmin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>',
    wedding: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
    navette: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h5l3 3v5h-8V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>',
    payments: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>',
    congress: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    speaker:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>',
    chevron:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15,18 9,12 15,6"/></svg>',
    menu:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>'
  };

  function _t(k) { return (typeof window.t === 'function') ? window.t(k) : k; }

  // ── NAV CONFIG ─────────────────────────────────────
  var NAV = [
    { type:'section', key:'nav_main' },
    { id:'eventi',   key:'nav_events',   icon:'events',   href:'ecm-eventi.html' },
    { id:'home',     key:'nav_dashboard',icon:'home',     href:'ecm-home.html' },
    { type:'section', key:'nav_event_mgmt' },
    { id:'setup',    key:'nav_setup',    icon:'setup',    href:'ecm-blocco1.html' },
    { id:'badge',    key:'nav_badge',    icon:'badge',    href:'ecm-blocco2.html' },
    { id:'scanner',  key:'nav_scanner',  icon:'scanner',  href:'ecm-blocco3.html' },
    { id:'report',   key:'nav_report',   icon:'report',   href:'ecm-blocco4.html' },
    { type:'section', key:'nav_participants' },
    { id:'register', key:'nav_register', icon:'register', href:'ecm-blocco6.html' },
    { id:'survey',   key:'nav_survey',   icon:'survey',   href:'ecm-blocco5.html' },
    { id:'quiz',     key:'nav_quiz',     icon:'quiz',     href:'ecm-blocco7.html' },
    { type:'section', key:'nav_congress' },
    { id:'congress', key:'nav_congress_prog', icon:'congress', href:'congress-programma.html' },
    { id:'congress-checkin', key:'nav_congress_checkin', icon:'scanner', href:'congress-checkin.html' },
    { id:'congress-agenda', key:'nav_congress_agenda', icon:'report', href:'congress-agenda.html' },
    { id:'congress-report', key:'nav_congress_report', icon:'report', href:'congress-report.html' },
    { id:'congress-cert', key:'nav_congress_cert', icon:'quiz', href:'congress-certificato.html' },
    { id:'congress-archivio', key:'nav_congress_archivio', icon:'report', href:'congress-archivio.html' },
    { type:'section', key:'nav_convention' },
    { id:'convention', key:'nav_conv_home', icon:'convention', href:'convention-manager.html' },
    { id:'convention-programma', key:'nav_conv_prog', icon:'congress', href:'convention-programma.html' },
    { id:'convention-stand', key:'nav_conv_stand', icon:'stand', href:'convention-stand.html' },
    { id:'convention-checkin', key:'nav_conv_checkin', icon:'scanner', href:'convention-checkin.html' },
    { id:'convention-catering', key:'nav_conv_catering', icon:'catering', href:'convention-catering.html' },
    { id:'convention-navette', key:'nav_conv_navette', icon:'navette', href:'convention-navette.html' },
    { id:'convention-report', key:'nav_conv_report', icon:'report', href:'convention-report.html' },
    { type:'section', key:'nav_payments' },
    { id:'pagamenti', key:'nav_payments_mgmt', icon:'payments', href:'ecm-pagamenti.html' },
    { type:'section', key:'nav_wedding' },
    { id:'wedding', key:'nav_wedding_home', icon:'wedding', href:'wedding-manager.html' },
    { type:'section', key:'nav_system' },
    { id:'superadmin', key:'nav_superadmin', icon:'superadmin', href:'ecm-superadmin.html', superOnly:true },
    { id:'tablet',   key:'nav_tablet',   icon:'tablet',   href:'ecm-connetti.html' },
    { id:'admin',    key:'nav_admin',    icon:'admin',    href:'ecm-admin.html', adminOnly:true }
  ];

  // ── RENDER SIDEBAR ─────────────────────────────────
  function renderSidebar(activeId) {
    var sidebar = document.getElementById('ecmSidebar');
    if (!sidebar) return;

    // Salva activeId per ricostruzione al cambio lingua
    sidebar.dataset.activeId = activeId || '';

    var collapsed = localStorage.getItem('ecm_sidebar_collapsed') === '1';
    if (collapsed) sidebar.classList.add('collapsed');
    else sidebar.classList.remove('collapsed');

    var op = null;
    try { op = JSON.parse(localStorage.getItem('ecm_op_user') || 'null'); } catch(e){}
    var isAdmin = !op;
    // isSuperAdmin: l'email di superadmin è memorizzata nel profilo
    var _ecmProfilo = null;
    try { _ecmProfilo = JSON.parse(localStorage.getItem('ecm_profilo') || 'null'); } catch(e){}
    var isSuperAdmin = _ecmProfilo && _ecmProfilo.ruolo === 'superadmin';
    var lang = (typeof window.getLang === 'function') ? window.getLang() : 'it';
    var langs = window.ECM_LANGS || {};
    var currentFlag = (langs[lang] && langs[lang].flag) || '🌐';

    // Costruisce HTML
    var html = '';

    // Toggle button
    html += '<button class="sidebar-toggle" id="sidebarToggle" title="Comprimi">' + IC.chevron + '</button>';

    // Logo (personalizzato per admin o default)
    var _brand = {};
    try { _brand = JSON.parse(localStorage.getItem('ecm_brand') || '{}')} catch(e) {}
    var _logoSrc = (_brand.logo && _brand.logo.length > 10) ? _brand.logo : 'logo.png';
    var _brandNome = _brand.nome || 'Multimedia Meeting';
    var _brandSub = _brand.sub || 'ECM Access Control';
    html += '<div class="sidebar-logo">' +
      '<div class="logo-icon" style="background:transparent;padding:0;overflow:hidden">' +
        '<img src="logo.png" alt="ECM" style="width:36px;height:36px;object-fit:cover;border-radius:10px" onerror="this.style.display=\'none\'">' +
      '</div>' +
      '<div class="logo-text">' + _brandNome + '<span class="logo-sub">' + _brandSub + '</span></div>' +
    '</div>';

    // Nav
    html += '<nav class="sidebar-nav" id="sidebarNav">';

    NAV.forEach(function(item) {
      if (item.type === 'section') {
        html += '<div class="nav-section-label">' + _t(item.key) + '</div>';
        return;
      }
      if (item.adminOnly && !isAdmin) return;
      if (item.superOnly && !isSuperAdmin) return;
      if (item.id === 'scanner' && op && op.ruolo !== 'scanner' && op.ruolo !== 'operatore') return;
      var label = _t(item.key);
      var cls = 'nav-item' + (activeId === item.id ? ' active' : '');
      html += '<a class="' + cls + '" href="' + item.href + '" data-label="' + label + '">' +
        '<span class="nav-icon">' + (IC[item.icon] || '') + '</span>' +
        '<span class="nav-label">' + label + '</span>' +
      '</a>';
    });

    // Divider
    html += '<div class="nav-divider"></div>';

    // Selettore lingua
    var langOptions = '';
    Object.keys(langs).forEach(function(code) {
      var lng = langs[code];
      langOptions += '<option value="' + code + '"' + (lang === code ? ' selected' : '') + '>' + lng.flag + ' ' + lng.name + '</option>';
    });
    html += '<div class="nav-item" style="flex-direction:column;align-items:flex-start;gap:6px;cursor:default">' +
      '<div style="display:flex;align-items:center;gap:8px;width:100%">' +
        '<span class="nav-icon">' + IC.globe + '</span>' +
        '<span class="nav-label" style="flex:1">' + _t('nav_language') + '</span>' +
        '<span id="langFlag" style="font-size:15px">' + currentFlag + '</span>' +
      '</div>' +
      '<div class="nav-label" style="width:100%;padding-left:28px">' +
        '<select id="langSelector" style="background:#2A2D3E;border:1px solid rgba(255,255,255,.2);border-radius:6px;color:#fff;font-size:12px;padding:5px 8px;cursor:pointer;width:100%;font-family:inherit;outline:none;-webkit-appearance:none;appearance:none">' +
          langOptions +
        '</select>' +
      '</div>' +
    '</div>';

    // Divider
    html += '<div class="nav-divider"></div>';

    // Logout
    var logoutLabel = _t('nav_logout');
    html += '<button class="nav-item" id="sidebarLogout" data-label="' + logoutLabel + '" style="color:rgba(239,68,68,.75)">' +
      '<span class="nav-icon">' + IC.logout + '</span>' +
      '<span class="nav-label">' + logoutLabel + '</span>' +
    '</button>';

    html += '</nav>';

    // Footer utente
    var userName = 'Admin', userRole = 'Amministratore', userInitial = 'A';
    if (op) {
      userName = op.nome || op.username || 'Operatore';
      userRole = op.ruolo === 'scanner' ? _t('nav_scanner') : op.ruolo === 'operatore' ? 'Operatore' : 'Report';
      userInitial = userName[0].toUpperCase();
    }
    html += '<div class="sidebar-footer">' +
      '<div class="sidebar-footer-inner" id="sidebarFooter">' +
        '<div class="user-avatar-sm" id="sidebarAvatar" style="background:' + (isAdmin ? '#D97706' : '#2563EB') + '">' + userInitial + '</div>' +
        '<div class="user-info-sm">' +
          '<div class="user-name-sm" id="sidebarUserName">' + userName + '</div>' +
          '<div class="user-role-sm" id="sidebarUserRole">' + userRole + '</div>' +
        '</div>' +
      '</div>' +
    '</div>';

    sidebar.innerHTML = html;

    // ── LISTENERS ────────────────────────────────────

    // Toggle collapse
    var toggleBtn = document.getElementById('sidebarToggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        sidebar.classList.toggle('collapsed');
        localStorage.setItem('ecm_sidebar_collapsed', sidebar.classList.contains('collapsed') ? '1' : '0');
      });
    }

    // Cambio lingua
    var langSel = document.getElementById('langSelector');
    if (langSel) {
      langSel.addEventListener('change', function() {
        if (typeof window.setLang === 'function') window.setLang(this.value);
      });
    }

    // Logout
    var logoutBtn = document.getElementById('sidebarLogout');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function() {
        localStorage.removeItem('ecm_op_user');
        try {
          if (window.__ecmSignOut) {
            window.__ecmSignOut();
          } else {
            // Fallback: pulisci tutto e vai al login principale
            localStorage.removeItem('ecm_brand');
            localStorage.removeItem('ecm_profilo');
            localStorage.removeItem('ecm_op_user');
            window.location.href = 'ecm-login.html';
          } } catch(e) { window.location.href = 'ecm-login-op.html'; }
      });
    }

    // Mobile: chiudi sidebar al click su link
    var overlay = document.getElementById('sidebarOverlay');
    function closeMobile() {
      sidebar.classList.remove('mobile-open');
      if (overlay) overlay.classList.remove('show');
      document.body.style.overflow = '';
    }
    sidebar.querySelectorAll('a.nav-item').forEach(function(a) {
      a.addEventListener('click', function() {
        if (window.innerWidth <= 768) closeMobile();
      });
    });
    if (overlay) {
      overlay.onclick = closeMobile;
      overlay.ontouchend = closeMobile;
    }

    // Mobile menu button
    var mobileBtn = document.getElementById('mobileMenuBtn');
    if (mobileBtn) {
      // Rimuove listener vecchi sostituendo il nodo
      var newBtn = mobileBtn.cloneNode(true);
      mobileBtn.parentNode.replaceChild(newBtn, mobileBtn);
      newBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        if (sidebar.classList.contains('mobile-open')) {
          closeMobile();
        } else {
          sidebar.classList.add('mobile-open');
          if (overlay) overlay.classList.add('show');
          document.body.style.overflow = 'hidden';
        }
      });
    }
  }

  // ── VERSION FOOTER ──────────────────────────────────
  function renderVersionFooter() {
    var el = document.getElementById('ecmVersionFooter');
    if (!el) return;
    el.innerHTML =
      'ECM Access Control &nbsp;&middot;&nbsp; <strong>' + VERSION + '</strong>' +
      ' &nbsp;&middot;&nbsp; &copy; 2026 <strong>Martins Osemwengie</strong> &nbsp;&middot;&nbsp; All rights reserved';
  }

  // ── AGGIORNA UTENTE GOOGLE ──────────────────────────
  window.updateSidebarUserGoogle = function(user) {
    var nameEl = document.getElementById('sidebarUserName');
    var roleEl = document.getElementById('sidebarUserRole');
    var avatarEl = document.getElementById('sidebarAvatar');
    if (nameEl) nameEl.textContent = user.displayName || user.email || 'Admin';
    if (roleEl) roleEl.textContent = 'Amministratore';
    if (avatarEl) {
      if (user.photoURL) {
        avatarEl.style.backgroundImage = 'url(' + user.photoURL + ')';
        avatarEl.style.backgroundSize = 'cover';
        avatarEl.textContent = '';
      } else {
        avatarEl.textContent = (user.displayName || user.email || 'A')[0].toUpperCase();
      }
    }
  };

  // Esponi globalmente
  window.renderSidebar = renderSidebar;
  window.renderVersionFooter = renderVersionFooter;
  window.ECM_VERSION = VERSION;

})(window);

// Aggiunge evId ai link dei blocchi nella sidebar e nella pagina
function updateBlockLinks() {
  var evId = localStorage.getItem('ecm_eventId');
  if (!evId) return;
  var blocchi = ['ecm-blocco1.html','ecm-blocco2.html','ecm-blocco3.html','ecm-blocco4.html'];
  document.querySelectorAll('a[href]').forEach(function(a) {
    var href = a.getAttribute('href');
    if (!href) return;
    for (var i = 0; i < blocchi.length; i++) {
      if (href.indexOf(blocchi[i]) !== -1 && href.indexOf('evId') === -1) {
        var sep = href.indexOf('?') !== -1 ? '&' : '?';
        a.setAttribute('href', href + sep + 'evId=' + encodeURIComponent(evId));
        break;
      }
    }
  });
}
// Chiama dopo il DOM pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() { setTimeout(updateBlockLinks, 300); });
} else {
  setTimeout(updateBlockLinks, 300);
}
