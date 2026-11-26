// @ts-nocheck
/* ===========================================
   DayFlow 2.2 - Application Engine
=========================================== */

const $ = (id) => document.getElementById(id);

/* ===== CONSTANTS ===== */
const STORAGE_KEYS = {
  tasks: "df-tasks",
  points: "df-points",
  unlocks: "df-unlocks",
  settings: "df-settings",
  lastWeek: "df-last-week",
};

const DAY_NAMES = {
  ar: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
  en: ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
  de: ["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"],
  es: ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"],
  la: ["Dies Solis","Dies Lunae","Dies Martis","Dies Mercurii","Dies Iovis","Dies Veneris","Dies Saturni"],
};

const MONTH_NAMES = {
  ar: ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"],
  en: ["January","February","March","April","May","June","July","August","September","October","November","December"],
  de: ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],
  es: ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"],
  la: ["Ianuarius","Februarius","Martius","Aprilis","Maius","Iunius","Iulius","Augustus","September","October","November","December"],
};

/* ===== TRANSLATIONS ===== */
const I18N = {
  ar: {
    tagline: "نظم أسبوعك", greetingMorning: "صباح الخير 👋", greetingAfternoon: "مساء الخير 👋", greetingEvening: "مساء الخير 👋",
    greetingSub: "ابدأ يومك بخطوة صغيرة.", todayProgress: "إنجاز اليوم", progressStart: "كل إنجاز يبدأ بخطوة",
    progressGreat: "أنت تحرز تقدماً رائعاً", progressDone: "أحسنت! أنجزت كل مهامك 🎉", progressAdd: "أضف مهامك لبدء يومك",
    thisWeek: "هذا الأسبوع", viewWeek: "عرض الأسبوع", todayTasks: "مهام اليوم", remaining: "متبقي {r} من {t} مهام",
    emptyTitle: "يومك لسه فاضي", emptySub: "أضف مهامك وخلّي DayFlow ينظم أسبوعك.", addFirstTask: "إضافة أول مهمة",
    weeklyPlan: "خطتك الأسبوعية", weeklyPlanSub: "مهامك موزعة على أيام الأسبوع.", redistribute: "إعادة توزيع المهام",
    myAchievements: "إنجازاتي", myAchievementsSub: "تابع تقدمك بمرور الوقت.", streak: "أيام الالتزام",
    tasksDone: "مهام مكتملة", weekRate: "إنجاز الأسبوع", hoursDone: "ساعات الإنجاز",
    detailedStatsTitle: "تفاصيل الأسبوع", detailedStatsDesc: "افتح التفاصيل الكاملة (5 نقاط)", suggestionsTitle: "اقتراحات لتنظيم جدولك",
    suggestionsDesc: "افتح الاقتراحات (10 نقاط)", unlock: "فتح", settingsTitle: "الإعدادات", settingsSub: "خصص التطبيق حسب تفضيلاتك.",
    language: "اللغة", languageSub: "اختر لغة التطبيق.", theme: "المظهر", themeSub: "اختر الألوان المناسبة.",
    themeDark: "داكن", themeVanilla: "فانيلا شوكولاتة", themeLightBlue: "أزرق فاتح", themeCustom: "مخصص",
    customColor: "لون مخصص", customColorSub: "اختر لونك المفضل.", notifTime: "موعد التذكير اليومي",
    notifTimeSub: "متى تذكيرك بمهام اليوم.", notifications: "الإشعارات", notificationsSub: "تذكير بمهام اليوم.",
    aboutText: "مساعدك الشخصي لتنظيم الأسبوع.", home: "الرئيسية", week: "الأسبوع", stats: "إنجازاتي", settings: "الإعدادات",
    newTask: "مهمة جديدة", editTask: "تعديل المهمة", taskName: "اسم المهمة", taskDuration: "المدة (بالساعات)",
    taskPriority: "الأولوية", primary: "أساسية", secondary: "ثانوية", scheduleMode: "طريقة الجدولة",
    autoDistribute: "توزيع تلقائي", specificDay: "تحديد يوم معين", selectDay: "اختر اليوم", cancel: "إلغاء", save: "حفظ",
    edit: "تعديل", delete: "حذف", confirm: "تأكيد", primaryTasks: "المهام الأساسية", secondaryTasks: "المهام الثانوية",
    deleteConfirm: "هل تريد حذف هذه المهمة؟", deleteConfirmTitle: "حذف المهمة", redistributeConfirm: "سيتم إعادة توزيع المهام التلقائية. هل تريد المتابعة؟",
    redistributeTitle: "إعادة التوزيع", noPoints: "نقاطك غير كافية 😅", alreadyUnlocked: "مفتوح بالفعل",
    unlocked: "تم الفتح! 🎉", noTasksMsg: "أضف بعض المهام أولاً", noTasksDay: "لا توجد مهام", tasksCount: "{n} مهام",
    hoursTotal: "{h} ساعة إجمالية", hoursUnit: "ساعة", suggEmptyDays: "عندك {n} يوم فاضي — ممكن توزع عليهم مهامك.",
    suggOverloaded: "عندك {n} يوم محمّل جداً — حاول تخفف الحمل.", suggAllPrimary: "كل مهامك أساسية — ضيف شوية مهام ثانوية لتوازن أفضل.",
    suggTooMany: "عندك {n} مهمة الأسبوع ده — ركز على الأهم.", suggBalanced: "جدولك متوازن — استمر كذا! 🎯",
    suggNoTasks: "ضيف شوية مهام الأول عشان أقدر أقترحلك.", detailDay: "{day}", detailDayRow: "{done} / {total} مهام — {hours} ساعة",
    detailBestDay: "أفضل يوم: {day}", detailWorstDay: "أضعف يوم: {day}", detailTotal: "الإجمالي: {done} من {total}",
    savingToast: "تم الحفظ", deletingToast: "تم الحذف", completedTasks: "المهام المنجزة"
  },
  en: {
    tagline: "Organize your week", greetingMorning: "Good morning 👋", greetingAfternoon: "Good afternoon 👋", greetingEvening: "Good evening 👋",
    greetingSub: "Start your day with a small step.", todayProgress: "Today's progress", progressStart: "Every achievement starts with a step",
    progressGreat: "You're making great progress", progressDone: "Great job! All tasks done 🎉", progressAdd: "Add tasks to start your day",
    thisWeek: "This Week", viewWeek: "View Week", todayTasks: "Today's Tasks", remaining: "{r} of {t} tasks left",
    emptyTitle: "Your day is empty", emptySub: "Add tasks and let DayFlow organize your week.", addFirstTask: "Add first task",
    weeklyPlan: "Your Weekly Plan", weeklyPlanSub: "Your tasks distributed across the week.", redistribute: "Redistribute Tasks",
    myAchievements: "My Achievements", myAchievementsSub: "Track your progress over time.", streak: "Streak Days",
    tasksDone: "Tasks Completed", weekRate: "Week Progress", hoursDone: "Hours Done",
    detailedStatsTitle: "Weekly Details", detailedStatsDesc: "Unlock full details (5 points)", suggestionsTitle: "Schedule Suggestions",
    suggestionsDesc: "Unlock suggestions (10 points)", unlock: "Unlock", settingsTitle: "Settings", settingsSub: "Customize the app to your preferences.",
    language: "Language", languageSub: "Choose app language.", theme: "Theme", themeSub: "Choose your colors.",
    themeDark: "Dark", themeVanilla: "Vanilla Chocolate", themeLightBlue: "Light Blue", themeCustom: "Custom",
    customColor: "Custom Color", customColorSub: "Pick your favorite color.", notifTime: "Daily Reminder Time",
    notifTimeSub: "When to remind you of today's tasks.", notifications: "Notifications", notificationsSub: "Remind me of today's tasks.",
    aboutText: "Your personal weekly planner.", home: "Home", week: "Week", stats: "Stats", settings: "Settings",
    newTask: "New Task", editTask: "Edit Task", taskName: "Task Name", taskDuration: "Duration (hours)",
    taskPriority: "Priority", primary: "Primary", secondary: "Secondary", scheduleMode: "Scheduling",
    autoDistribute: "Auto distribute", specificDay: "Specific day", selectDay: "Select day", cancel: "Cancel", save: "Save",
    edit: "Edit", delete: "Delete", confirm: "Confirm", primaryTasks: "Primary Tasks", secondaryTasks: "Secondary Tasks",
    deleteConfirm: "Delete this task?", deleteConfirmTitle: "Delete Task", redistributeConfirm: "Automatic tasks will be redistributed. Continue?",
    redistributeTitle: "Redistribute", noPoints: "Not enough points 😅", alreadyUnlocked: "Already unlocked",
    unlocked: "Unlocked! 🎉", noTasksMsg: "Add some tasks first", noTasksDay: "No tasks", tasksCount: "{n} tasks",
    hoursTotal: "{h} total hours", hoursUnit: "h", suggEmptyDays: "You have {n} empty day(s) — distribute some tasks.",
    suggOverloaded: "You have {n} overloaded day(s) — try to lighten the load.", suggAllPrimary: "All tasks are primary — add some secondary ones for balance.",
    suggTooMany: "You have {n} tasks this week — focus on the most important.", suggBalanced: "Your schedule is balanced — keep it up! 🎯",
    suggNoTasks: "Add some tasks first so I can suggest.", detailDay: "{day}", detailDayRow: "{done} / {total} tasks — {hours}h",
    detailBestDay: "Best day: {day}", detailWorstDay: "Weakest day: {day}", detailTotal: "Total: {done} of {total}",
    savingToast: "Saved", deletingToast: "Deleted", completedTasks: "Completed Tasks"
  },
  de: {
    tagline: "Organisiere deine Woche", greetingMorning: "Guten Morgen 👋", greetingAfternoon: "Guten Tag 👋", greetingEvening: "Guten Abend 👋",
    greetingSub: "Beginne den Tag mit einem kleinen Schritt.", todayProgress: "Heutiger Fortschritt", progressStart: "Jeder Erfolg beginnt mit einem Schritt",
    progressGreat: "Du machst großartige Fortschritte", progressDone: "Super! Alle Aufgaben erledigt 🎉", progressAdd: "Füge Aufgaben hinzu",
    thisWeek: "Diese Woche", viewWeek: "Woche ansehen", todayTasks: "Heutige Aufgaben", remaining: "{r} von {t} Aufgaben übrig",
    emptyTitle: "Dein Tag ist leer", emptySub: "Füge Aufgaben hinzu und lass DayFlow planen.", addFirstTask: "Erste Aufgabe hinzufügen",
    weeklyPlan: "Dein Wochenplan", weeklyPlanSub: "Aufgaben über die Woche verteilt.", redistribute: "Neu verteilen",
    myAchievements: "Errungenschaften", myAchievementsSub: "Verfolge deinen Fortschritt.", streak: "Streak-Tage",
    tasksDone: "Erledigte Aufgaben", weekRate: "Wochenfortschritt", hoursDone: "Erledigte Stunden",
    detailedStatsTitle: "Wochendetails", detailedStatsDesc: "Details freischalten (5 Punkte)", suggestionsTitle: "Zeitplan-Vorschläge",
    suggestionsDesc: "Vorschläge freischalten (10 Punkte)", unlock: "Freischalten", settingsTitle: "Einstellungen", settingsSub: "Passe die App an.",
    language: "Sprache", languageSub: "App-Sprache wählen.", theme: "Design", themeSub: "Wähle deine Farben.",
    themeDark: "Dunkel", themeVanilla: "Vanille Schokolade", themeLightBlue: "Hellblau", themeCustom: "Benutzerdefiniert",
    customColor: "Eigene Farbe", customColorSub: "Wähle deine Lieblingsfarbe.", notifTime: "Tägliche Erinnerung",
    notifTimeSub: "Wann an Aufgaben erinnern.", notifications: "Benachrichtigungen", notificationsSub: "An heutige Aufgaben erinnern.",
    aboutText: "Dein persönlicher Wochenplaner.", home: "Start", week: "Woche", stats: "Statistik", settings: "Einstellungen",
    newTask: "Neue Aufgabe", editTask: "Aufgabe bearbeiten", taskName: "Aufgabenname", taskDuration: "Dauer (Stunden)",
    taskPriority: "Priorität", primary: "Primär", secondary: "Sekundär", scheduleMode: "Planung",
    autoDistribute: "Automatisch verteilen", specificDay: "Bestimmter Tag", selectDay: "Tag wählen", cancel: "Abbrechen", save: "Speichern",
    edit: "Bearbeiten", delete: "Löschen", confirm: "Bestätigen", primaryTasks: "Primäre Aufgaben", secondaryTasks: "Sekundäre Aufgaben",
    deleteConfirm: "Diese Aufgabe löschen?", deleteConfirmTitle: "Aufgabe löschen", redistributeConfirm: "Automatische Aufgaben werden neu verteilt. Fortfahren?",
    redistributeTitle: "Neu verteilen", noPoints: "Nicht genug Punkte 😅", alreadyUnlocked: "Bereits freigeschaltet",
    unlocked: "Freigeschaltet! 🎉", noTasksMsg: "Füge zuerst Aufgaben hinzu", noTasksDay: "Keine Aufgaben", tasksCount: "{n} Aufgaben",
    hoursTotal: "{h} Stunden insgesamt", hoursUnit: "Std.", suggEmptyDays: "{n} leerer Tag(e) — verteile einige Aufgaben.",
    suggOverloaded: "{n} überladener Tag(e) — reduziere die Last.", suggAllPrimary: "Alle Aufgaben sind primär — füge sekundäre hinzu.",
    suggTooMany: "{n} Aufgaben diese Woche — fokussiere dich.", suggBalanced: "Dein Plan ist ausgewogen — weiter so! 🎯",
    suggNoTasks: "Füge Aufgaben hinzu, damit ich vorschlagen kann.", detailDay: "{day}", detailDayRow: "{done} / {total} Aufgaben — {hours} Std.",
    detailBestDay: "Bester Tag: {day}", detailWorstDay: "Schwächster Tag: {day}", detailTotal: "Gesamt: {done} von {total}",
    savingToast: "Gespeichert", deletingToast: "Gelöscht", completedTasks: "Erledigte Aufgaben"
  },
  es: {
    tagline: "Organiza tu semana", greetingMorning: "Buenos días 👋", greetingAfternoon: "Buenas tardes 👋", greetingEvening: "Buenas noches 👋",
    greetingSub: "Empieza el día con un pequeño paso.", todayProgress: "Progreso de hoy", progressStart: "Cada logro comienza con un paso",
    progressGreat: "Estás progresando muy bien", progressDone: "¡Bien hecho! Todo completado 🎉", progressAdd: "Añade tareas para empezar",
    thisWeek: "Esta semana", viewWeek: "Ver semana", todayTasks: "Tareas de hoy", remaining: "{r} de {t} tareas restantes",
    emptyTitle: "Tu día está vacío", emptySub: "Añade tareas y deja que DayFlow organice.", addFirstTask: "Añadir primera tarea",
    weeklyPlan: "Tu plan semanal", weeklyPlanSub: "Tareas distribuidas en la semana.", redistribute: "Redistribuir tareas",
    myAchievements: "Mis logros", myAchievementsSub: "Sigue tu progreso.", streak: "Días de racha",
    tasksDone: "Tareas completadas", weekRate: "Progreso semanal", hoursDone: "Horas completadas",
    detailedStatsTitle: "Detalles semanales", detailedStatsDesc: "Desbloquear detalles (5 puntos)", suggestionsTitle: "Sugerencias de horario",
    suggestionsDesc: "Desbloquear sugerencias (10 puntos)", unlock: "Desbloquear", settingsTitle: "Ajustes", settingsSub: "Personaliza la app.",
    language: "Idioma", languageSub: "Elige el idioma.", theme: "Tema", themeSub: "Elige tus colores.",
    themeDark: "Oscuro", themeVanilla: "Vainilla Chocolate", themeLightBlue: "Azul claro", themeCustom: "Personalizado",
    customColor: "Color personalizado", customColorSub: "Elige tu color favorito.", notifTime: "Recordatorio diario",
    notifTimeSub: "Cuándo recordar tus tareas.", notifications: "Notificaciones", notificationsSub: "Recordar tareas de hoy.",
    aboutText: "Tu planificador semanal personal.", home: "Inicio", week: "Semana", stats: "Logros", settings: "Ajustes",
    newTask: "Nueva tarea", editTask: "Editar tarea", taskName: "Nombre de la tarea", taskDuration: "Duración (horas)",
    taskPriority: "Prioridad", primary: "Primaria", secondary: "Secundaria", scheduleMode: "Programación",
    autoDistribute: "Distribuir automáticamente", specificDay: "Día específico", selectDay: "Seleccionar día", cancel: "Cancelar", save: "Guardar",
    edit: "Editar", delete: "Eliminar", confirm: "Confirmar", primaryTasks: "Tareas primarias", secondaryTasks: "Tareas secundarias",
    deleteConfirm: "¿Eliminar esta tarea?", deleteConfirmTitle: "Eliminar tarea", redistributeConfirm: "Las tareas automáticas se redistribuirán. ¿Continuar?",
    redistributeTitle: "Redistribuir", noPoints: "Puntos insuficientes 😅", alreadyUnlocked: "Ya desbloqueado",
    unlocked: "¡Desbloqueado! 🎉", noTasksMsg: "Añade tareas primero", noTasksDay: "Sin tareas", tasksCount: "{n} tareas",
    hoursTotal: "{h} horas en total", hoursUnit: "h", suggEmptyDays: "Tienes {n} día(s) vacío(s) — distribuye algunas tareas.",
    suggOverloaded: "Tienes {n} día(s) sobrecargado(s) — reduce la carga.", suggAllPrimary: "Todas son primarias — añade secundarias para equilibrio.",
    suggTooMany: "Tienes {n} tareas esta semana — enfócate en lo importante.", suggBalanced: "Tu horario está balanceado — ¡sigue así! 🎯",
    suggNoTasks: "Añade tareas primero para poder sugerir.", detailDay: "{day}", detailDayRow: "{done} / {total} tareas — {hours}h",
    detailBestDay: "Mejor día: {day}", detailWorstDay: "Peor día: {day}", detailTotal: "Total: {done} de {total}",
    savingToast: "Guardado", deletingToast: "Eliminado", completedTasks: "Tareas completadas"
  },
  la: {
    tagline: "Ordina hebdomadem tuam", greetingMorning: "Salve 👋", greetingAfternoon: "Salve 👋", greetingEvening: "Salve 👋",
    greetingSub: "Incipe diem parvo gradu.", todayProgress: "Progressus hodie", progressStart: "Omnis res a gradu incipit",
    progressGreat: "Bene progrederis", progressDone: "Optime! Omnia perfecta 🎉", progressAdd: "Adde munera ut incipias",
    thisWeek: "Haec hebdomas", viewWeek: "Videre hebdomadem", todayTasks: "Munera hodie", remaining: "{r} ex {t} munera reliqua",
    emptyTitle: "Dies tuus vacuus est", emptySub: "Adde munera et sine DayFlow ordinare.", addFirstTask: "Adde primum munus",
    weeklyPlan: "Consilium hebdomadis", weeklyPlanSub: "Munera per dies distributa.", redistribute: "Redistribuere munera",
    myAchievements: "Res gestae meae", myAchievementsSub: "Persequere progressum.", streak: "Dies continui",
    tasksDone: "Munera perfecta", weekRate: "Progressus hebdomadis", hoursDone: "Horae perfectae",
    detailedStatsTitle: "Singula hebdomadis", detailedStatsDesc: "Aperi singula (5 puncta)", suggestionsTitle: "Suggestiones ordinis",
    suggestionsDesc: "Aperi suggestiones (10 puncta)", unlock: "Aperire", settingsTitle: "Optiones", settingsSub: "Configura applicationem.",
    language: "Lingua", languageSub: "Elige linguam.", theme: "Thema", themeSub: "Elige colores.",
    themeDark: "Obscurum", themeVanilla: "Vanilla Scaccus", themeLightBlue: "Caeruleus", themeCustom: "Proprium",
    customColor: "Color proprius", customColorSub: "Elige colorem tuum.", notifTime: "Tempus admonitionis",
    notifTimeSub: "Quando admonendus sis.", notifications: "Admonitiones", notificationsSub: "Admonere de muneribus hodie.",
    aboutText: "Consiliarius hebdomadalis tuus.", home: "Domus", week: "Hebdomas", stats: "Statistica", settings: "Optiones",
    newTask: "Novum munus", editTask: "Mutare munus", taskName: "Nomen muneris", taskDuration: "Tempus (horae)",
    taskPriority: "Prioritas", primary: "Primarium", secondary: "Secundarium", scheduleMode: "Modus ordinis",
    autoDistribute: "Distribuere sponte", specificDay: "Dies certus", selectDay: "Elige diem", cancel: "Abrogare", save: "Servare",
    edit: "Mutare", delete: "Delere", confirm: "Confirmare", primaryTasks: "Munera primaria", secondaryTasks: "Munera secundaria",
    deleteConfirm: "Delere hoc munus?", deleteConfirmTitle: "Delere munus", redistributeConfirm: "Munera automatica redistribuentur. Perge?",
    redistributeTitle: "Redistributio", noPoints: "Puncta non sufficiunt 😅", alreadyUnlocked: "Iam apertum",
    unlocked: "Apertum! 🎉", noTasksMsg: "Adde munera prius", noTasksDay: "Nulla munera", tasksCount: "{n} munera",
    hoursTotal: "{h} horae totae", hoursUnit: "h", suggEmptyDays: "{n} dies vacuus — distribue munera.",
    suggOverloaded: "{n} dies oneratus — minue onus.", suggAllPrimary: "Omnia primaria sunt — adde secundaria.",
    suggTooMany: "{n} munera hac hebdomade — focus in maiora.", suggBalanced: "Ordo tuus aequatus est — perge! 🎯",
    suggNoTasks: "Adde munera ut suggerere possim.", detailDay: "{day}", detailDayRow: "{done} / {total} munera — {hours}h",
    detailBestDay: "Dies optimus: {day}", detailWorstDay: "Dies pessimus: {day}", detailTotal: "Total: {done} ex {total}",
    savingToast: "Servatum", deletingToast: "Deletum", completedTasks: "Munera perfecta"
  },
};

/* ===== STATE ===== */
let tasks = readJSON(STORAGE_KEYS.tasks, []);
let points = Number(readJSON(STORAGE_KEYS.points, 0));
let unlocks = readJSON(STORAGE_KEYS.unlocks, {});
let settings = readJSON(STORAGE_KEYS.settings, {
  language: "ar", theme: "vanilla", customColor: "#2D7DD2", notificationTime: "07:00", notificationsEnabled: false,
});
let selectedDay = new Date().getDay();
let editingTaskId = null;
let currentOptionsTaskId = null;
let confirmCallback = null;
let showCompletedList = false;

/* ===== STORAGE HELPERS ===== */
function readJSON(key, fallback) { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; } }
function writeJSON(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} }
function saveAll() { writeJSON(STORAGE_KEYS.tasks, tasks); writeJSON(STORAGE_KEYS.points, points); writeJSON(STORAGE_KEYS.unlocks, unlocks); writeJSON(STORAGE_KEYS.settings, settings); }

/* ===== UTILITIES ===== */
function generateId() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 8); }
function todayKey() { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; }
function getWeekKey(date = new Date()) { const d = new Date(date); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() - d.getDay()); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; }
function getWeekDates(date = new Date()) { const d = new Date(date); d.setHours(0, 0, 0, 0); const sunday = new Date(d); sunday.setDate(d.getDate() - d.getDay()); return Array.from({ length: 7 }, (_, i) => { const dt = new Date(sunday); dt.setDate(sunday.getDate() + i); return dt; }); }
function hexToRgba(hex, alpha) { const r = parseInt(hex.slice(1, 3), 16); const g = parseInt(hex.slice(3, 5), 16); const b = parseInt(hex.slice(5, 7), 16); return `rgba(${r},${g},${b},${alpha})`; }
function formatHours(h) { return Number.isInteger(h) ? String(h) : h.toFixed(1); }
function hoursUnit() { return t("hoursUnit"); }
function t(key, params = {}) { const lang = settings.language || "ar"; let str = (I18N[lang] && I18N[lang][key]) || I18N.ar[key] || key; Object.entries(params).forEach(([k, v]) => { str = str.split(`{${k}}`).join(v); }); return str; }

/* ===== UI HELPERS ===== */
function showToast(msg) {
  const toast = document.createElement("div");
  toast.style.cssText = `position: fixed; bottom: 90px; left: 50%; transform: translateX(-50%) translateY(20px); background: var(--accent); color: #fff; padding: 11px 20px; border-radius: 12px; font-size: 13px; z-index: 100; opacity: 0; transition: all .3s; pointer-events: none; box-shadow: 0 4px 20px rgba(0,0,0,.25); max-width: 85%; text-align: center;`;
  toast.textContent = msg; document.body.appendChild(toast);
  requestAnimationFrame(() => { toast.style.opacity = "1"; toast.style.transform = "translateX(-50%) translateY(0)"; });
  setTimeout(() => { toast.style.opacity = "0"; toast.style.transform = "translateX(-50%) translateY(20px)"; setTimeout(() => toast.remove(), 300); }, 2200);
}

function showConfirm(title, message, onOk) {
  $("confirmTitle").textContent = title; $("confirmMessage").textContent = message;
  confirmCallback = onOk; $("confirmDialog").hidden = false;
}

/* ===== NOTIFICATIONS LOGIC ===== */
async function updateNotificationSchedule() {
  try {
    // فحص إذا كان التطبيق شغال كـ APK وبيتعرف على Capacitor
    const LN = window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.LocalNotifications;

    if (!LN) {
      if (settings.notificationsEnabled) {
        showToast("الإشعارات هتشتغل لما تحول التطبيق لـ APK.");
        settings.notificationsEnabled = false;
        $("notificationsEnabled").checked = false;
        saveAll();
      }
      return;
    }

    if (settings.notificationsEnabled) {
      let perm = await LN.checkPermissions();
      if (perm.display !== 'granted') {
        perm = await LN.requestPermissions();
      }
      if (perm.display === 'granted') {
        const [hours, minutes] = settings.notificationTime.split(':').map(Number);
        await LN.schedule({
          notifications: [
            {
              title: "DayFlow",
              body: "حان وقت مراجعة مهام اليوم! 💪",
              id: 1,
              schedule: { 
                on: { hour: hours, minute: minutes }, 
                repeats: true, 
                allowWhileIdle: true 
              },
              sound: null,
              actionTypeId: ""
            }
          ]
        });
        showToast("تم تفعيل الإشعارات بنجاح! ✅");
      } else {
        showToast("لم يتم إعطاء صلاحية الإشعارات من النظام.");
        settings.notificationsEnabled = false;
        $("notificationsEnabled").checked = false;
        saveAll();
      }
    } else {
      await LN.cancel({ notifications: [{ id: 1 }] });
      showToast("تم إيقاف الإشعارات.");
    }
  } catch (e) {
    console.warn("Notifications Error: ", e);
    showToast("خطأ في جدولة الإشعارات.");
  }
}

/* ===== THEME ===== */
function applyTheme() {
  document.body.className = "";
  document.documentElement.style.removeProperty("--accent");
  document.documentElement.style.removeProperty("--accent-soft");

  if (settings.theme === "vanilla" || settings.theme === "lightblue") {
    document.body.classList.add(settings.theme);
  } else if (settings.theme === "custom") {
    document.documentElement.style.setProperty("--accent", settings.customColor);
    document.documentElement.style.setProperty("--accent-soft", hexToRgba(settings.customColor, 0.14));
  }

  const icon = $("themeIconSvg");
  if (icon) {
    if (settings.theme === "dark" || settings.theme === "custom") {
      icon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>'; // Moon
    } else {
      icon.innerHTML = '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>'; // Sun
    }
  }

  $("themeSelect").value = settings.theme;
  $("customColorItem").hidden = settings.theme !== "custom";
  $("customColorInput").value = settings.customColor;

  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) { const colors = { dark: "#171923", vanilla: "#F4E8D5", lightblue: "#EAF2FA", custom: "#171923" }; meta.setAttribute("content", colors[settings.theme] || "#171923"); }
}

/* ===== LANGUAGE ===== */
function applyLanguage() {
  const lang = settings.language || "ar";
  document.documentElement.lang = lang; document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  document.querySelectorAll("[data-i18n]").forEach((el) => { const key = el.dataset.i18n; const val = t(key); if (val !== key) el.textContent = val; });
  populateDaySelect(); $("languageSelect").value = lang; renderAll();
}

function populateDaySelect() {
  const sel = $("specificDay"); if (!sel) return;
  const dayNames = DAY_NAMES[settings.language] || DAY_NAMES.ar; sel.innerHTML = "";
  dayNames.forEach((name, i) => { const opt = document.createElement("option"); opt.value = i; opt.textContent = name; sel.appendChild(opt); });
}

/* ===== WEEK ROLLOVER ===== */
function checkWeekRollover() {
  const currentWk = getWeekKey(); const lastWk = localStorage.getItem(STORAGE_KEYS.lastWeek) || currentWk;
  if (lastWk === currentWk) return;
  const toRoll = tasks.filter((tk) => tk.weekKey === lastWk && !tk.done);
  toRoll.forEach((oldT) => {
    tasks.push({ id: generateId(), name: oldT.name, duration: oldT.duration, priority: oldT.priority, scheduleMode: oldT.scheduleMode, specificDay: oldT.specificDay, assignedDay: oldT.scheduleMode === "specific" ? oldT.specificDay : null, weekKey: currentWk, done: false, completedDate: null, createdDate: todayKey() });
  });
  selectedDay = new Date().getDay(); localStorage.setItem(STORAGE_KEYS.lastWeek, currentWk); writeJSON(STORAGE_KEYS.tasks, tasks); redistributeCurrentWeek();
}

/* ===== DISTRIBUTION ===== */
function redistributeCurrentWeek() {
  const wk = getWeekKey(); const currentTasks = tasks.filter((tk) => tk.weekKey === wk);
  currentTasks.forEach((tk) => { if (tk.scheduleMode === "specific") { tk.assignedDay = tk.specificDay; } else { tk.assignedDay = null; } });
  const autos = currentTasks.filter((tk) => tk.scheduleMode === "automatic").sort((a, b) => { if (a.priority !== b.priority) return a.priority === "primary" ? -1 : 1; return Number(b.duration) - Number(a.duration); });
  autos.forEach((task) => {
    let bestDay = 0; let lightest = Infinity;
    for (let d = 0; d < 7; d++) {
      const load = currentTasks.filter((tk) => tk.assignedDay === d).reduce((s, tk) => s + Number(tk.duration), 0);
      if (load < lightest) { lightest = load; bestDay = d; }
    }
    task.assignedDay = bestDay;
  });
  writeJSON(STORAGE_KEYS.tasks, tasks);
}

/* ===== POINTS & UNLOCKS ===== */
function isUnlocked(feature) { const wk = getWeekKey(); return unlocks[wk] && unlocks[wk][feature] === true; }
function unlockFeature(feature, cost) {
  if (isUnlocked(feature)) { showToast(t("alreadyUnlocked")); return; }
  if (points < cost) { showToast(t("noPoints")); return; }
  points -= cost; const wk = getWeekKey(); if (!unlocks[wk]) unlocks[wk] = {}; unlocks[wk][feature] = true;
  saveAll(); renderAll(); showToast(t("unlocked"));
}

/* ===== TASK LOGIC ===== */
function getCurrentWeekTasks() { return tasks.filter((tk) => tk.weekKey === getWeekKey()); }

function toggleTask(id) {
  const task = tasks.find((tk) => tk.id === id); if (!task) return;
  const pts = Math.max(1, Math.round(Number(task.duration))); 

  if (task.done) {
    task.done = false; task.completedDate = null;
    points = Math.max(0, points - pts);
  } else {
    task.done = true; task.completedDate = todayKey();
    points += pts;
  }
  saveAll(); renderAll();
}

function deleteTask(id) {
  const task = tasks.find((tk) => tk.id === id); if (!task) return;
  showConfirm(t("deleteConfirmTitle"), t("deleteConfirm"), () => {
    if (task.done) {
      const pts = Math.max(1, Math.round(Number(task.duration)));
      points = Math.max(0, points - pts);
    }
    tasks = tasks.filter((tk) => tk.id !== id);
    saveAll(); redistributeCurrentWeek(); renderAll(); showToast(t("deletingToast"));
  });
}

/* ===== MODALS ===== */
function openTaskModal(task = null) {
  editingTaskId = task ? task.id : null; $("taskForm").reset();
  $("taskName").value = task ? task.name : ""; $("taskDuration").value = task ? task.duration : "";
  $("taskPriority").value = task ? task.priority : "primary"; $("scheduleMode").value = task ? task.scheduleMode : "automatic";
  $("taskModalTitle").textContent = task ? t("editTask") : t("newTask");
  populateDaySelect(); $("specificDay").value = task && task.specificDay != null ? task.specificDay : selectedDay;
  updateSpecificDayVisibility(); $("taskModal").hidden = false; setTimeout(() => $("taskName").focus(), 150);
}
function closeTaskModal() { $("taskModal").hidden = true; editingTaskId = null; }
function updateSpecificDayVisibility() { $("specificDayWrap").hidden = $("scheduleMode").value !== "specific"; }

function openTaskOptions(id) { currentOptionsTaskId = id; $("taskOptions").hidden = false; }
function closeTaskOptions() { $("taskOptions").hidden = true; currentOptionsTaskId = null; }

/* ===== RENDER: HOME ===== */
function renderHome() {
  const hour = new Date().getHours(); let greetKey = "greetingMorning";
  if (hour >= 12 && hour < 18) greetKey = "greetingAfternoon"; else if (hour >= 18) greetKey = "greetingEvening";
  $("greetingText").textContent = t(greetKey);

  const now = new Date(); const dayNames = DAY_NAMES[settings.language] || DAY_NAMES.ar; const monthNames = MONTH_NAMES[settings.language] || MONTH_NAMES.ar;
  $("todayDate").textContent = `${dayNames[now.getDay()]}، ${now.getDate()} ${monthNames[now.getMonth()]} ${now.getFullYear()}`;
  $("pointsValue").textContent = points;

  renderWeekStrip(); renderTodayTasks(); renderProgress();
}

function renderWeekStrip() {
  const strip = $("weekStrip"); strip.innerHTML = "";
  const dates = getWeekDates(); const todayIdx = new Date().getDay(); const dayNames = DAY_NAMES[settings.language] || DAY_NAMES.ar;
  dates.forEach((date, i) => {
    const btn = document.createElement("button"); btn.className = "day-cell";
    if (i === todayIdx) btn.classList.add("today"); if (i === selectedDay) btn.classList.add("selected");
    const small = document.createElement("small"); small.textContent = dayNames[i].slice(0, 3);
    const strong = document.createElement("strong"); strong.textContent = date.getDate();
    btn.append(small, strong); btn.addEventListener("click", () => { selectedDay = i; renderHome(); });
    strip.appendChild(btn);
  });
}

function renderTodayTasks() {
  const activeContainer = $("tasksContainer"); activeContainer.innerHTML = "";
  const completedContainer = $("completedContainer"); completedContainer.innerHTML = "";
  
  const current = getCurrentWeekTasks().filter((tk) => tk.assignedDay === selectedDay);
  const activeTasks = current.filter(tk => !tk.done);
  const completedTasks = current.filter(tk => tk.done);

  // Render Active
  if (activeTasks.length === 0 && completedTasks.length === 0) {
    $("emptyState").hidden = false;
    $("remainingText").textContent = "";
  } else {
    $("emptyState").hidden = true;
    
    if (activeTasks.length > 0) {
      const primary = activeTasks.filter((tk) => tk.priority === "primary");
      const secondary = activeTasks.filter((tk) => tk.priority === "secondary");

      if (primary.length > 0) {
        const group = document.createElement("div"); group.className = "task-group";
        const h = document.createElement("h4"); h.textContent = t("primaryTasks");
        const list = document.createElement("div"); list.className = "task-list";
        primary.forEach((tk) => list.appendChild(createTaskCard(tk)));
        group.append(h, list); activeContainer.appendChild(group);
      }
      if (secondary.length > 0) {
        const group = document.createElement("div"); group.className = "task-group";
        const h = document.createElement("h4"); h.textContent = t("secondaryTasks");
        const list = document.createElement("div"); list.className = "task-list";
        secondary.forEach((tk) => list.appendChild(createTaskCard(tk)));
        group.append(h, list); activeContainer.appendChild(group);
      }
    }
    
    $("remainingText").textContent = activeTasks.length > 0 ? t("remaining", { r: activeTasks.length, t: current.length }) : "";
  }

  // Render Completed
  const completedSection = $("completedSection");
  if (completedTasks.length > 0) {
    completedSection.hidden = false;
    $("completedCountLabel").textContent = `(${completedTasks.length})`;
    completedTasks.forEach(tk => completedContainer.appendChild(createTaskCard(tk)));
    
    $("completedToggle").onclick = () => {
      showCompletedList = !showCompletedList;
      completedContainer.hidden = !showCompletedList;
      $("completedToggle").classList.toggle("open", showCompletedList);
    };
    completedContainer.hidden = !showCompletedList;
    $("completedToggle").classList.toggle("open", showCompletedList);
  } else {
    completedSection.hidden = true;
  }
}

function createTaskCard(task) {
  const card = document.createElement("div"); card.className = "task-card" + (task.done ? " done" : "");
  const check = document.createElement("button"); check.className = "task-checkbox"; check.textContent = "✓";
  check.addEventListener("click", () => toggleTask(task.id));
  const info = document.createElement("div"); info.className = "task-info";
  const h5 = document.createElement("h5"); h5.textContent = task.name;
  const p = document.createElement("p"); p.textContent = `${formatHours(task.duration)} ${hoursUnit()} • ${t(task.priority)}`;
  info.append(h5, p);
  const menu = document.createElement("button"); menu.className = "task-menu"; menu.textContent = "⋮";
  menu.addEventListener("click", () => openTaskOptions(task.id));
  card.append(check, info, menu);
  return card;
}

function renderProgress() {
  const current = getCurrentWeekTasks().filter((tk) => tk.assignedDay === selectedDay);
  const total = current.length; const done = current.filter((tk) => tk.done).length; const percent = total ? Math.round((done / total) * 100) : 0;
  $("circlePercent").textContent = percent + "%"; $("dailyTaskCount").textContent = `${done} / ${total}`;
  let msgKey = "progressStart"; if (total === 0) msgKey = "progressAdd"; else if (percent === 100) msgKey = "progressDone"; else if (percent >= 50) msgKey = "progressGreat";
  $("progressMessage").textContent = t(msgKey);
  const deg = percent * 3.6; $("progressCircle").style.background = `conic-gradient(var(--accent) ${deg}deg, var(--surface-soft) ${deg}deg)`;
}

/* ===== RENDER: WEEK ===== */
function renderWeek() {
  const container = $("weekSchedule"); container.innerHTML = "";
  const current = getCurrentWeekTasks(); const dates = getWeekDates(); const dayNames = DAY_NAMES[settings.language] || DAY_NAMES.ar;
  dates.forEach((date, i) => {
    const dayTasks = current.filter((tk) => tk.assignedDay === i); const totalHours = dayTasks.reduce((s, tk) => s + Number(tk.duration), 0); const done = dayTasks.filter((tk) => tk.done).length;
    const box = document.createElement("div"); box.className = "schedule-day";
    const head = document.createElement("div"); head.className = "schedule-day-head";
    const h4 = document.createElement("h4"); h4.textContent = `${dayNames[i]} • ${date.getDate()}`;
    const meta = document.createElement("span"); meta.textContent = dayTasks.length ? `${done}/${dayTasks.length} • ${formatHours(totalHours)} ${hoursUnit()}` : t("noTasksDay");
    head.append(h4, meta); box.appendChild(head);
    if (dayTasks.length === 0) {
      const p = document.createElement("p"); p.style.cssText = "color: var(--muted); font-size: 12px; text-align: center; padding: 8px 0;"; p.textContent = "—"; box.appendChild(p);
    } else {
      dayTasks.forEach((tk) => {
        const line = document.createElement("div"); line.className = "schedule-task-line" + (tk.done ? " done" : "");
        line.textContent = `${tk.done ? "✓" : "○"} ${tk.name} — ${formatHours(tk.duration)} ${hoursUnit()}`;
        box.appendChild(line);
      });
    }
    container.appendChild(box);
  });
  const totalHours = current.reduce((s, tk) => s + Number(tk.duration), 0);
  $("weekOverview").textContent = current.length ? `${t("tasksCount", { n: current.length })} • ${t("hoursTotal", { h: formatHours(totalHours) })}` : t("noTasksMsg");
}

/* ===== RENDER: STATS ===== */
function renderStats() {
  const current = getCurrentWeekTasks(); const allDone = tasks.filter((tk) => tk.done);
  const weekDone = current.filter((tk) => tk.done); const totalHours = weekDone.reduce((s, tk) => s + Number(tk.duration), 0); const rate = current.length ? Math.round((weekDone.length / current.length) * 100) : 0;
  $("completedCount").textContent = allDone.length; $("completedHours").textContent = formatHours(totalHours); $("weeklyRate").textContent = rate + "%"; $("streakCount").textContent = calculateStreak();

  const lockedStats = $("detailedStatsLock"); const detailed = $("detailedStats");
  if (isUnlocked("detailedStats")) { lockedStats.hidden = true; detailed.hidden = false; renderDetailedStats(detailed); } else { lockedStats.hidden = false; detailed.hidden = true; }
  const lockedSugg = $("suggestionsLock"); const suggList = $("suggestionsList");
  if (isUnlocked("suggestions")) { lockedSugg.hidden = true; suggList.hidden = false; renderSuggestions(suggList); } else { lockedSugg.hidden = false; suggList.hidden = true; }
}

function calculateStreak() {
  const dates = new Set(tasks.filter((tk) => tk.done && tk.completedDate).map((tk) => tk.completedDate)); if (dates.size === 0) return 0;
  const today = new Date(); today.setHours(0, 0, 0, 0); const tKey = todayKey();
  let streak = 0; const cursor = new Date(today); if (!dates.has(tKey)) { cursor.setDate(cursor.getDate() - 1); }
  while (dates.has(`${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, "0")}-${String(cursor.getDate()).padStart(2, "0")}`)) { streak++; cursor.setDate(cursor.getDate() - 1); }
  return streak;
}

function renderDetailedStats(container) {
  container.innerHTML = ""; const current = getCurrentWeekTasks(); const dates = getWeekDates(); const dayNames = DAY_NAMES[settings.language] || DAY_NAMES.ar;
  let bestDay = -1, bestRate = -1; let worstDay = -1, worstRate = 101;
  dates.forEach((_, i) => {
    const dayTasks = current.filter((tk) => tk.assignedDay === i); const done = dayTasks.filter((tk) => tk.done).length; const hours = dayTasks.reduce((s, tk) => s + Number(tk.duration), 0);
    const row = document.createElement("div"); row.className = "detailed-row";
    const left = document.createElement("span"); left.textContent = dayNames[i];
    const right = document.createElement("span"); right.textContent = t("detailDayRow", { done, total: dayTasks.length, hours: formatHours(hours) });
    row.append(left, right); container.appendChild(row);
    if (dayTasks.length > 0) { const r = done / dayTasks.length; if (r > bestRate) { bestRate = r; bestDay = i; } if (r < worstRate) { worstRate = r; worstDay = i; } }
  });
  const totalDone = current.filter((tk) => tk.done).length;
  const totalRow = document.createElement("div"); totalRow.className = "detailed-row"; totalRow.style.fontWeight = "bold"; totalRow.style.marginTop = "8px";
  totalRow.innerHTML = `<span>${t("detailTotal", { done: totalDone, total: current.length })}</span>`; container.appendChild(totalRow);
  if (bestDay >= 0) { const best = document.createElement("div"); best.className = "detailed-row"; best.textContent = t("detailBestDay", { day: dayNames[bestDay] }); container.appendChild(best); }
  if (worstDay >= 0 && worstDay !== bestDay) { const worst = document.createElement("div"); worst.className = "detailed-row"; worst.textContent = t("detailWorstDay", { day: dayNames[worstDay] }); container.appendChild(worst); }
}

function renderSuggestions(container) {
  container.innerHTML = ""; const current = getCurrentWeekTasks();
  if (current.length === 0) { const p = document.createElement("div"); p.className = "suggestion-item"; p.textContent = t("suggNoTasks"); container.appendChild(p); return; }
  const loads = [0, 1, 2, 3, 4, 5, 6].map((d) => ({ day: d, hours: current.filter((tk) => tk.assignedDay === d).reduce((s, tk) => s + Number(tk.duration), 0), count: current.filter((tk) => tk.assignedDay === d).length }));
  const suggestions = [];
  const empty = loads.filter((l) => l.count === 0); if (empty.length > 0) suggestions.push(t("suggEmptyDays", { n: empty.length }));
  const overloaded = loads.filter((l) => l.hours > 6); if (overloaded.length > 0) suggestions.push(t("suggOverloaded", { n: overloaded.length }));
  const primaryCount = current.filter((tk) => tk.priority === "primary").length; if (primaryCount === current.length && current.length > 3) suggestions.push(t("suggAllPrimary"));
  if (current.length > 10) suggestions.push(t("suggTooMany", { n: current.length }));
  if (suggestions.length === 0) suggestions.push(t("suggBalanced"));
  suggestions.forEach((s) => { const p = document.createElement("div"); p.className = "suggestion-item"; p.textContent = s; container.appendChild(p); });
}

/* ===== RENDER: SETTINGS ===== */
function renderSettings() {
  $("languageSelect").value = settings.language; $("themeSelect").value = settings.theme; $("notificationTime").value = settings.notificationTime;
  $("notificationsEnabled").checked = settings.notificationsEnabled; $("customColorInput").value = settings.customColor; $("customColorItem").hidden = settings.theme !== "custom";
}

/* ===== RENDER ALL ===== */
function renderAll() { checkWeekRollover(); renderHome(); renderWeek(); renderStats(); renderSettings(); }

/* ===== NAVIGATION ===== */
function navigate(pageId) {
  document.querySelectorAll(".page").forEach((p) => { p.classList.toggle("active", p.id === pageId); });
  document.querySelectorAll(".nav-item").forEach((btn) => { btn.classList.toggle("active", btn.dataset.page === pageId); });
}

/* ===== EVENT LISTENERS ===== */
function setupEventListeners() {
  document.querySelectorAll("[data-page]").forEach((btn) => { btn.addEventListener("click", () => navigate(btn.dataset.page)); });

  $("themeToggle").addEventListener("click", () => {
    const order = ["dark", "vanilla", "lightblue", "custom"]; const idx = order.indexOf(settings.theme); settings.theme = order[(idx + 1) % order.length];
    saveAll(); applyTheme();
  });

  $("themeSelect").addEventListener("change", (e) => { settings.theme = e.target.value; saveAll(); applyTheme(); });
  $("customColorInput").addEventListener("input", (e) => { settings.customColor = e.target.value; saveAll(); applyTheme(); });
  $("languageSelect").addEventListener("change", (e) => { settings.language = e.target.value; saveAll(); applyLanguage(); });
  
  $("notificationTime").addEventListener("change", (e) => { 
    settings.notificationTime = e.target.value; 
    saveAll(); 
    if(settings.notificationsEnabled) updateNotificationSchedule();
  });

  $("notificationsEnabled").addEventListener("change", (e) => { 
    settings.notificationsEnabled = e.target.checked; 
    saveAll(); 
    updateNotificationSchedule();
  });

  $("addTaskBtn").addEventListener("click", () => openTaskModal());
  $("emptyAddBtn").addEventListener("click", () => openTaskModal());
  $("closeTaskModal").addEventListener("click", closeTaskModal);
  $("cancelTask").addEventListener("click", closeTaskModal);
  $("scheduleMode").addEventListener("change", updateSpecificDayVisibility);

  $("taskForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = $("taskName").value.trim(); const duration = Number($("taskDuration").value);
    if (!name || !isFinite(duration) || duration < 0.25 || duration > 24) { showToast("تأكد من اسم المهمة والمدة"); return; }
    const mode = $("scheduleMode").value; const priority = $("taskPriority").value;
    const specificDay = mode === "specific" ? Number($("specificDay").value) : null; const weekKey = getWeekKey();

    if (editingTaskId) {
      const task = tasks.find((tk) => tk.id === editingTaskId);
      if (task) {
        task.name = name; task.duration = duration; task.priority = priority; task.scheduleMode = mode; task.specificDay = specificDay;
        if (mode === "specific") task.assignedDay = specificDay;
      }
    } else {
      tasks.push({ id: generateId(), name, duration, priority, scheduleMode: mode, specificDay, assignedDay: mode === "specific" ? specificDay : null, weekKey, done: false, completedDate: null, createdDate: todayKey() });
    }
    redistributeCurrentWeek(); saveAll(); closeTaskModal(); renderAll(); showToast(t("savingToast"));
  });

  $("sheetEdit").addEventListener("click", () => { const id = currentOptionsTaskId; closeTaskOptions(); if (id) { const task = tasks.find((tk) => tk.id === id); if (task) openTaskModal(task); } });
  $("sheetDelete").addEventListener("click", () => { const id = currentOptionsTaskId; closeTaskOptions(); if (id) deleteTask(id); });
  $("sheetCancel").addEventListener("click", closeTaskOptions);

  $("confirmCancel").addEventListener("click", () => { $("confirmDialog").hidden = true; confirmCallback = null; });
  $("confirmOk").addEventListener("click", () => { $("confirmDialog").hidden = true; if (confirmCallback) confirmCallback(); confirmCallback = null; });

  $("redistributeBtn").addEventListener("click", () => {
    const current = getCurrentWeekTasks(); if (current.length === 0) { showToast(t("noTasksMsg")); return; }
    showConfirm(t("redistributeTitle"), t("redistributeConfirm"), () => { redistributeCurrentWeek(); renderAll(); showToast(t("savingToast")); });
  });

  $("unlockStatsBtn").addEventListener("click", () => unlockFeature("detailedStats", 5));
  $("unlockSuggestionsBtn").addEventListener("click", () => unlockFeature("suggestions", 10));

  $("taskModal").addEventListener("click", (e) => { if (e.target === $("taskModal")) closeTaskModal(); });
  $("taskOptions").addEventListener("click", (e) => { if (e.target === $("taskOptions")) closeTaskOptions(); });
}

/* ===== INIT ===== */
function init() {
  tasks = tasks.filter((tk) => tk && typeof tk.name === "string" && isFinite(Number(tk.duration)) && Number(tk.duration) > 0);
  checkWeekRollover();
  if (!localStorage.getItem(STORAGE_KEYS.lastWeek)) { localStorage.setItem(STORAGE_KEYS.lastWeek, getWeekKey()); }
  applyTheme(); applyLanguage(); setupEventListeners(); renderAll();
}

init();