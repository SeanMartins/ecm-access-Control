// ═══════════════════════════════════════════════════════
//  ECM ACCESS CONTROL — Translations v2.0
// ═══════════════════════════════════════════════════════

const ECM_TRANSLATIONS = {

  it: {
    name: 'Italiano', flag: '🇮🇹',
    // Sidebar
    nav_main: 'Principale',
    nav_events: 'I miei eventi',
    nav_dashboard: 'Dashboard',
    nav_event_mgmt: 'Gestione evento',
    nav_setup: 'Setup evento',
    nav_badge: 'Generazione badge',
    nav_scanner: 'Controllo accessi',
    nav_report: 'Report presenze',
    nav_participants: 'Partecipanti',
    nav_register: 'Registrazione',
    nav_survey: 'Survey',
    nav_quiz: 'Questionario ECM',
    nav_system: 'Sistema',
    nav_tablet: 'Connetti tablet',
    nav_admin: 'Amministrazione',
    nav_logout: 'Esci',
    nav_language: 'Lingua',
    // Topbar
    fb_connecting: 'Connessione...',
    fb_ok: 'Connesso',
    fb_error: 'Errore',
    // Common
    save: 'Salva',
    cancel: 'Annulla',
    delete: 'Elimina',
    edit: 'Modifica',
    close: 'Chiudi',
    confirm: 'Conferma',
    loading: 'Caricamento...',
    error: 'Errore',
    success: 'Successo',
    select_event: '— Seleziona evento —',
    no_event: 'Nessun evento selezionato',
    choose_event: 'Scegli un evento →',
    // Login
    login_title: 'Accedi al sistema',
    login_sub: 'Inserisci le tue credenziali per continuare',
    username: 'Username',
    password: 'Password',
    login_btn: 'Accedi →',
    login_google: 'Accedi con Google',
    login_error: 'Credenziali non valide',
    login_expired: 'Accesso scaduto',
    // Events
    events_title: 'I miei eventi ECM',
    events_sub: 'Seleziona un evento o creane uno nuovo',
    new_event: '+ Nuovo evento',
    all: 'Tutti',
    today: 'Oggi',
    active: 'Attivi',
    archive: 'Archivio',
    start_event: '▶ Inizia evento',
    select: '✓ Seleziona',
    selected: '✓ Attivo',
    modify: '⚙️ Modifica',
    assign: '👥 Assegna',
    archive_btn: '📦 Archivia',
    restore: '↩ Ripristina',
    created_by: 'Creato da',
    // Scanner
    scanner_title: 'Controllo Accessi',
    entry: '▶ ENTRATA',
    exit: '◀ USCITA',
    start_camera: '▶ Avvia camera',
    stop_camera: '⏹ Ferma',
    scanner_active: '🟢 Scanner attivo — punta il QR al centro',
    manual_search: '🔍 Ricerca manuale',
    search_placeholder: 'Nome, cognome o CF...',
    new_participant: '➕ Nuovo partecipante',
    open: 'Apri',
    close_btn: 'Chiudi',
    save_register: '✓ Salva e registra entrata',
    reset: '✕',
    total: 'Totale',
    inside: 'Dentro',
    exited: 'Usciti',
    absent: 'Non arr.',
    present_now: 'Dentro ora',
    all_participants: 'Tutti',
    log: 'Log',
    entry_registered: '✓ Entrata registrata',
    exit_registered: '✓ Uscita registrata',
    already_inside: '⚠️ Già in sala',
    not_inside: '⚠️ Non risulta in sala',
    not_found: '⚠️ Partecipante non trovato',
    // Admin
    admin_title: 'Gestione utenti',
    admin_sub: 'Crea credenziali temporanee per operatori e scanner',
    create_user: 'Crea utente →',
    role: 'Ruolo',
    expiry: 'Scadenza accesso',
    operatore: 'Operatore completo',
    scanner_role: 'Scanner accessi',
    report_role: 'Solo report',
    version_label: 'ECM Access Control',
  },

  en: {
    name: 'English', flag: '🇬🇧',
    nav_main: 'Main',
    nav_events: 'My events',
    nav_dashboard: 'Dashboard',
    nav_event_mgmt: 'Event management',
    nav_setup: 'Event setup',
    nav_badge: 'Badge generation',
    nav_scanner: 'Access control',
    nav_report: 'Attendance report',
    nav_participants: 'Participants',
    nav_register: 'Registration',
    nav_survey: 'Survey',
    nav_quiz: 'ECM Quiz',
    nav_system: 'System',
    nav_tablet: 'Connect tablet',
    nav_admin: 'Administration',
    nav_logout: 'Logout',
    nav_language: 'Language',
    fb_connecting: 'Connecting...',
    fb_ok: 'Connected',
    fb_error: 'Error',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    close: 'Close',
    confirm: 'Confirm',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    select_event: '— Select event —',
    no_event: 'No event selected',
    choose_event: 'Choose an event →',
    login_title: 'Sign in to the system',
    login_sub: 'Enter your credentials to continue',
    username: 'Username',
    password: 'Password',
    login_btn: 'Sign in →',
    login_google: 'Sign in with Google',
    login_error: 'Invalid credentials',
    login_expired: 'Access expired',
    events_title: 'My ECM events',
    events_sub: 'Select an event or create a new one',
    new_event: '+ New event',
    all: 'All',
    today: 'Today',
    active: 'Active',
    archive: 'Archive',
    start_event: '▶ Start event',
    select: '✓ Select',
    selected: '✓ Active',
    modify: '⚙️ Edit',
    assign: '👥 Assign',
    archive_btn: '📦 Archive',
    restore: '↩ Restore',
    created_by: 'Created by',
    scanner_title: 'Access Control',
    entry: '▶ ENTRY',
    exit: '◀ EXIT',
    start_camera: '▶ Start camera',
    stop_camera: '⏹ Stop',
    scanner_active: '🟢 Scanner active — point QR to center',
    manual_search: '🔍 Manual search',
    search_placeholder: 'Name, surname or fiscal code...',
    new_participant: '➕ New participant',
    open: 'Open',
    close_btn: 'Close',
    save_register: '✓ Save and register entry',
    reset: '✕',
    total: 'Total',
    inside: 'Inside',
    exited: 'Exited',
    absent: 'Absent',
    present_now: 'Inside now',
    all_participants: 'All',
    log: 'Log',
    entry_registered: '✓ Entry registered',
    exit_registered: '✓ Exit registered',
    already_inside: '⚠️ Already inside',
    not_inside: '⚠️ Not in room',
    not_found: '⚠️ Participant not found',
    admin_title: 'User management',
    admin_sub: 'Create temporary credentials for operators and scanners',
    create_user: 'Create user →',
    role: 'Role',
    expiry: 'Access expiry',
    operatore: 'Full operator',
    scanner_role: 'Access scanner',
    report_role: 'Report only',
    version_label: 'ECM Access Control',
  },

  fr: {
    name: 'Français', flag: '🇫🇷',
    nav_main: 'Principal',
    nav_events: 'Mes événements',
    nav_dashboard: 'Tableau de bord',
    nav_event_mgmt: 'Gestion événement',
    nav_setup: 'Configuration',
    nav_badge: 'Génération badges',
    nav_scanner: 'Contrôle accès',
    nav_report: 'Rapport présences',
    nav_participants: 'Participants',
    nav_register: 'Inscription',
    nav_survey: 'Sondage',
    nav_quiz: 'Quiz ECM',
    nav_system: 'Système',
    nav_tablet: 'Connecter tablette',
    nav_admin: 'Administration',
    nav_logout: 'Déconnexion',
    nav_language: 'Langue',
    fb_connecting: 'Connexion...',
    fb_ok: 'Connecté',
    fb_error: 'Erreur',
    save: 'Enregistrer',
    cancel: 'Annuler',
    delete: 'Supprimer',
    edit: 'Modifier',
    close: 'Fermer',
    confirm: 'Confirmer',
    loading: 'Chargement...',
    error: 'Erreur',
    success: 'Succès',
    select_event: '— Sélectionner événement —',
    no_event: 'Aucun événement sélectionné',
    choose_event: 'Choisir un événement →',
    login_title: 'Connexion au système',
    login_sub: 'Entrez vos identifiants pour continuer',
    username: 'Nom d\'utilisateur',
    password: 'Mot de passe',
    login_btn: 'Se connecter →',
    login_google: 'Se connecter avec Google',
    login_error: 'Identifiants invalides',
    login_expired: 'Accès expiré',
    events_title: 'Mes événements ECM',
    events_sub: 'Sélectionnez un événement ou créez-en un nouveau',
    new_event: '+ Nouvel événement',
    all: 'Tous',
    today: 'Aujourd\'hui',
    active: 'Actifs',
    archive: 'Archives',
    start_event: '▶ Démarrer événement',
    select: '✓ Sélectionner',
    selected: '✓ Actif',
    modify: '⚙️ Modifier',
    assign: '👥 Assigner',
    archive_btn: '📦 Archiver',
    restore: '↩ Restaurer',
    created_by: 'Créé par',
    scanner_title: 'Contrôle des accès',
    entry: '▶ ENTRÉE',
    exit: '◀ SORTIE',
    start_camera: '▶ Démarrer caméra',
    stop_camera: '⏹ Arrêter',
    scanner_active: '🟢 Scanner actif — pointez le QR au centre',
    manual_search: '🔍 Recherche manuelle',
    search_placeholder: 'Nom, prénom ou code fiscal...',
    new_participant: '➕ Nouveau participant',
    open: 'Ouvrir',
    close_btn: 'Fermer',
    save_register: '✓ Enregistrer et inscrire l\'entrée',
    reset: '✕',
    total: 'Total',
    inside: 'Présents',
    exited: 'Sortis',
    absent: 'Absents',
    present_now: 'Présents maintenant',
    all_participants: 'Tous',
    log: 'Journal',
    entry_registered: '✓ Entrée enregistrée',
    exit_registered: '✓ Sortie enregistrée',
    already_inside: '⚠️ Déjà en salle',
    not_inside: '⚠️ Non présent en salle',
    not_found: '⚠️ Participant non trouvé',
    admin_title: 'Gestion utilisateurs',
    admin_sub: 'Créer des identifiants temporaires pour opérateurs et scanners',
    create_user: 'Créer utilisateur →',
    role: 'Rôle',
    expiry: 'Expiration accès',
    operatore: 'Opérateur complet',
    scanner_role: 'Scanner accès',
    report_role: 'Rapport uniquement',
    version_label: 'ECM Access Control',
  },

  es: {
    name: 'Español', flag: '🇪🇸',
    nav_main: 'Principal',
    nav_events: 'Mis eventos',
    nav_dashboard: 'Panel principal',
    nav_event_mgmt: 'Gestión evento',
    nav_setup: 'Configuración',
    nav_badge: 'Generación badges',
    nav_scanner: 'Control accesos',
    nav_report: 'Informe asistencia',
    nav_participants: 'Participantes',
    nav_register: 'Registro',
    nav_survey: 'Encuesta',
    nav_quiz: 'Cuestionario ECM',
    nav_system: 'Sistema',
    nav_tablet: 'Conectar tablet',
    nav_admin: 'Administración',
    nav_logout: 'Cerrar sesión',
    nav_language: 'Idioma',
    fb_connecting: 'Conectando...',
    fb_ok: 'Conectado',
    fb_error: 'Error',
    save: 'Guardar',
    cancel: 'Cancelar',
    delete: 'Eliminar',
    edit: 'Editar',
    close: 'Cerrar',
    confirm: 'Confirmar',
    loading: 'Cargando...',
    error: 'Error',
    success: 'Éxito',
    select_event: '— Seleccionar evento —',
    no_event: 'Ningún evento seleccionado',
    choose_event: 'Elige un evento →',
    login_title: 'Acceder al sistema',
    login_sub: 'Ingresa tus credenciales para continuar',
    username: 'Usuario',
    password: 'Contraseña',
    login_btn: 'Acceder →',
    login_google: 'Acceder con Google',
    login_error: 'Credenciales inválidas',
    login_expired: 'Acceso expirado',
    events_title: 'Mis eventos ECM',
    events_sub: 'Selecciona un evento o crea uno nuevo',
    new_event: '+ Nuevo evento',
    all: 'Todos',
    today: 'Hoy',
    active: 'Activos',
    archive: 'Archivo',
    start_event: '▶ Iniciar evento',
    select: '✓ Seleccionar',
    selected: '✓ Activo',
    modify: '⚙️ Editar',
    assign: '👥 Asignar',
    archive_btn: '📦 Archivar',
    restore: '↩ Restaurar',
    created_by: 'Creado por',
    scanner_title: 'Control de Accesos',
    entry: '▶ ENTRADA',
    exit: '◀ SALIDA',
    start_camera: '▶ Iniciar cámara',
    stop_camera: '⏹ Detener',
    scanner_active: '🟢 Scanner activo — apunta el QR al centro',
    manual_search: '🔍 Búsqueda manual',
    search_placeholder: 'Nombre, apellido o código fiscal...',
    new_participant: '➕ Nuevo participante',
    open: 'Abrir',
    close_btn: 'Cerrar',
    save_register: '✓ Guardar y registrar entrada',
    reset: '✕',
    total: 'Total',
    inside: 'Dentro',
    exited: 'Salidos',
    absent: 'Ausentes',
    present_now: 'Dentro ahora',
    all_participants: 'Todos',
    log: 'Registro',
    entry_registered: '✓ Entrada registrada',
    exit_registered: '✓ Salida registrada',
    already_inside: '⚠️ Ya está dentro',
    not_inside: '⚠️ No está en sala',
    not_found: '⚠️ Participante no encontrado',
    admin_title: 'Gestión de usuarios',
    admin_sub: 'Crear credenciales temporales para operadores y scanners',
    create_user: 'Crear usuario →',
    role: 'Rol',
    expiry: 'Expiración acceso',
    operatore: 'Operador completo',
    scanner_role: 'Scanner accesos',
    report_role: 'Solo informes',
    version_label: 'ECM Access Control',
  },

  de: {
    name: 'Deutsch', flag: '🇩🇪',
    nav_main: 'Hauptmenü',
    nav_events: 'Meine Veranstaltungen',
    nav_dashboard: 'Dashboard',
    nav_event_mgmt: 'Veranstaltungsverwaltung',
    nav_setup: 'Veranstaltung einrichten',
    nav_badge: 'Badge-Erstellung',
    nav_scanner: 'Zugangskontrolle',
    nav_report: 'Anwesenheitsbericht',
    nav_participants: 'Teilnehmer',
    nav_register: 'Registrierung',
    nav_survey: 'Umfrage',
    nav_quiz: 'ECM-Quiz',
    nav_system: 'System',
    nav_tablet: 'Tablet verbinden',
    nav_admin: 'Administration',
    nav_logout: 'Abmelden',
    nav_language: 'Sprache',
    fb_connecting: 'Verbinden...',
    fb_ok: 'Verbunden',
    fb_error: 'Fehler',
    save: 'Speichern',
    cancel: 'Abbrechen',
    delete: 'Löschen',
    edit: 'Bearbeiten',
    close: 'Schließen',
    confirm: 'Bestätigen',
    loading: 'Laden...',
    error: 'Fehler',
    success: 'Erfolg',
    select_event: '— Veranstaltung auswählen —',
    no_event: 'Keine Veranstaltung ausgewählt',
    choose_event: 'Veranstaltung wählen →',
    login_title: 'Beim System anmelden',
    login_sub: 'Geben Sie Ihre Anmeldedaten ein',
    username: 'Benutzername',
    password: 'Passwort',
    login_btn: 'Anmelden →',
    login_google: 'Mit Google anmelden',
    login_error: 'Ungültige Anmeldedaten',
    login_expired: 'Zugang abgelaufen',
    events_title: 'Meine ECM-Veranstaltungen',
    events_sub: 'Veranstaltung auswählen oder neu erstellen',
    new_event: '+ Neue Veranstaltung',
    all: 'Alle',
    today: 'Heute',
    active: 'Aktiv',
    archive: 'Archiv',
    start_event: '▶ Veranstaltung starten',
    select: '✓ Auswählen',
    selected: '✓ Aktiv',
    modify: '⚙️ Bearbeiten',
    assign: '👥 Zuweisen',
    archive_btn: '📦 Archivieren',
    restore: '↩ Wiederherstellen',
    created_by: 'Erstellt von',
    scanner_title: 'Zugangskontrolle',
    entry: '▶ EINGANG',
    exit: '◀ AUSGANG',
    start_camera: '▶ Kamera starten',
    stop_camera: '⏹ Stopp',
    scanner_active: '🟢 Scanner aktiv — QR auf Mitte richten',
    manual_search: '🔍 Manuelle Suche',
    search_placeholder: 'Name, Nachname oder Steuernummer...',
    new_participant: '➕ Neuer Teilnehmer',
    open: 'Öffnen',
    close_btn: 'Schließen',
    save_register: '✓ Speichern und Eingang registrieren',
    reset: '✕',
    total: 'Gesamt',
    inside: 'Drin',
    exited: 'Raus',
    absent: 'Abwesend',
    present_now: 'Jetzt drin',
    all_participants: 'Alle',
    log: 'Protokoll',
    entry_registered: '✓ Eingang registriert',
    exit_registered: '✓ Ausgang registriert',
    already_inside: '⚠️ Bereits im Raum',
    not_inside: '⚠️ Nicht im Raum',
    not_found: '⚠️ Teilnehmer nicht gefunden',
    admin_title: 'Benutzerverwaltung',
    admin_sub: 'Temporäre Zugangsdaten erstellen',
    create_user: 'Benutzer erstellen →',
    role: 'Rolle',
    expiry: 'Zugangsgültigkeit',
    operatore: 'Vollständiger Operator',
    scanner_role: 'Zugangs-Scanner',
    report_role: 'Nur Bericht',
    version_label: 'ECM Access Control',
  },

  pt: {
    name: 'Português', flag: '🇵🇹',
    nav_main: 'Principal',
    nav_events: 'Meus eventos',
    nav_dashboard: 'Painel',
    nav_event_mgmt: 'Gestão do evento',
    nav_setup: 'Configuração',
    nav_badge: 'Geração de crachás',
    nav_scanner: 'Controle de acesso',
    nav_report: 'Relatório de presenças',
    nav_participants: 'Participantes',
    nav_register: 'Inscrição',
    nav_survey: 'Pesquisa',
    nav_quiz: 'Questionário ECM',
    nav_system: 'Sistema',
    nav_tablet: 'Conectar tablet',
    nav_admin: 'Administração',
    nav_logout: 'Sair',
    nav_language: 'Idioma',
    fb_connecting: 'Conectando...',
    fb_ok: 'Conectado',
    fb_error: 'Erro',
    save: 'Salvar',
    cancel: 'Cancelar',
    delete: 'Excluir',
    edit: 'Editar',
    close: 'Fechar',
    confirm: 'Confirmar',
    loading: 'Carregando...',
    error: 'Erro',
    success: 'Sucesso',
    select_event: '— Selecionar evento —',
    no_event: 'Nenhum evento selecionado',
    choose_event: 'Escolha um evento →',
    login_title: 'Entrar no sistema',
    login_sub: 'Digite suas credenciais para continuar',
    username: 'Usuário',
    password: 'Senha',
    login_btn: 'Entrar →',
    login_google: 'Entrar com Google',
    login_error: 'Credenciais inválidas',
    login_expired: 'Acesso expirado',
    events_title: 'Meus eventos ECM',
    events_sub: 'Selecione um evento ou crie um novo',
    new_event: '+ Novo evento',
    all: 'Todos',
    today: 'Hoje',
    active: 'Ativos',
    archive: 'Arquivo',
    start_event: '▶ Iniciar evento',
    select: '✓ Selecionar',
    selected: '✓ Ativo',
    modify: '⚙️ Editar',
    assign: '👥 Atribuir',
    archive_btn: '📦 Arquivar',
    restore: '↩ Restaurar',
    created_by: 'Criado por',
    scanner_title: 'Controle de Acesso',
    entry: '▶ ENTRADA',
    exit: '◀ SAÍDA',
    start_camera: '▶ Iniciar câmera',
    stop_camera: '⏹ Parar',
    scanner_active: '🟢 Scanner ativo — aponte o QR ao centro',
    manual_search: '🔍 Busca manual',
    search_placeholder: 'Nome, sobrenome ou código fiscal...',
    new_participant: '➕ Novo participante',
    open: 'Abrir',
    close_btn: 'Fechar',
    save_register: '✓ Salvar e registrar entrada',
    reset: '✕',
    total: 'Total',
    inside: 'Dentro',
    exited: 'Saídos',
    absent: 'Ausentes',
    present_now: 'Dentro agora',
    all_participants: 'Todos',
    log: 'Registro',
    entry_registered: '✓ Entrada registrada',
    exit_registered: '✓ Saída registrada',
    already_inside: '⚠️ Já está dentro',
    not_inside: '⚠️ Não está na sala',
    not_found: '⚠️ Participante não encontrado',
    admin_title: 'Gestão de utilizadores',
    admin_sub: 'Criar credenciais temporárias para operadores e scanners',
    create_user: 'Criar utilizador →',
    role: 'Função',
    expiry: 'Validade do acesso',
    operatore: 'Operador completo',
    scanner_role: 'Scanner de acesso',
    report_role: 'Apenas relatório',
    version_label: 'ECM Access Control',
  }
};

// ── LINGUA CORRENTE ───────────────────────────────────
function getLang() {
  return localStorage.getItem('ecm_lang') || 'it';
}

function setLang(lang) {
  localStorage.setItem('ecm_lang', lang);
  // Applica subito alla pagina corrente
  applyTranslations();
  updateLangSelector();
  // Ricostruisce sidebar con nuova lingua
  const sidebar = document.getElementById('ecmSidebar');
  if (sidebar) {
    const activeId = sidebar.dataset.activeId;
    renderSidebar(activeId);
  }
}

function t(key) {
  const lang = getLang();
  const translations = ECM_TRANSLATIONS[lang] || ECM_TRANSLATIONS['it'];
  return translations[key] || ECM_TRANSLATIONS['it'][key] || key;
}

// Applica traduzioni agli elementi con data-i18n
function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const attr = el.dataset.i18nAttr;
    const val = t(key);
    if (attr) el.setAttribute(attr, val);
    else el.textContent = val;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });
}

// Aggiorna selector lingua
function updateLangSelector() {
  const sel = document.getElementById('langSelector');
  if (sel) sel.value = getLang();
  // Aggiorna flag
  const flag = document.getElementById('langFlag');
  if (flag) flag.textContent = ECM_TRANSLATIONS[getLang()]?.flag || '🌐';
}

window.t = t;
window.setLang = setLang;
window.getLang = getLang;
window.applyTranslations = applyTranslations;

// ── TRADUZIONE DINAMICA COMPLETA ──────────────────────
// Mappa di selezione CSS → chiave traduzione per ogni pagina
const PAGE_TRANSLATIONS = {

  // ── TESTI COMUNI ──────────────────────────────────
  common: [
    // Firebase badge
    { sel: '#fbStatus', key: 'fb_ok', onlyIfText: ['Firebase OK','Connected','Connecté','Verbunden','Conectado'] },
    // Footer versione
    { sel: '#ecmVersionFooter', fn: el => { el.innerHTML = t('version_label') + ' &nbsp;·&nbsp; <span>' + ECM_VERSION + '</span> &nbsp;·&nbsp; ' + new Date().getFullYear(); }},
  ],

  // ── LOGIN ──────────────────────────────────────────
  'ecm-login-op.html': [
    { sel: '.login-title, h1, h2', key: 'login_title' },
    { sel: '.login-sub, .subtitle', key: 'login_sub' },
    { sel: 'label[for="username"], .label-user', key: 'username' },
    { sel: 'label[for="password"], .label-pass', key: 'password' },
    { sel: '#loginBtn, button[type="submit"]', key: 'login_btn' },
    { sel: '#btnGoogle, .google-btn', key: 'login_google' },
    { sel: '#username', key: 'username', attr: 'placeholder' },
    { sel: '#password', key: 'password', attr: 'placeholder' },
  ],

  // ── EVENTI ────────────────────────────────────────
  'ecm-eventi.html': [
    { sel: '.page-title', key: 'events_title' },
    { sel: '.page-sub', key: 'events_sub' },
    { sel: 'a[href*="blocco1"][href*="nuovo=1"], .btn-new-event', key: 'new_event' },
    { sel: '[data-filter="tutti"]', key: 'all' },
    { sel: '[data-filter="oggi"]', key: 'today' },
    { sel: '[data-filter="attivi"]', key: 'active' },
    { sel: '[data-filter="archiviati"]', key: 'archive' },
    { sel: '#currentEventBar .ceb-label', fn: el => el.textContent = t('nav_events') },
  ],

  // ── SCANNER ───────────────────────────────────────
  'ecm-blocco3.html': [
    { sel: '.topbar-title', key: 'scanner_title' },
    { sel: '#btnIn', key: 'entry' },
    { sel: '#btnOut', key: 'exit' },
    { sel: '#btnAvvia', key: 'start_camera' },
    { sel: '#btnFerma', key: 'stop_camera' },
    { sel: '#searchInput', key: 'search_placeholder', attr: 'placeholder' },
    { sel: '#btnToggleNP', fn: el => { if(el.textContent.trim()==='Apri'||el.textContent.trim()==='Open'||el.textContent.trim()==='Ouvrir') el.textContent = t('open'); }},
    { sel: '#btnSalvaNP', key: 'save_register' },
    { sel: '#footerMode', fn: el => { const cur = el.textContent; if(cur.includes('ENTR')||cur.includes('EINGANG')||cur.includes('ENTR')) el.textContent = t('entry').replace('▶ ',''); else el.textContent = t('exit').replace('◀ ',''); }},
    { sel: '#sTot + .stat-label', key: 'total' },
    { sel: '#sDentro + .stat-label', key: 'inside' },
    { sel: '#sUsciti + .stat-label', key: 'exited' },
    { sel: '#sAssenti + .stat-label', key: 'absent' },
    { sel: '[data-t="presenti"]', key: 'present_now' },
    { sel: '[data-t="tutti"]', key: 'all_participants' },
    { sel: '[data-t="log"]', key: 'log' },
  ],

  // ── ADMIN ─────────────────────────────────────────
  'ecm-admin.html': [
    { sel: '.page-title', key: 'admin_title' },
    { sel: '.page-sub', key: 'admin_sub' },
    { sel: '#btnCrea', key: 'create_user' },
    { sel: '#rb-operatore .role-name', key: 'operatore' },
    { sel: '#rb-scanner .role-name', key: 'scanner_role' },
    { sel: '#rb-report .role-name', key: 'report_role' },
  ],
};

// Applica tutte le traduzioni per la pagina corrente
function applyPageTranslations() {
  const page = window.location.pathname.split('/').pop() || 'index.html';

  // Applica traduzioni comuni
  (PAGE_TRANSLATIONS.common || []).forEach(rule => applyRule(rule));

  // Applica traduzioni specifiche per questa pagina
  const pageRules = PAGE_TRANSLATIONS[page] || [];
  pageRules.forEach(rule => applyRule(rule));

  // Applica anche data-i18n standard
  applyTranslations();
}

function applyRule(rule) {
  try {
    const els = document.querySelectorAll(rule.sel || 'NONEXISTENT_SELECTOR_XYZ');
    if (!els.length) return;
    els.forEach(el => {
      if (rule.fn) { rule.fn(el); return; }
      if (rule.onlyIfText) {
        // Traduci solo se il testo corrente è uno dei valori attesi
        const cur = el.textContent.trim();
        if (!rule.onlyIfText.some(v => cur.includes(v))) return;
      }
      const val = t(rule.key);
      if (rule.attr) el.setAttribute(rule.attr, val);
      else el.textContent = val;
    });
  } catch(e) {}
}

// Sovrascrive setLang per applicare anche le traduzioni di pagina
const _origSetLang = setLang;
window.setLang = function(lang) {
  localStorage.setItem('ecm_lang', lang);
  applyPageTranslations();
  updateLangSelector();
  // Ricostruisce sidebar
  const sidebar = document.getElementById('ecmSidebar');
  if (sidebar) {
    const activeId = sidebar.dataset.activeId;
    if (typeof renderSidebar === 'function') renderSidebar(activeId);
  }
};

window.applyPageTranslations = applyPageTranslations;

