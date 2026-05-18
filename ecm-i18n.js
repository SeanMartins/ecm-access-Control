// ECM ACCESS CONTROL — i18n v2.2
(function(window) {
  'use strict';

  const LANGS = {
    it: { name:'Italiano', flag:'🇮🇹',
      nav_main:'Principale', nav_events:'I miei eventi', nav_dashboard:'Dashboard',
      nav_event_mgmt:'Gestione evento', nav_setup:'Setup evento', nav_badge:'Generazione badge',
      nav_scanner:'Controllo accessi', nav_report:'Report presenze', nav_participants:'Partecipanti',
      nav_register:'Registrazione', nav_survey:'Survey', nav_quiz:'Questionario ECM',
      nav_system:'Sistema', nav_tablet:'Connetti tablet', nav_admin:'Amministrazione',
      nav_logout:'Esci', nav_language:'Lingua',
      fb_ok:'Connesso', fb_connecting:'Connessione...', fb_error:'Errore connessione',
      events_title:'I miei eventi ECM', events_sub:'Seleziona un evento o creane uno nuovo',
      new_event:'+ Nuovo evento', filter_all:'Tutti', filter_today:'Oggi',
      filter_active:'Attivi', filter_archive:'Archivio',
      start_event:'▶ Inizia evento', btn_select:'✓ Seleziona', btn_selected:'✓ Attivo',
      btn_edit:'⚙️ Modifica', btn_assign:'👥 Assegna', btn_archive:'📦 Archivia', btn_restore:'↩ Ripristina',
      entry:'▶ ENTRATA', exit_mode:'◀ USCITA', start_cam:'▶ Avvia camera', stop_cam:'⏹ Ferma',
      search_ph:'Nome, cognome o CF...', open:'Apri', close_btn:'Chiudi',
      save_reg:'✓ Salva e registra entrata', total:'Totale', inside:'Dentro',
      exited:'Usciti', absent:'Non arr.', tab_present:'Dentro ora',
      tab_all:'Tutti', tab_log:'Log',
      admin_title:'Gestione utenti', admin_sub:'Crea credenziali temporanee per operatori e scanner',
      create_user:'Crea utente →', role_op:'Operatore completo',
      role_scan:'Scanner accessi', role_rep:'Solo report',
      login_title:'Accedi al sistema', login_sub:'Inserisci le tue credenziali',
      username:'Username', password:'Password', login_btn:'Accedi →', login_google:'Accedi con Google',
      ver_label:'ECM Access Control'
    },
    en: { name:'English', flag:'🇬🇧',
      nav_main:'Main', nav_events:'My events', nav_dashboard:'Dashboard',
      nav_event_mgmt:'Event management', nav_setup:'Event setup', nav_badge:'Badge generation',
      nav_scanner:'Access control', nav_report:'Attendance report', nav_participants:'Participants',
      nav_register:'Registration', nav_survey:'Survey', nav_quiz:'ECM Quiz',
      nav_system:'System', nav_tablet:'Connect tablet', nav_admin:'Administration',
      nav_logout:'Logout', nav_language:'Language',
      fb_ok:'Connected', fb_connecting:'Connecting...', fb_error:'Connection error',
      events_title:'My ECM events', events_sub:'Select an event or create a new one',
      new_event:'+ New event', filter_all:'All', filter_today:'Today',
      filter_active:'Active', filter_archive:'Archive',
      start_event:'▶ Start event', btn_select:'✓ Select', btn_selected:'✓ Active',
      btn_edit:'⚙️ Edit', btn_assign:'👥 Assign', btn_archive:'📦 Archive', btn_restore:'↩ Restore',
      entry:'▶ ENTRY', exit_mode:'◀ EXIT', start_cam:'▶ Start camera', stop_cam:'⏹ Stop',
      search_ph:'Name, surname or fiscal code...', open:'Open', close_btn:'Close',
      save_reg:'✓ Save and register entry', total:'Total', inside:'Inside',
      exited:'Exited', absent:'Absent', tab_present:'Inside now',
      tab_all:'All', tab_log:'Log',
      admin_title:'User management', admin_sub:'Create temporary credentials for operators and scanners',
      create_user:'Create user →', role_op:'Full operator',
      role_scan:'Access scanner', role_rep:'Report only',
      login_title:'Sign in to system', login_sub:'Enter your credentials',
      username:'Username', password:'Password', login_btn:'Sign in →', login_google:'Sign in with Google',
      ver_label:'ECM Access Control'
    },
    fr: { name:'Français', flag:'🇫🇷',
      nav_main:'Principal', nav_events:'Mes événements', nav_dashboard:'Tableau de bord',
      nav_event_mgmt:'Gestion événement', nav_setup:'Configuration', nav_badge:'Génération badges',
      nav_scanner:'Contrôle accès', nav_report:'Rapport présences', nav_participants:'Participants',
      nav_register:'Inscription', nav_survey:'Sondage', nav_quiz:'Quiz ECM',
      nav_system:'Système', nav_tablet:'Connecter tablette', nav_admin:'Administration',
      nav_logout:'Déconnexion', nav_language:'Langue',
      fb_ok:'Connecté', fb_connecting:'Connexion...', fb_error:'Erreur connexion',
      events_title:'Mes événements ECM', events_sub:'Sélectionnez un événement ou créez-en un',
      new_event:'+ Nouvel événement', filter_all:'Tous', filter_today:"Aujourd'hui",
      filter_active:'Actifs', filter_archive:'Archives',
      start_event:'▶ Démarrer événement', btn_select:'✓ Sélectionner', btn_selected:'✓ Actif',
      btn_edit:'⚙️ Modifier', btn_assign:'👥 Assigner', btn_archive:'📦 Archiver', btn_restore:'↩ Restaurer',
      entry:'▶ ENTRÉE', exit_mode:'◀ SORTIE', start_cam:'▶ Démarrer caméra', stop_cam:'⏹ Arrêter',
      search_ph:'Nom, prénom ou code fiscal...', open:'Ouvrir', close_btn:'Fermer',
      save_reg:"✓ Enregistrer l'entrée", total:'Total', inside:'Présents',
      exited:'Sortis', absent:'Absents', tab_present:'Présents maintenant',
      tab_all:'Tous', tab_log:'Journal',
      admin_title:'Gestion utilisateurs', admin_sub:'Créer des identifiants temporaires',
      create_user:'Créer utilisateur →', role_op:'Opérateur complet',
      role_scan:'Scanner accès', role_rep:'Rapport uniquement',
      login_title:'Connexion au système', login_sub:'Entrez vos identifiants',
      username:"Nom d'utilisateur", password:'Mot de passe', login_btn:'Se connecter →', login_google:'Se connecter avec Google',
      ver_label:'ECM Access Control'
    },
    es: { name:'Español', flag:'🇪🇸',
      nav_main:'Principal', nav_events:'Mis eventos', nav_dashboard:'Panel',
      nav_event_mgmt:'Gestión evento', nav_setup:'Configuración', nav_badge:'Generación badges',
      nav_scanner:'Control accesos', nav_report:'Informe asistencia', nav_participants:'Participantes',
      nav_register:'Registro', nav_survey:'Encuesta', nav_quiz:'Cuestionario ECM',
      nav_system:'Sistema', nav_tablet:'Conectar tablet', nav_admin:'Administración',
      nav_logout:'Cerrar sesión', nav_language:'Idioma',
      fb_ok:'Conectado', fb_connecting:'Conectando...', fb_error:'Error conexión',
      events_title:'Mis eventos ECM', events_sub:'Selecciona un evento o crea uno nuevo',
      new_event:'+ Nuevo evento', filter_all:'Todos', filter_today:'Hoy',
      filter_active:'Activos', filter_archive:'Archivo',
      start_event:'▶ Iniciar evento', btn_select:'✓ Seleccionar', btn_selected:'✓ Activo',
      btn_edit:'⚙️ Editar', btn_assign:'👥 Asignar', btn_archive:'📦 Archivar', btn_restore:'↩ Restaurar',
      entry:'▶ ENTRADA', exit_mode:'◀ SALIDA', start_cam:'▶ Iniciar cámara', stop_cam:'⏹ Detener',
      search_ph:'Nombre, apellido o código fiscal...', open:'Abrir', close_btn:'Cerrar',
      save_reg:'✓ Guardar y registrar entrada', total:'Total', inside:'Dentro',
      exited:'Salidos', absent:'Ausentes', tab_present:'Dentro ahora',
      tab_all:'Todos', tab_log:'Registro',
      admin_title:'Gestión de usuarios', admin_sub:'Crear credenciales temporales',
      create_user:'Crear usuario →', role_op:'Operador completo',
      role_scan:'Scanner accesos', role_rep:'Solo informes',
      login_title:'Acceder al sistema', login_sub:'Ingresa tus credenciales',
      username:'Usuario', password:'Contraseña', login_btn:'Acceder →', login_google:'Acceder con Google',
      ver_label:'ECM Access Control'
    },
    de: { name:'Deutsch', flag:'🇩🇪',
      nav_main:'Hauptmenü', nav_events:'Meine Veranstaltungen', nav_dashboard:'Dashboard',
      nav_event_mgmt:'Veranstaltungsverwaltung', nav_setup:'Einrichten', nav_badge:'Badge-Erstellung',
      nav_scanner:'Zugangskontrolle', nav_report:'Anwesenheitsbericht', nav_participants:'Teilnehmer',
      nav_register:'Registrierung', nav_survey:'Umfrage', nav_quiz:'ECM-Quiz',
      nav_system:'System', nav_tablet:'Tablet verbinden', nav_admin:'Administration',
      nav_logout:'Abmelden', nav_language:'Sprache',
      fb_ok:'Verbunden', fb_connecting:'Verbinden...', fb_error:'Verbindungsfehler',
      events_title:'Meine ECM-Veranstaltungen', events_sub:'Veranstaltung auswählen oder neu erstellen',
      new_event:'+ Neue Veranstaltung', filter_all:'Alle', filter_today:'Heute',
      filter_active:'Aktiv', filter_archive:'Archiv',
      start_event:'▶ Veranstaltung starten', btn_select:'✓ Auswählen', btn_selected:'✓ Aktiv',
      btn_edit:'⚙️ Bearbeiten', btn_assign:'👥 Zuweisen', btn_archive:'📦 Archivieren', btn_restore:'↩ Wiederherstellen',
      entry:'▶ EINGANG', exit_mode:'◀ AUSGANG', start_cam:'▶ Kamera starten', stop_cam:'⏹ Stopp',
      search_ph:'Name, Nachname oder Steuernummer...', open:'Öffnen', close_btn:'Schließen',
      save_reg:'✓ Speichern und Eingang registrieren', total:'Gesamt', inside:'Drin',
      exited:'Raus', absent:'Abwesend', tab_present:'Jetzt drin',
      tab_all:'Alle', tab_log:'Protokoll',
      admin_title:'Benutzerverwaltung', admin_sub:'Temporäre Zugangsdaten erstellen',
      create_user:'Benutzer erstellen →', role_op:'Vollständiger Operator',
      role_scan:'Zugangs-Scanner', role_rep:'Nur Bericht',
      login_title:'Beim System anmelden', login_sub:'Geben Sie Ihre Anmeldedaten ein',
      username:'Benutzername', password:'Passwort', login_btn:'Anmelden →', login_google:'Mit Google anmelden',
      ver_label:'ECM Access Control'
    },
    pt: { name:'Português', flag:'🇵🇹',
      nav_main:'Principal', nav_events:'Meus eventos', nav_dashboard:'Painel',
      nav_event_mgmt:'Gestão do evento', nav_setup:'Configuração', nav_badge:'Geração de crachás',
      nav_scanner:'Controle de acesso', nav_report:'Relatório de presenças', nav_participants:'Participantes',
      nav_register:'Inscrição', nav_survey:'Pesquisa', nav_quiz:'Questionário ECM',
      nav_system:'Sistema', nav_tablet:'Conectar tablet', nav_admin:'Administração',
      nav_logout:'Sair', nav_language:'Idioma',
      fb_ok:'Conectado', fb_connecting:'Conectando...', fb_error:'Erro de conexão',
      events_title:'Meus eventos ECM', events_sub:'Selecione um evento ou crie um novo',
      new_event:'+ Novo evento', filter_all:'Todos', filter_today:'Hoje',
      filter_active:'Ativos', filter_archive:'Arquivo',
      start_event:'▶ Iniciar evento', btn_select:'✓ Selecionar', btn_selected:'✓ Ativo',
      btn_edit:'⚙️ Editar', btn_assign:'👥 Atribuir', btn_archive:'📦 Arquivar', btn_restore:'↩ Restaurar',
      entry:'▶ ENTRADA', exit_mode:'◀ SAÍDA', start_cam:'▶ Iniciar câmera', stop_cam:'⏹ Parar',
      search_ph:'Nome, sobrenome ou código fiscal...', open:'Abrir', close_btn:'Fechar',
      save_reg:'✓ Salvar e registrar entrada', total:'Total', inside:'Dentro',
      exited:'Saídos', absent:'Ausentes', tab_present:'Dentro agora',
      tab_all:'Todos', tab_log:'Registro',
      admin_title:'Gestão de utilizadores', admin_sub:'Criar credenciais temporárias',
      create_user:'Criar utilizador →', role_op:'Operador completo',
      role_scan:'Scanner de acesso', role_rep:'Apenas relatório',
      login_title:'Entrar no sistema', login_sub:'Digite suas credenciais',
      username:'Usuário', password:'Senha', login_btn:'Entrar →', login_google:'Entrar com Google',
      ver_label:'ECM Access Control'
    }
  };

  function getLang() { return localStorage.getItem('ecm_lang') || 'it'; }
  function t(key) {
    var lang = getLang();
    var d = LANGS[lang] || LANGS['it'];
    return d[key] !== undefined ? d[key] : (LANGS['it'][key] || key);
  }

  // Applica data-i18n e data-i18n-placeholder
  function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(function(el) {
      el.textContent = t(el.getAttribute('data-i18n'));
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el) {
      el.placeholder = t(el.getAttribute('data-i18n-placeholder'));
    });
  }

  function setLang(lang) {
    localStorage.setItem('ecm_lang', lang);
    // Aggiorna flag nel selettore
    var flagEl = document.getElementById('langFlag');
    if (flagEl) flagEl.textContent = (LANGS[lang] && LANGS[lang].flag) || '🌐';
    var sel = document.getElementById('langSelector');
    if (sel) sel.value = lang;
    // Applica traduzioni
    applyTranslations();
    // Ricostruisce sidebar
    if (typeof renderSidebar === 'function') {
      var sb = document.getElementById('ecmSidebar');
      var activeId = sb ? sb.dataset.activeId : '';
      renderSidebar(activeId);
    }
  }

  function getLangMeta() { return LANGS; }

  // Esponi globalmente
  window.ECM_LANGS = LANGS;
  window.t = t;
  window.getLang = getLang;
  window.setLang = setLang;
  window.applyTranslations = applyTranslations;
  window.applyPageTranslations = applyTranslations; // alias
  window.getLangMeta = getLangMeta;

})(window);
