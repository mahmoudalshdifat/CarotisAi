// ──────────────────────────────────────────────────────────────────────────────
// CarotisAi – i18n translations (EN / DE / AR)
// ──────────────────────────────────────────────────────────────────────────────

import type { Language } from '../types';

type TranslationMap = Record<string, string>;

const translations: Record<Language, TranslationMap> = {
  en: {
    appName: 'CarotisAi',
    appTagline: 'AI-Assisted Carotid Artery Analysis',
    appSubtitle: 'Research & Education Tool · Not for clinical diagnosis',

    // Navigation
    nav_dashboard: 'Dashboard',
    nav_analyze: 'Analyze',
    nav_history: 'History',
    nav_about: 'About',
    nav_settings: 'Settings',

    // Upload
    upload_title: 'Upload Carotid Ultrasound Image',
    upload_subtitle: 'Drag & drop or click to select an image',
    upload_hint: 'Supported formats: JPEG, PNG, WebP, BMP · Max 20 MB',
    upload_analyzing: 'Analysing image with Gemini AI…',
    upload_cta: 'Analyse Image',
    upload_change: 'Change image',

    // Patient context
    context_title: 'Patient Context (optional)',
    context_ageGroup: 'Age Group',
    context_sex: 'Sex',
    context_riskFactors: 'Risk Factors',
    context_question: 'Clinical Question',
    context_young: 'Young (< 45)',
    context_middle: 'Middle-aged (45–65)',
    context_elderly: 'Elderly (> 65)',
    context_male: 'Male',
    context_female: 'Female',
    context_unknown: 'Not specified',
    context_skip: 'Skip patient context',

    // Results
    results_title: 'Analysis Results',
    results_stenosis: 'Stenosis',
    results_plaque: 'Plaque',
    results_imt: 'Intima-Media Thickness',
    results_flow: 'Flow Assessment',
    results_risk: 'Cardiovascular Risk',
    results_summary: 'Clinical Summary',
    results_recommendations: 'Recommendations',
    results_limitations: 'Limitations',
    results_confidence: 'AI Confidence',
    results_download: 'Download Report (PDF)',
    results_new: 'New Analysis',

    // Stenosis grades
    stenosis_normal: 'Normal',
    stenosis_mild: 'Mild (< 50 %)',
    stenosis_moderate: 'Moderate (50–69 %)',
    stenosis_severe: 'Severe (70–99 %)',
    stenosis_occlusion: 'Complete Occlusion',

    // Risk
    risk_low: 'Low Risk',
    risk_moderate: 'Moderate Risk',
    risk_high: 'High Risk',
    risk_very_high: 'Very High Risk',

    // Settings
    settings_title: 'Settings',
    settings_apiKey: 'Google Gemini API Key',
    settings_apiKey_placeholder: 'AIza…',
    settings_apiKey_hint: 'Your key is stored only in your browser (localStorage). It is never sent to our servers.',
    settings_language: 'Language',
    settings_save: 'Save',
    settings_saved: 'Saved ✓',

    // Disclaimer
    disclaimer_title: '⚠️ Disclaimer',
    disclaimer_body:
      'This tool is intended for research and educational use only. ' +
      'It does NOT provide medical diagnoses. ' +
      'All AI-generated findings must be reviewed and validated by a qualified radiologist. ' +
      'Do not use this output for clinical decision-making.',

    // About
    about_title: 'About CarotisAi',
    about_body:
      'CarotisAi is an AI-assisted research tool for carotid artery ultrasound analysis, ' +
      'developed to support radiology research and doctoral education.',
    about_version: 'Version',
    about_tech: 'Technology: React · Gemini AI · TailwindCSS',

    // Dashboard
    dash_welcome: 'Welcome to CarotisAi',
    dash_subtitle: 'Start a new carotid artery analysis or review past results',
    dash_new_analysis: 'New Analysis',
    dash_recent: 'Recent Analyses',
    dash_empty: 'No analyses yet. Upload your first image to get started.',
    dash_stats_total: 'Total Analyses',
    dash_stats_today: 'Today',
    dash_stats_high_risk: 'High Risk Findings',

    // Common
    yes: 'Yes',
    no: 'No',
    unknown: 'Unknown',
    loading: 'Loading…',
    error: 'Error',
    retry: 'Try again',
    close: 'Close',
    back: 'Back',
    next: 'Next',
    or: 'or',
  },

  de: {
    appName: 'CarotisAi',
    appTagline: 'KI-gestützte Karotisanalyse',
    appSubtitle: 'Forschungs- und Bildungswerkzeug · Keine klinische Diagnose',

    nav_dashboard: 'Dashboard',
    nav_analyze: 'Analysieren',
    nav_history: 'Verlauf',
    nav_about: 'Über',
    nav_settings: 'Einstellungen',

    upload_title: 'Karotis-Ultraschallbild hochladen',
    upload_subtitle: 'Bild hierher ziehen oder klicken',
    upload_hint: 'Formate: JPEG, PNG, WebP, BMP · Max. 20 MB',
    upload_analyzing: 'Analyse mit Gemini AI läuft…',
    upload_cta: 'Bild analysieren',
    upload_change: 'Bild wechseln',

    context_title: 'Patientenkontext (optional)',
    context_ageGroup: 'Altersgruppe',
    context_sex: 'Geschlecht',
    context_riskFactors: 'Risikofaktoren',
    context_question: 'Klinische Fragestellung',
    context_young: 'Jung (< 45)',
    context_middle: 'Mittleres Alter (45–65)',
    context_elderly: 'Älter (> 65)',
    context_male: 'Männlich',
    context_female: 'Weiblich',
    context_unknown: 'Keine Angabe',
    context_skip: 'Patientenkontext überspringen',

    results_title: 'Analyseergebnisse',
    results_stenosis: 'Stenose',
    results_plaque: 'Plaque',
    results_imt: 'Intima-Media-Dicke',
    results_flow: 'Flussbewertung',
    results_risk: 'Kardiovaskuläres Risiko',
    results_summary: 'Klinische Zusammenfassung',
    results_recommendations: 'Empfehlungen',
    results_limitations: 'Einschränkungen',
    results_confidence: 'KI-Konfidenz',
    results_download: 'Bericht herunterladen (PDF)',
    results_new: 'Neue Analyse',

    stenosis_normal: 'Normal',
    stenosis_mild: 'Leicht (< 50 %)',
    stenosis_moderate: 'Moderat (50–69 %)',
    stenosis_severe: 'Schwer (70–99 %)',
    stenosis_occlusion: 'Vollständiger Verschluss',

    risk_low: 'Niedriges Risiko',
    risk_moderate: 'Moderates Risiko',
    risk_high: 'Hohes Risiko',
    risk_very_high: 'Sehr hohes Risiko',

    settings_title: 'Einstellungen',
    settings_apiKey: 'Google Gemini API-Schlüssel',
    settings_apiKey_placeholder: 'AIza…',
    settings_apiKey_hint: 'Ihr Schlüssel wird nur im Browser gespeichert (localStorage). Er wird niemals an unsere Server gesendet.',
    settings_language: 'Sprache',
    settings_save: 'Speichern',
    settings_saved: 'Gespeichert ✓',

    disclaimer_title: '⚠️ Haftungsausschluss',
    disclaimer_body:
      'Dieses Tool dient ausschließlich Forschungs- und Bildungszwecken. ' +
      'Es stellt KEINE medizinische Diagnose. ' +
      'Alle KI-generierten Befunde müssen von einem qualifizierten Radiologen überprüft werden.',

    about_title: 'Über CarotisAi',
    about_body:
      'CarotisAi ist ein KI-gestütztes Forschungswerkzeug zur Karotis-Ultraschall-Analyse, ' +
      'entwickelt zur Unterstützung radiologischer Forschung und Doktorarbeiten.',
    about_version: 'Version',
    about_tech: 'Technologie: React · Gemini AI · TailwindCSS',

    dash_welcome: 'Willkommen bei CarotisAi',
    dash_subtitle: 'Starten Sie eine neue Karotisanalyse oder überprüfen Sie frühere Ergebnisse',
    dash_new_analysis: 'Neue Analyse',
    dash_recent: 'Letzte Analysen',
    dash_empty: 'Noch keine Analysen. Laden Sie Ihr erstes Bild hoch.',
    dash_stats_total: 'Analysen gesamt',
    dash_stats_today: 'Heute',
    dash_stats_high_risk: 'Hochrisiko-Befunde',

    yes: 'Ja',
    no: 'Nein',
    unknown: 'Unbekannt',
    loading: 'Lädt…',
    error: 'Fehler',
    retry: 'Erneut versuchen',
    close: 'Schließen',
    back: 'Zurück',
    next: 'Weiter',
    or: 'oder',
  },

  ar: {
    appName: 'كاروتيس إيه آي',
    appTagline: 'تحليل شريان الكاروتيد بالذكاء الاصطناعي',
    appSubtitle: 'أداة بحثية وتعليمية · ليست لتشخيص طبي',

    nav_dashboard: 'لوحة التحكم',
    nav_analyze: 'تحليل',
    nav_history: 'السجل',
    nav_about: 'حول',
    nav_settings: 'الإعدادات',

    upload_title: 'رفع صورة الموجات فوق الصوتية للشريان السباتي',
    upload_subtitle: 'اسحب وأفلت أو انقر لاختيار صورة',
    upload_hint: 'الصيغ المدعومة: JPEG, PNG, WebP, BMP · الحد الأقصى 20 ميجابايت',
    upload_analyzing: 'جارٍ تحليل الصورة باستخدام Gemini AI…',
    upload_cta: 'تحليل الصورة',
    upload_change: 'تغيير الصورة',

    context_title: 'سياق المريض (اختياري)',
    context_ageGroup: 'الفئة العمرية',
    context_sex: 'الجنس',
    context_riskFactors: 'عوامل الخطر',
    context_question: 'السؤال السريري',
    context_young: 'شاب (أقل من 45)',
    context_middle: 'متوسط العمر (45–65)',
    context_elderly: 'كبير السن (أكثر من 65)',
    context_male: 'ذكر',
    context_female: 'أنثى',
    context_unknown: 'غير محدد',
    context_skip: 'تخطي سياق المريض',

    results_title: 'نتائج التحليل',
    results_stenosis: 'التضيق',
    results_plaque: 'اللويحة',
    results_imt: 'سماكة الإنتيما-ميديا',
    results_flow: 'تقييم تدفق الدم',
    results_risk: 'الخطر القلبي الوعائي',
    results_summary: 'الملخص السريري',
    results_recommendations: 'التوصيات',
    results_limitations: 'القيود',
    results_confidence: 'ثقة الذكاء الاصطناعي',
    results_download: 'تحميل التقرير (PDF)',
    results_new: 'تحليل جديد',

    stenosis_normal: 'طبيعي',
    stenosis_mild: 'خفيف (أقل من 50%)',
    stenosis_moderate: 'متوسط (50–69%)',
    stenosis_severe: 'شديد (70–99%)',
    stenosis_occlusion: 'انسداد تام',

    risk_low: 'خطر منخفض',
    risk_moderate: 'خطر متوسط',
    risk_high: 'خطر عالٍ',
    risk_very_high: 'خطر مرتفع جداً',

    settings_title: 'الإعدادات',
    settings_apiKey: 'مفتاح Google Gemini API',
    settings_apiKey_placeholder: 'AIza…',
    settings_apiKey_hint: 'يتم حفظ مفتاحك في متصفحك فقط (localStorage). لن يتم إرساله إلى خوادمنا.',
    settings_language: 'اللغة',
    settings_save: 'حفظ',
    settings_saved: 'تم الحفظ ✓',

    disclaimer_title: '⚠️ إخلاء المسؤولية',
    disclaimer_body:
      'هذه الأداة مخصصة للأغراض البحثية والتعليمية فقط. ' +
      'لا تُقدِّم تشخيصاً طبياً. ' +
      'يجب مراجعة وتحقق جميع النتائج التي يولدها الذكاء الاصطناعي من قِبل طبيب أشعة مؤهل.',

    about_title: 'حول كاروتيس إيه آي',
    about_body:
      'كاروتيس إيه آي هي أداة بحثية بالذكاء الاصطناعي لتحليل صور الموجات فوق الصوتية للشريان السباتي، ' +
      'طُوِّرت لدعم البحث في الأشعة ورسائل الدكتوراه.',
    about_version: 'الإصدار',
    about_tech: 'التقنية: React · Gemini AI · TailwindCSS',

    dash_welcome: 'مرحباً بك في كاروتيس إيه آي',
    dash_subtitle: 'ابدأ تحليلاً جديداً أو راجع النتائج السابقة',
    dash_new_analysis: 'تحليل جديد',
    dash_recent: 'آخر التحليلات',
    dash_empty: 'لا توجد تحليلات بعد. ارفع صورتك الأولى للبدء.',
    dash_stats_total: 'إجمالي التحليلات',
    dash_stats_today: 'اليوم',
    dash_stats_high_risk: 'نتائج عالية الخطورة',

    yes: 'نعم',
    no: 'لا',
    unknown: 'غير معروف',
    loading: 'جارٍ التحميل…',
    error: 'خطأ',
    retry: 'حاول مجدداً',
    close: 'إغلاق',
    back: 'رجوع',
    next: 'التالي',
    or: 'أو',
  },
};

export function t(lang: Language, key: string): string {
  return translations[lang]?.[key] ?? translations.en[key] ?? key;
}

export { translations };
