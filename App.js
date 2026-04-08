import React, { useMemo, useState } from "react";
import {
  Alert,
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const WHATSAPP_NUMBER = "972509101898";
const PRO_PRICE = 49;
const INTERNAL_MORTGAGE_RATE = 4.54;
const BRAND_ICON = require("./assets/icon.png");

const SCREENS = {
  dashboard: "dashboard",
  tax: "tax",
  mortgage: "mortgage",
  electricity: "electricity",
  insurance: "insurance",
  premium: "premium",
  legal: "legal",
};

const ELECTRICITY_PROFILES = ["single", "couple", "family", "home_office"];
const VEHICLE_TYPES = ["mini", "family", "suv", "luxury"];
const YES_NO = ["yes", "no"];

const TARIFF_MODELS = [
  {
    key: "balanced",
    monthlyBase: 18,
    ratePerKwh: 0.54,
    fit: { single: 1.02, couple: 1.01, family: 1.0, home_office: 1.03 },
  },
  {
    key: "smart",
    monthlyBase: 24,
    ratePerKwh: 0.49,
    fit: { single: 1.01, couple: 1.0, family: 0.98, home_office: 0.95 },
  },
  {
    key: "green",
    monthlyBase: 27,
    ratePerKwh: 0.47,
    fit: { single: 1.05, couple: 1.02, family: 0.94, home_office: 0.97 },
  },
];

const INSURANCE_PROVIDERS = ["Harel", "Migdal", "Clal"];

const STRINGS = {
  de: {
    dir: "ltr",
    brand: "Quanturion Pro",
    badge: "KÖNIGSKLASSE",
    headline: "Premium Savings Intelligence",
    subheadline:
      "Aus einem Rechner wird ein Premium-Entscheidungsprodukt: klarer Überblick, priorisierte Handlung und hochwertiger Funnel.",
    updated: "Heute aktualisiert",
    dashboard: "Cockpit",
    tax: "Steuer",
    mortgage: "Hypothek",
    electricity: "Strom",
    insurance: "Versicherung",
    premium: "Premium",
    legal: "Rechtliches",
    overviewTitle: "Dein Executive Savings Cockpit",
    overviewSubtitle:
      "Ein priorisierter Überblick über dein geschätztes Potenzial, deine nächste beste Maßnahme und den schnellsten Weg zur Umsetzung.",
    combinedPotential: "Kombiniertes Potenzial",
    annualPerspective: "Jahresperspektive",
    strongestLevers: "Stärkste Hebel",
    notIncluded: "Versicherungsprüfung separat",
    priorityTitle: "Priorisierte Roadmap",
    prioritySubtitle:
      "Nicht alles gleichzeitig. Beginne mit dem größten oder schnellsten Hebel.",
    playbookTitle: "Premium Funnel",
    playbook1: "Diagnose in unter 60 Sekunden",
    playbook2: "Einordnung mit Vertrauen, Aufwand und Tempo",
    playbook3: "Dokumenten-Checkliste statt Blindflug",
    playbook4: "Begleitete Umsetzung statt nur Weiterleitung",
    premiumFeaturesTitle: "Premium-Funktionen",
    premiumFeaturesSubtitle:
      "Diese App ist jetzt nicht nur Lead-Funnel, sondern Beratungsoberfläche.",
    feature1Title: "Savings Cockpit",
    feature1Text: "Gesamtpotenzial, Status und Prioritäten über mehrere Module.",
    feature2Title: "Executive Summary",
    feature2Text: "Klare Einordnung mit Hebel, Risiko, Aufwand und nächstem Schritt.",
    feature3Title: "Dokumentenplan",
    feature3Text: "Für jedes Modul siehst du sofort, was für die Prüfung vorbereitet werden sollte.",
    feature4Title: "Premium Funnel",
    feature4Text: "Vom Ergebnis zur Entscheidung statt direkt zu einer blinden Kontaktweiterleitung.",
    insightTrust: "Vertrauen",
    insightEffort: "Aufwand",
    insightSpeed: "Tempo",
    insightAction: "Nächster Schritt",
    high: "Hoch",
    medium: "Mittel",
    low: "Niedrig",
    fast: "Schnell",
    standard: "Standard",
    advanced: "Erweitert",
    moduleTaxTitle: "Steuerrückzahlung intelligent prüfen",
    moduleTaxSubtitle:
      "Schätze Potenzial, Priorität und Dokumentenbedarf für eine saubere Erstprüfung.",
    salary: "Monatsgehalt (₪)",
    salaryType: "Gehaltsart",
    net: "Netto",
    gross: "Brutto",
    notSure: "Nicht sicher",
    familyStatus: "Familienstatus",
    single: "Ledig",
    married: "Verheiratet",
    singleParent: "Alleinerziehend",
    children: "Kinder",
    changedEmployer: "Arbeitgeber gewechselt",
    gap: "Miluim / Mutterschutz / Auszeit",
    donations: "Spenden mit Belegen",
    pension: "Zusätzliche Beiträge",
    lastCheck: "Zuletzt geprüft",
    never: "Noch nie",
    threePlus: "Vor mehr als 3 Jahren",
    oneToTwo: "Vor 1–2 Jahren",
    recently: "Vor kurzem",
    estimateRefund: "Premium-Prüfung starten",
    moduleMortgageTitle: "Hypothek priorisiert optimieren",
    moduleMortgageSubtitle:
      "Nicht nur sparen, sondern bewerten, ob sich der nächste Schritt wirklich lohnt.",
    loanAmount: "Darlehenssumme (₪)",
    termYears: "Laufzeit (Jahre)",
    currentRate: "Aktueller Zinssatz (%) – optional",
    currentPayment: "Aktuelle Monatsrate (₪) – optional",
    checkMortgage: "Potenzial prüfen",
    moduleElectricityTitle: "Stromwechsel mit Entscheidungslogik",
    moduleElectricitySubtitle:
      "Tarifmodell, geschätzter Verbrauch und realistisches Wechselpotenzial in einer Ansicht.",
    monthlyBill: "Monatliche Stromrechnung (₪)",
    monthlyKwh: "kWh pro Monat – optional",
    usageProfile: "Nutzungsprofil",
    couple: "Paar",
    family: "Familie",
    homeOffice: "Home Office",
    checkElectricity: "Tarifvergleich starten",
    moduleInsuranceTitle: "Versicherung auf Premium-Niveau prüfen",
    moduleInsuranceSubtitle:
      "Preisband, Marktbild und strukturierte Anfrage statt unklarer Vergleichsmaske.",
    age: "Alter",
    vehicleType: "Fahrzeugtyp",
    vehicleYear: "Baujahr",
    drivingExperience: "Fahrerfahrung (Jahre)",
    claimsHistory: "Schadenshistorie",
    showInsurance: "Preisbild berechnen",
    vehicleMini: "Kleinwagen",
    vehicleFamily: "Familienauto",
    vehicleSuv: "SUV",
    vehicleLuxury: "Premium / Luxus",
    yes: "Ja",
    no: "Nein",
    resultTitle: "Executive Summary",
    resultSubtitle: "So sieht die aktuelle Einordnung für dieses Modul aus.",
    estimatedRange: "Geschätzter Korridor",
    monthlyPotentialLabel: "Monatlicher Hebel",
    annualPotentialLabel: "Jährlicher Hebel",
    benchmarkLabel: "Marktbild",
    confidence: "Confidence",
    readiness: "Readiness",
    priority: "Priorität",
    whyThisMatters: "Warum das relevant ist",
    actionPlan: "Empfohlener Aktionsplan",
    documents: "Dokumenten-Checkliste",
    contactTitle: "Nächster Premium-Schritt",
    contactSubtitle:
      "Du kannst die Executive Summary direkt mit allen Eckdaten in WhatsApp übergeben.",
    contactButton: "Executive Review via WhatsApp",
    premiumButton: "Premium-Bereich öffnen",
    documentNotice: "Die Berechnung ist eine Modellrechnung. Für eine verbindliche Einschätzung ist eine Einzelfallprüfung nötig.",
    quickSummary: "Kurzbewertung",
    bestTariff: "Bestes Tarifmodell",
    estimatedConsumption: "Geschätzter Verbrauch",
    optimizedPayment: "Mögliche neue Rate",
    annualPriceBand: "Jährliches Preisband",
    insurers: "Beispielanbieter",
    tariffBalanced: "Balanced Fix",
    tariffSmart: "Smart Flex",
    tariffGreen: "Green Family",
    riskLow: "Niedrige Komplexität",
    riskMedium: "Mittlere Komplexität",
    riskHigh: "Höhere Komplexität",
    speed7: "7 Tage",
    speed14: "14 Tage",
    speed21: "21 Tage",
    premiumTitle: "Quanturion Premium",
    premiumSubtitle:
      "Aus Leadgen wird ein betreutes Premium-Erlebnis: Priorisierung, Dokumentenlogik, Begleitung und saubere Entscheidungsführung.",
    premiumPrice: `${PRO_PRICE} ₪ / Monat`,
    premiumPillar1: "Priorisierte Bearbeitung",
    premiumPillar2: "Savings Cockpit & Executive Summary",
    premiumPillar3: "Dokumenten-Checklisten je Modul",
    premiumPillar4: "Persönlicher Maßnahmenplan und Statuslogik",
    premiumPillar5: "Schnellerer Review-Prozess",
    premiumTier1: "Orientation",
    premiumTier1Text: "Kostenlose Erstbewertung mit priorisierter Handlungsempfehlung.",
    premiumTier2: "Pro Guidance",
    premiumTier2Text: "Executive Summary, strukturierte Begleitung und Dokumentenplan.",
    premiumTier3: "Concierge",
    premiumTier3Text: "Persönliche Begleitung für komplexe oder besonders lohnende Fälle.",
    premiumActivity: "Beispiel für Premium-Aktivitäten",
    activity1: "Steuer: Potenzial erkannt, Dokumente anfordern",
    activity2: "Hypothek: Refinanzierung lohnt sich ab Experten-Review",
    activity3: "Strom: schneller Hebel, sofort umsetzbar",
    activity4: "Versicherung: Marktband plausibel, Anfrage vorbereiten",
    unlockPremium: "Premium-Anfrage starten",
    legalTitle: "Rechtlicher Rahmen",
    legalBody:
      "Alle dargestellten Werte sind Modellrechnungen. Es handelt sich nicht um verbindliche Finanz-, Steuer-, Strom- oder Versicherungsberatung. Für verbindliche Angebote oder Empfehlungen ist eine individuelle Prüfung erforderlich.",
    legalBody2:
      "Versicherungsanfragen werden nur als strukturierte Vorprüfung dargestellt. Für echte Marktangebote sind lizenzierte Anbieter oder Partner nötig.",
    footer: "Premium-Redesign: mehr Entscheidungshilfe, weniger Funnel-Lärm.",
    missingTax: "Bitte mindestens Monatsgehalt und Familienstatus eintragen.",
    missingMortgage: "Bitte Darlehenssumme, Laufzeit und Zinssatz oder Monatsrate angeben.",
    missingElectricity: "Bitte mindestens die monatliche Stromrechnung angeben.",
    missingInsurance: "Bitte Alter, Fahrzeugtyp, Baujahr und Fahrerfahrung ergänzen.",
    whatsappFail: "WhatsApp konnte auf diesem Gerät nicht geöffnet werden.",
    taxMessageIntro: "Ich möchte eine Premium-Steuerprüfung für Quanturion Pro anfragen.",
    mortgageMessageIntro: "Ich möchte eine Premium-Hypothekenprüfung für Quanturion Pro anfragen.",
    electricityMessageIntro: "Ich möchte eine Premium-Stromprüfung für Quanturion Pro anfragen.",
    insuranceMessageIntro: "Ich möchte eine Premium-Versicherungsprüfung für Quanturion Pro anfragen.",
    premiumMessageIntro: "Ich interessiere mich für Quanturion Premium.",
  },
  en: {
    dir: "ltr",
    brand: "Quanturion Pro",
    badge: "PREMIUM",
    headline: "Premium Savings Intelligence",
    subheadline:
      "Turn a calculator into a premium decision product: clear overview, smart prioritization and a stronger conversion funnel.",
    updated: "Updated today",
    dashboard: "Cockpit",
    tax: "Tax",
    mortgage: "Mortgage",
    electricity: "Electricity",
    insurance: "Insurance",
    premium: "Premium",
    legal: "Legal",
    overviewTitle: "Your Executive Savings Cockpit",
    overviewSubtitle:
      "A prioritized view of your estimated potential, your best next move and the fastest path to execution.",
    combinedPotential: "Combined potential",
    annualPerspective: "Annual perspective",
    strongestLevers: "Strongest levers",
    notIncluded: "Insurance review separate",
    priorityTitle: "Prioritized roadmap",
    prioritySubtitle:
      "Do not do everything at once. Start with the biggest or fastest lever.",
    playbookTitle: "Premium funnel",
    playbook1: "Diagnosis in under 60 seconds",
    playbook2: "Context with confidence, effort and speed",
    playbook3: "Document checklist instead of guesswork",
    playbook4: "Guided action instead of a blind handoff",
    premiumFeaturesTitle: "Premium features",
    premiumFeaturesSubtitle:
      "The app is no longer just leadgen. It is a decision surface.",
    feature1Title: "Savings cockpit",
    feature1Text: "Total potential, status and priorities across modules.",
    feature2Title: "Executive summary",
    feature2Text: "Clear context with leverage, risk, effort and next step.",
    feature3Title: "Document plan",
    feature3Text: "Each module tells you what to prepare for review.",
    feature4Title: "Premium funnel",
    feature4Text: "From result to decision, not directly into a blind contact flow.",
    insightTrust: "Trust",
    insightEffort: "Effort",
    insightSpeed: "Speed",
    insightAction: "Next step",
    high: "High",
    medium: "Medium",
    low: "Low",
    fast: "Fast",
    standard: "Standard",
    advanced: "Advanced",
    moduleTaxTitle: "Check tax refunds intelligently",
    moduleTaxSubtitle:
      "Estimate potential, priority and document needs for a cleaner first review.",
    salary: "Monthly salary (₪)",
    salaryType: "Salary type",
    net: "Net",
    gross: "Gross",
    notSure: "Not sure",
    familyStatus: "Family status",
    single: "Single",
    married: "Married",
    singleParent: "Single parent",
    children: "Children",
    changedEmployer: "Changed employer",
    gap: "Military leave / maternity / gap",
    donations: "Donations with receipts",
    pension: "Additional contributions",
    lastCheck: "Last checked",
    never: "Never",
    threePlus: "More than 3 years ago",
    oneToTwo: "1–2 years ago",
    recently: "Recently",
    estimateRefund: "Start premium review",
    moduleMortgageTitle: "Optimize your mortgage with priority logic",
    moduleMortgageSubtitle:
      "Do not just save money. Evaluate whether action is truly worth it.",
    loanAmount: "Loan amount (₪)",
    termYears: "Term (years)",
    currentRate: "Current interest rate (%) – optional",
    currentPayment: "Current monthly payment (₪) – optional",
    checkMortgage: "Check potential",
    moduleElectricityTitle: "Switch electricity with decision logic",
    moduleElectricitySubtitle:
      "Tariff model, estimated consumption and realistic switching upside in one view.",
    monthlyBill: "Monthly electricity bill (₪)",
    monthlyKwh: "kWh per month – optional",
    usageProfile: "Usage profile",
    couple: "Couple",
    family: "Family",
    homeOffice: "Home office",
    checkElectricity: "Start tariff comparison",
    moduleInsuranceTitle: "Review insurance on a premium level",
    moduleInsuranceSubtitle:
      "Price band, market view and a structured request instead of a generic form.",
    age: "Age",
    vehicleType: "Vehicle type",
    vehicleYear: "Vehicle year",
    drivingExperience: "Driving experience (years)",
    claimsHistory: "Claims history",
    showInsurance: "Calculate pricing view",
    vehicleMini: "Compact",
    vehicleFamily: "Family car",
    vehicleSuv: "SUV",
    vehicleLuxury: "Premium / luxury",
    yes: "Yes",
    no: "No",
    resultTitle: "Executive summary",
    resultSubtitle: "This is the current positioning for the selected module.",
    estimatedRange: "Estimated band",
    monthlyPotentialLabel: "Monthly leverage",
    annualPotentialLabel: "Annual leverage",
    benchmarkLabel: "Market view",
    confidence: "Confidence",
    readiness: "Readiness",
    priority: "Priority",
    whyThisMatters: "Why this matters",
    actionPlan: "Recommended action plan",
    documents: "Document checklist",
    contactTitle: "Next premium step",
    contactSubtitle:
      "You can send this executive summary with all key details directly into WhatsApp.",
    contactButton: "Executive review via WhatsApp",
    premiumButton: "Open premium area",
    documentNotice: "This is a model-based estimate. A real review is required for binding recommendations.",
    quickSummary: "Quick summary",
    bestTariff: "Best tariff model",
    estimatedConsumption: "Estimated consumption",
    optimizedPayment: "Possible new payment",
    annualPriceBand: "Annual price band",
    insurers: "Example providers",
    tariffBalanced: "Balanced Fix",
    tariffSmart: "Smart Flex",
    tariffGreen: "Green Family",
    riskLow: "Low complexity",
    riskMedium: "Medium complexity",
    riskHigh: "Higher complexity",
    speed7: "7 days",
    speed14: "14 days",
    speed21: "21 days",
    premiumTitle: "Quanturion Premium",
    premiumSubtitle:
      "Leadgen becomes a guided premium experience: prioritization, document logic, support and cleaner decision flow.",
    premiumPrice: `${PRO_PRICE} ₪ / month`,
    premiumPillar1: "Priority handling",
    premiumPillar2: "Savings cockpit & executive summary",
    premiumPillar3: "Document checklists per module",
    premiumPillar4: "Personal action plan and status logic",
    premiumPillar5: "Faster review process",
    premiumTier1: "Orientation",
    premiumTier1Text: "Free initial assessment with a prioritized recommendation.",
    premiumTier2: "Pro Guidance",
    premiumTier2Text: "Executive summary, structured support and document plan.",
    premiumTier3: "Concierge",
    premiumTier3Text: "Personal support for more complex or more valuable cases.",
    premiumActivity: "Example premium activities",
    activity1: "Tax: potential identified, request documents",
    activity2: "Mortgage: refinancing worthwhile after expert review",
    activity3: "Electricity: fast lever, can be executed immediately",
    activity4: "Insurance: market band plausible, prepare structured request",
    unlockPremium: "Start premium request",
    legalTitle: "Legal framework",
    legalBody:
      "All displayed values are model-based estimates. This is not binding financial, tax, electricity or insurance advice. A case-specific review is required for binding offers or recommendations.",
    legalBody2:
      "Insurance requests are shown only as structured pre-checks. Real market offers require licensed providers or partners.",
    footer: "Premium redesign: more decision support, less funnel noise.",
    missingTax: "Please enter at least monthly salary and family status.",
    missingMortgage: "Please enter loan amount, term and either interest rate or monthly payment.",
    missingElectricity: "Please enter at least the monthly electricity bill.",
    missingInsurance: "Please enter age, vehicle type, vehicle year and driving experience.",
    whatsappFail: "WhatsApp could not be opened on this device.",
    taxMessageIntro: "I would like a premium tax review for Quanturion Pro.",
    mortgageMessageIntro: "I would like a premium mortgage review for Quanturion Pro.",
    electricityMessageIntro: "I would like a premium electricity review for Quanturion Pro.",
    insuranceMessageIntro: "I would like a premium insurance review for Quanturion Pro.",
    premiumMessageIntro: "I am interested in Quanturion Premium.",
  },
};

STRINGS.he = {
  ...STRINGS.en,
  dir: "rtl",
  badge: "פרימיום",
  headline: "אינטליגנציית חיסכון פרימיום",
  subheadline:
    "הופכים מחשבון פשוט למוצר החלטה פרימיום: תמונה ברורה, סדר עדיפויות חכם ומשפך המרה חזק יותר.",
  updated: "עודכן היום",
  dashboard: "קוקפיט",
  tax: "מס",
  mortgage: "משכנתא",
  electricity: "חשמל",
  insurance: "ביטוח",
  premium: "פרימיום",
  legal: "משפטי",
  overviewTitle: "קוקפיט החיסכון האישי שלך",
  overviewSubtitle:
    "מבט מתועדף על פוטנציאל החיסכון שלך, הצעד הבא הטוב ביותר והדרך המהירה ביותר לביצוע.",
  combinedPotential: "פוטנציאל משולב",
  annualPerspective: "מבט שנתי",
  strongestLevers: "המנופים החזקים ביותר",
  notIncluded: "בדיקת ביטוח בנפרד",
  priorityTitle: "מפת דרכים מתועדפת",
  prioritySubtitle:
    "לא עושים הכול בבת אחת. מתחילים עם המנוף הגדול ביותר או המהיר ביותר.",
  playbookTitle: "משפך פרימיום",
  playbook1: "אבחון בפחות מ־60 שניות",
  playbook2: "הקשר ברור עם אמינות, מאמץ ומהירות",
  playbook3: "רשימת מסמכים במקום ניחושים",
  playbook4: "הובלה מודרכת במקום העברה עיוורת",
  premiumFeaturesTitle: "יכולות פרימיום",
  premiumFeaturesSubtitle:
    "האפליקציה כבר לא רק כלי לידים. היא משטח קבלת החלטות.",
  feature1Title: "קוקפיט חיסכון",
  feature1Text: "פוטנציאל כולל, סטטוס ועדיפויות בין המודולים.",
  feature2Title: "תקציר הנהלה",
  feature2Text: "הקשר ברור עם מנוף, סיכון, מאמץ והצעד הבא.",
  feature3Title: "תכנית מסמכים",
  feature3Text: "כל מודול מראה מה צריך להכין לבדיקה.",
  feature4Title: "משפך פרימיום",
  feature4Text: "מתוצאה להחלטה, לא ישר למסירת קשר עיוורת.",
  insightTrust: "אמון",
  insightEffort: "מאמץ",
  insightSpeed: "מהירות",
  insightAction: "הצעד הבא",
  high: "גבוה",
  medium: "בינוני",
  low: "נמוך",
  fast: "מהיר",
  standard: "סטנדרטי",
  advanced: "מתקדם",
  moduleTaxTitle: "בדיקת החזר מס חכמה",
  moduleTaxSubtitle:
    "הערכת פוטנציאל, עדיפות וצרכי מסמכים לפתיחה נקייה של הבדיקה.",
  salary: "שכר חודשי (₪)",
  salaryType: "סוג שכר",
  net: "נטו",
  gross: "ברוטו",
  notSure: "לא בטוח",
  familyStatus: "מצב משפחתי",
  single: "רווק/ה",
  married: "נשוי/אה",
  singleParent: "הורה יחיד",
  children: "ילדים",
  changedEmployer: "החלפת מעסיק",
  gap: "מילואים / לידה / הפסקה",
  donations: "תרומות עם קבלות",
  pension: "הפקדות נוספות",
  lastCheck: "נבדק לאחרונה",
  never: "מעולם לא",
  threePlus: "לפני יותר מ־3 שנים",
  oneToTwo: "לפני 1–2 שנים",
  recently: "לאחרונה",
  estimateRefund: "התחל בדיקת פרימיום",
  moduleMortgageTitle: "אופטימיזציית משכנתא עם סדר עדיפויות",
  moduleMortgageSubtitle:
    "לא רק לחסוך כסף, אלא להבין אם הצעד הבא באמת משתלם.",
  loanAmount: "סכום הלוואה (₪)",
  termYears: "תקופה (שנים)",
  currentRate: "ריבית נוכחית (%) – אופציונלי",
  currentPayment: "תשלום חודשי נוכחי (₪) – אופציונלי",
  checkMortgage: "בדיקת פוטנציאל",
  moduleElectricityTitle: "מעבר חשמל עם לוגיקת החלטה",
  moduleElectricitySubtitle:
    "מודל תעריף, צריכה משוערת ופוטנציאל מעבר ריאלי במסך אחד.",
  monthlyBill: "חשבון חשמל חודשי (₪)",
  monthlyKwh: "קוט״ש לחודש – אופציונלי",
  usageProfile: "פרופיל שימוש",
  couple: "זוג",
  family: "משפחה",
  homeOffice: "משרד ביתי",
  checkElectricity: "התחל השוואת תעריפים",
  moduleInsuranceTitle: "בדיקת ביטוח ברמת פרימיום",
  moduleInsuranceSubtitle:
    "טווח מחירים, תמונת שוק ופנייה מסודרת במקום טופס כללי.",
  age: "גיל",
  vehicleType: "סוג רכב",
  vehicleYear: "שנת רכב",
  drivingExperience: "ניסיון נהיגה (שנים)",
  claimsHistory: "היסטוריית תביעות",
  showInsurance: "חשב תמונת מחיר",
  vehicleMini: "קטן",
  vehicleFamily: "משפחתי",
  vehicleSuv: "SUV",
  vehicleLuxury: "פרימיום / יוקרה",
  yes: "כן",
  no: "לא",
  resultTitle: "תקציר הנהלה",
  resultSubtitle: "זו התמונה הנוכחית של המודול שנבחר.",
  estimatedRange: "טווח משוער",
  monthlyPotentialLabel: "מנוף חודשי",
  annualPotentialLabel: "מנוף שנתי",
  benchmarkLabel: "תמונת שוק",
  confidence: "אמינות",
  readiness: "מוכנות",
  priority: "עדיפות",
  whyThisMatters: "למה זה חשוב",
  actionPlan: "תכנית פעולה מומלצת",
  documents: "רשימת מסמכים",
  contactTitle: "השלב הפרימיום הבא",
  contactSubtitle:
    "אפשר לשלוח את התקציר הזה עם כל הפרטים המרכזיים ישירות ל‑WhatsApp.",
  contactButton: "בדיקת הנהלה ב‑WhatsApp",
  premiumButton: "פתח אזור פרימיום",
  documentNotice: "זו הערכת מודל בלבד. להמלצה מחייבת נדרשת בדיקה אמיתית.",
  quickSummary: "סיכום מהיר",
  bestTariff: "מודל התעריף הטוב ביותר",
  estimatedConsumption: "צריכה משוערת",
  optimizedPayment: "תשלום חדש אפשרי",
  annualPriceBand: "טווח מחיר שנתי",
  insurers: "ספקים לדוגמה",
  tariffBalanced: "Balanced Fix",
  tariffSmart: "Smart Flex",
  tariffGreen: "Green Family",
  riskLow: "מורכבות נמוכה",
  riskMedium: "מורכבות בינונית",
  riskHigh: "מורכבות גבוהה יותר",
  speed7: "7 ימים",
  speed14: "14 ימים",
  speed21: "21 ימים",
  premiumTitle: "Quanturion Premium",
  premiumSubtitle:
    "לידים הופכים לחוויית פרימיום מודרכת: תעדוף, לוגיקת מסמכים, ליווי וזרימת החלטה נקייה יותר.",
  premiumPrice: `${PRO_PRICE} ₪ / חודש`,
  premiumPillar1: "טיפול בעדיפות גבוהה",
  premiumPillar2: "קוקפיט חיסכון ותקציר הנהלה",
  premiumPillar3: "רשימות מסמכים לכל מודול",
  premiumPillar4: "תכנית פעולה אישית ולוגיקת סטטוס",
  premiumPillar5: "תהליך סקירה מהיר יותר",
  premiumTier1: "אוריינטציה",
  premiumTier1Text: "הערכה ראשונית חינמית עם המלצה מתועדפת.",
  premiumTier2: "Pro Guidance",
  premiumTier2Text: "תקציר הנהלה, ליווי מסודר ותכנית מסמכים.",
  premiumTier3: "Concierge",
  premiumTier3Text: "ליווי אישי למקרים מורכבים או בעלי ערך גבוה יותר.",
  premiumActivity: "דוגמאות לפעילויות פרימיום",
  activity1: "מס: זוהה פוטנציאל, בקשת מסמכים",
  activity2: "משכנתא: מחזור משתלם לאחר בדיקת מומחה",
  activity3: "חשמל: מנוף מהיר, ניתן לבצע מיד",
  activity4: "ביטוח: טווח שוק סביר, להכין פנייה מסודרת",
  unlockPremium: "התחל בקשת פרימיום",
  legalTitle: "מסגרת משפטית",
  legalBody:
    "כל הערכים המוצגים הם הערכות מבוססות מודל. אין כאן ייעוץ מחייב בנושאי פיננסים, מס, חשמל או ביטוח. להצעה מחייבת נדרשת בדיקה פרטנית.",
  legalBody2:
    "בקשות ביטוח מוצגות רק כבדיקה מקדימה מסודרת. הצעות שוק אמיתיות דורשות ספקים או שותפים מורשים.",
  footer: "שדרוג פרימיום: יותר תמיכה בהחלטה, פחות רעש של משפך.",
  missingTax: "נא להזין לפחות שכר חודשי ומצב משפחתי.",
  missingMortgage: "נא להזין סכום הלוואה, תקופה ואחת מהאפשרויות: ריבית או תשלום חודשי.",
  missingElectricity: "נא להזין לפחות את חשבון החשמל החודשי.",
  missingInsurance: "נא להזין גיל, סוג רכב, שנת רכב וניסיון נהיגה.",
  whatsappFail: "לא ניתן לפתוח WhatsApp במכשיר הזה.",
  taxMessageIntro: "אני רוצה בדיקת מס פרימיום עבור Quanturion Pro.",
  mortgageMessageIntro: "אני רוצה בדיקת משכנתא פרימיום עבור Quanturion Pro.",
  electricityMessageIntro: "אני רוצה בדיקת חשמל פרימיום עבור Quanturion Pro.",
  insuranceMessageIntro: "אני רוצה בדיקת ביטוח פרימיום עבור Quanturion Pro.",
  premiumMessageIntro: "אני מעוניין ב‑Quanturion Premium.",
};

function getText(lang) {
  return STRINGS[lang] || STRINGS.en;
}

function normalizeNumberInput(value) {
  return value.replace(/,/g, ".").replace(/[^0-9.]/g, "");
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function formatCurrency(value, lang) {
  const numeric = Number.isFinite(value) ? value : 0;
  return new Intl.NumberFormat(lang === "he" ? "en-US" : lang, {
    maximumFractionDigits: 0,
  }).format(Math.round(numeric));
}

function calculateMonthlyPayment(principal, annualRate, years) {
  const monthlyRate = annualRate / 100 / 12;
  const months = years * 12;
  if (!months) return 0;
  if (!monthlyRate) return principal / months;
  const factor = Math.pow(1 + monthlyRate, months);
  return (principal * monthlyRate * factor) / (factor - 1);
}

function getProfileMultiplier(profile) {
  switch (profile) {
    case "single":
      return 0.88;
    case "couple":
      return 1;
    case "home_office":
      return 1.14;
    case "family":
    default:
      return 1.2;
  }
}

function getVehicleBase(type) {
  switch (type) {
    case "mini":
      return 2800;
    case "suv":
      return 4100;
    case "luxury":
      return 5600;
    case "family":
    default:
      return 3400;
  }
}

function getPriorityLabel(score, t) {
  if (score >= 80) return t.high;
  if (score >= 60) return t.medium;
  return t.low;
}

function getEffortTone(level, t) {
  if (level === "high") return t.riskHigh;
  if (level === "medium") return t.riskMedium;
  return t.riskLow;
}

function getSpeedLabel(days, t) {
  if (days <= 7) return t.speed7;
  if (days <= 14) return t.speed14;
  return t.speed21;
}

function getModuleTitle(module, t) {
  switch (module) {
    case SCREENS.tax:
      return t.tax;
    case SCREENS.mortgage:
      return t.mortgage;
    case SCREENS.electricity:
      return t.electricity;
    case SCREENS.insurance:
      return t.insurance;
    case SCREENS.premium:
      return t.premium;
    default:
      return t.dashboard;
  }
}

function getProfileLabel(t, value) {
  switch (value) {
    case "single":
      return t.single;
    case "couple":
      return t.couple;
    case "home_office":
      return t.homeOffice;
    case "family":
    default:
      return t.family;
  }
}

function getVehicleLabel(t, value) {
  switch (value) {
    case "mini":
      return t.vehicleMini;
    case "suv":
      return t.vehicleSuv;
    case "luxury":
      return t.vehicleLuxury;
    case "family":
    default:
      return t.vehicleFamily;
  }
}

function buildTaxInsights(form, t) {
  const docs = [
    t.salary,
    form.jobChanges === "yes" ? "12x payslips / job-change proof" : "12x payslips",
    form.donations === "yes" ? "Donation receipts" : "ID / tax details",
    form.gap === "yes" ? "Gap / leave documents" : "Annual tax summary",
  ];

  return {
    why:
      form.lastCheck === "never"
        ? "Long gap since last review increases the probability of unused tax credits."
        : "Your profile suggests that a structured tax review can still uncover relevant credits.",
    steps: [
      "Validate salary basis and family data.",
      "Check tax credits, employer changes and interruption periods.",
      "Prepare a case review with supporting documents.",
    ],
    docs,
  };
}

function calculateTaxScenario(form, t) {
  const salary = parseFloat(form.salary);
  const children = parseFloat(form.children || "0");

  if (!salary || !form.familyStatus) return null;

  let annual = salary * 12;
  if (form.salaryType === "net") annual *= 1.28;
  if (form.salaryType === "unknown") annual *= 1.18;

  let base = annual * 0.055;
  if (form.jobChanges === "yes") base += annual * 0.012;
  if (form.gap === "yes") base += annual * 0.014;
  if (form.donations === "yes") base += annual * 0.004;
  if (form.pension === "yes") base += annual * 0.0035;
  if (form.familyStatus === "married") base += 700;
  if (form.familyStatus === "single_parent") base += 1200;
  if (children > 0) base += children * 480;
  if (form.lastCheck === "never") base *= 1.16;
  if (form.lastCheck === "3plus") base *= 1.08;

  const rangeMin = Math.max(Math.round(base * 0.72), 600);
  const rangeMax = Math.max(Math.round(base * 1.2), rangeMin + 400);
  const midpoint = Math.round((rangeMin + rangeMax) / 2);
  const confidence = clamp(
    62 +
      (form.jobChanges === "yes" ? 8 : 0) +
      (form.gap === "yes" ? 7 : 0) +
      (children > 0 ? 5 : 0) +
      (form.donations === "yes" ? 3 : 0),
    60,
    93
  );
  const priorityScore = clamp(
    48 +
      (form.lastCheck === "never" ? 20 : form.lastCheck === "3plus" ? 12 : 5) +
      (form.jobChanges === "yes" ? 10 : 0) +
      (form.gap === "yes" ? 10 : 0) +
      (children > 0 ? 6 : 0) +
      (form.familyStatus === "single_parent" ? 6 : 0),
    45,
    96
  );
  const insights = buildTaxInsights(form, t);

  return {
    module: SCREENS.tax,
    title: t.tax,
    primaryLabel: t.estimatedRange,
    primaryValue: `${formatCurrency(rangeMin, "en")}-${formatCurrency(rangeMax, "en")} ₪`,
    monthlyPotential: Math.round(midpoint / 12),
    annualPotential: midpoint,
    confidence,
    readiness: clamp(confidence + 4, 60, 96),
    priorityScore,
    effort: priorityScore > 82 ? "medium" : "low",
    speedDays: priorityScore > 75 ? 7 : 14,
    benchmark: `${formatCurrency(rangeMin, "en")}-${formatCurrency(rangeMax, "en")} ₪ / year`,
    insights,
  };
}

function getTaxPreview(t) {
  return {
    module: SCREENS.tax,
    title: t.tax,
    primaryLabel: t.estimatedRange,
    primaryValue: "2,200-5,400 ₪",
    monthlyPotential: 317,
    annualPotential: 3800,
    confidence: 78,
    readiness: 81,
    priorityScore: 74,
    effort: "low",
    speedDays: 7,
    benchmark: "2,200-5,400 ₪ / year",
    insights: {
      why: "Tax reviews are often underused after employer changes or family status changes.",
      steps: [
        "Collect annual salary records.",
        "Review tax credits and deductible events.",
        "Submit a structured tax case review.",
      ],
      docs: ["Payslips", "Annual tax summary", "Donation receipts if available"],
    },
  };
}

function calculateMortgageScenario(form) {
  const principal = parseFloat(form.amount);
  const years = parseFloat(form.years);
  const rate = form.rate.trim() === "" ? null : parseFloat(form.rate);
  const monthly = form.currentPayment.trim() === "" ? null : parseFloat(form.currentPayment);

  if (!principal || !years || (rate === null && monthly === null)) return null;
  if ((rate !== null && Number.isNaN(rate)) || (monthly !== null && Number.isNaN(monthly))) {
    return null;
  }

  const currentPayment = rate !== null ? calculateMonthlyPayment(principal, rate, years) : monthly;
  const optimizedPayment = calculateMonthlyPayment(principal, INTERNAL_MORTGAGE_RATE, years);
  const monthlyPotential = Math.max(Math.round(currentPayment - optimizedPayment), 0);
  const annualPotential = monthlyPotential * 12;
  const confidence = clamp(61 + (rate !== null ? 15 : 0) + (monthly !== null ? 10 : 0), 60, 93);
  const priorityScore = clamp(52 + (annualPotential > 8000 ? 18 : 8) + (principal > 1000000 ? 8 : 0), 50, 95);

  return {
    module: SCREENS.mortgage,
    title: SCREENS.mortgage,
    primaryLabel: "Mortgage",
    primaryValue: `${formatCurrency(monthlyPotential, "en")} ₪ / month`,
    monthlyPotential,
    annualPotential,
    confidence,
    readiness: clamp(confidence + (annualPotential > 6000 ? 6 : 2), 60, 95),
    priorityScore,
    effort: annualPotential > 12000 ? "medium" : "low",
    speedDays: annualPotential > 12000 ? 21 : 14,
    benchmark: `${formatCurrency(currentPayment, "en")} → ${formatCurrency(optimizedPayment, "en")} ₪`,
    currentPayment,
    optimizedPayment,
    insights: {
      why:
        annualPotential > 0
          ? "Your current structure appears to leave room for refinancing or better terms."
          : "The current structure looks relatively efficient, but an expert review could still confirm it.",
      steps: [
        "Validate current loan structure and interest mix.",
        "Review refinancing scenarios and eligibility.",
        "Decide whether the savings justify a full case process.",
      ],
      docs: ["Current mortgage schedule", "Bank summary", "Current rate breakdown"],
    },
  };
}

function getMortgagePreview() {
  return {
    module: SCREENS.mortgage,
    title: "Mortgage",
    primaryLabel: "Mortgage",
    primaryValue: "850 ₪ / month",
    monthlyPotential: 850,
    annualPotential: 10200,
    confidence: 84,
    readiness: 88,
    priorityScore: 86,
    effort: "medium",
    speedDays: 21,
    benchmark: "6,200 → 5,350 ₪",
    currentPayment: 6200,
    optimizedPayment: 5350,
    insights: {
      why: "Mortgage optimization tends to be the largest lever when the financing structure is outdated.",
      steps: [
        "Review the current structure.",
        "Compare refinance scenarios.",
        "Prepare an expert negotiation case if worthwhile.",
      ],
      docs: ["Mortgage statement", "Rate structure", "Outstanding balance confirmation"],
    },
  };
}

function calculateElectricityScenario(form, t) {
  const bill = parseFloat(form.bill);
  const kwh = form.kwh.trim() === "" ? null : parseFloat(form.kwh);
  if (!bill || Number.isNaN(bill)) return null;

  const profile = form.profile || "family";
  const estimatedConsumption = kwh ? kwh : Math.max(160, (bill - 28) / 0.6) * getProfileMultiplier(profile);

  const evaluated = TARIFF_MODELS.map((model) => {
    const fit = model.fit[profile] || 1;
    const monthlyCost = model.monthlyBase + estimatedConsumption * model.ratePerKwh * fit;
    return { ...model, monthlyCost };
  }).sort((a, b) => a.monthlyCost - b.monthlyCost);

  const best = evaluated[0];
  const monthlyPotential = Math.max(Math.round(bill - best.monthlyCost), 0);
  const annualPotential = monthlyPotential * 12;
  const confidence = clamp(66 + (kwh ? 14 : 0) + (profile ? 8 : 0), 62, 91);
  const priorityScore = clamp(58 + (monthlyPotential > 90 ? 14 : 8) + (kwh ? 6 : 0), 55, 92);

  return {
    module: SCREENS.electricity,
    title: t.electricity,
    primaryLabel: t.bestTariff,
    primaryValue:
      best.key === "balanced"
        ? t.tariffBalanced
        : best.key === "smart"
        ? t.tariffSmart
        : t.tariffGreen,
    monthlyPotential,
    annualPotential,
    confidence,
    readiness: clamp(confidence + 6, 64, 94),
    priorityScore,
    effort: best.key === "smart" ? "medium" : "low",
    speedDays: 7,
    benchmark: `${formatCurrency(best.monthlyCost, "en")} ₪ / month`,
    estimatedConsumption,
    estimatedTariffCost: Math.round(best.monthlyCost),
    bestTariffKey:
      best.key === "balanced"
        ? "tariffBalanced"
        : best.key === "smart"
        ? "tariffSmart"
        : "tariffGreen",
    insights: {
      why: "Electricity is often the fastest operational win, even if the absolute savings are smaller.",
      steps: [
        "Validate your latest monthly bill.",
        "Confirm the recommended tariff logic.",
        "Switch only if the effort-to-savings ratio remains attractive.",
      ],
      docs: ["Latest electricity bill", "Customer number", "Usage pattern if known"],
    },
  };
}

function getElectricityPreview(t) {
  return {
    module: SCREENS.electricity,
    title: t.electricity,
    primaryLabel: t.bestTariff,
    primaryValue: t.tariffSmart,
    monthlyPotential: 120,
    annualPotential: 1440,
    confidence: 79,
    readiness: 83,
    priorityScore: 72,
    effort: "low",
    speedDays: 7,
    benchmark: "430 ₪ / month",
    estimatedConsumption: 620,
    estimatedTariffCost: 430,
    bestTariffKey: "tariffSmart",
    insights: {
      why: "This is usually the quickest savings lever with low operational friction.",
      steps: [
        "Check the current provider and bill.",
        "Validate the best-fit tariff model.",
        "Start the provider switch if numbers hold.",
      ],
      docs: ["Latest bill", "Provider details", "Consumption data if available"],
    },
  };
}

function calculateInsuranceScenario(form, t) {
  const age = parseFloat(form.age);
  const year = parseFloat(form.year);
  const experience = parseFloat(form.experience);

  if (!age || !year || !experience || !form.vehicleType) return null;

  let base = getVehicleBase(form.vehicleType);
  if (age < 24) base *= 1.32;
  else if (age < 30) base *= 1.12;
  else if (age > 55) base *= 1.05;

  if (experience < 2) base *= 1.28;
  else if (experience < 5) base *= 1.12;
  else if (experience > 12) base *= 0.95;

  const currentYear = new Date().getFullYear();
  const vehicleAge = currentYear - year;
  if (vehicleAge <= 2) base *= 1.08;
  else if (vehicleAge >= 10) base *= 0.94;
  if (form.claims === "yes") base *= 1.22;

  const rangeMin = Math.round(base * 0.9);
  const rangeMax = Math.round(base * 1.17);
  const midpoint = Math.round((rangeMin + rangeMax) / 2);
  const annualPotential = Math.max(Math.round((rangeMax - rangeMin) * 0.55), 350);
  const confidence = clamp(69 + (experience ? 8 : 0) + (form.claims ? 6 : 0), 64, 92);
  const priorityScore = clamp(56 + (form.claims === "no" ? 8 : 0) + (age > 25 ? 6 : 0), 55, 88);

  return {
    module: SCREENS.insurance,
    title: t.insurance,
    primaryLabel: t.annualPriceBand,
    primaryValue: `${formatCurrency(rangeMin, "en")}-${formatCurrency(rangeMax, "en")} ₪`,
    monthlyPotential: Math.round(annualPotential / 12),
    annualPotential,
    confidence,
    readiness: clamp(confidence + 3, 64, 93),
    priorityScore,
    effort: "low",
    speedDays: 14,
    benchmark: `${formatCurrency(midpoint, "en")} ₪ midpoint`,
    rangeMin,
    rangeMax,
    providers: INSURANCE_PROVIDERS,
    insights: {
      why: "Insurance review is about structured market positioning and avoiding overpaying for a similar risk profile.",
      steps: [
        "Confirm vehicle and driver profile.",
        "Validate claims history and coverage needs.",
        "Send a structured request to licensed providers or partners.",
      ],
      docs: ["Current policy", "Driver history", "Vehicle registration"],
    },
  };
}

function getInsurancePreview(t) {
  return {
    module: SCREENS.insurance,
    title: t.insurance,
    primaryLabel: t.annualPriceBand,
    primaryValue: "2,800-3,900 ₪",
    monthlyPotential: 92,
    annualPotential: 1100,
    confidence: 76,
    readiness: 79,
    priorityScore: 66,
    effort: "low",
    speedDays: 14,
    benchmark: "3,350 ₪ midpoint",
    rangeMin: 2800,
    rangeMax: 3900,
    providers: INSURANCE_PROVIDERS,
    insights: {
      why: "Insurance is rarely the largest lever, but often an easy quality-and-price optimization.",
      steps: [
        "Review current cover.",
        "Validate your risk profile.",
        "Prepare a structured market request.",
      ],
      docs: ["Current policy", "Claims history", "Vehicle registration"],
    },
  };
}

function getModuleEmoji(screen) {
  switch (screen) {
    case SCREENS.tax:
      return "₪";
    case SCREENS.mortgage:
      return "⌂";
    case SCREENS.electricity:
      return "⚡";
    case SCREENS.insurance:
      return "◈";
    case SCREENS.premium:
      return "Q";
    default:
      return "Q";
  }
}

function buildWhatsAppMessage(screen, result, t) {
  const intro =
    screen === SCREENS.tax
      ? t.taxMessageIntro
      : screen === SCREENS.mortgage
      ? t.mortgageMessageIntro
      : screen === SCREENS.electricity
      ? t.electricityMessageIntro
      : screen === SCREENS.insurance
      ? t.insuranceMessageIntro
      : t.premiumMessageIntro;

  const lines = [
    intro,
    "",
    `${t.resultTitle}: ${getModuleTitle(result.module, t)}`,
    `${t.monthlyPotentialLabel}: ${formatCurrency(result.monthlyPotential, "en")} ₪`,
    `${t.annualPotentialLabel}: ${formatCurrency(result.annualPotential, "en")} ₪`,
    `${t.confidence}: ${result.confidence}/100`,
    `${t.readiness}: ${result.readiness}/100`,
    `${t.priority}: ${getPriorityLabel(result.priorityScore, t)}`,
    `${t.insightAction}: ${result.insights.steps[0]}`,
  ];

  if (screen === SCREENS.mortgage) {
    lines.push(`${t.optimizedPayment}: ${formatCurrency(result.optimizedPayment, "en")} ₪`);
  }
  if (screen === SCREENS.electricity) {
    lines.push(`${t.bestTariff}: ${t[result.bestTariffKey]}`);
  }
  if (screen === SCREENS.insurance) {
    lines.push(`${t.annualPriceBand}: ${result.primaryValue}`);
  }

  return lines.join("\n");
}

async function openWhatsApp(message, t) {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  const supported = await Linking.canOpenURL(url);
  if (!supported) {
    Alert.alert("WhatsApp", t.whatsappFail);
    return;
  }
  await Linking.openURL(url);
}

function LanguageToggle({ lang, setLang }) {
  return (
    <View style={styles.langRow}>
      {["de", "en", "he"].map((item) => (
        <TouchableOpacity
          key={item}
          style={[styles.langChip, lang === item && styles.langChipActive]}
          onPress={() => setLang(item)}
        >
          <Text style={[styles.langChipText, lang === item && styles.langChipTextActive]}>
            {item.toUpperCase()}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

function NavChips({ current, onChange, t }) {
  const items = [
    [SCREENS.dashboard, t.dashboard],
    [SCREENS.tax, t.tax],
    [SCREENS.mortgage, t.mortgage],
    [SCREENS.electricity, t.electricity],
    [SCREENS.insurance, t.insurance],
    [SCREENS.premium, t.premium],
    [SCREENS.legal, t.legal],
  ];

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.navRow}>
      {items.map(([key, label]) => (
        <TouchableOpacity
          key={key}
          style={[styles.navChip, current === key && styles.navChipActive]}
          onPress={() => onChange(key)}
        >
          <Text style={[styles.navChipText, current === key && styles.navChipTextActive]}>
            {label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

function SectionCard({ children, dark = false, style }) {
  return <View style={[dark ? styles.cardDark : styles.cardLight, style]}>{children}</View>;
}

function FieldLabel({ label, textAlign }) {
  return <Text style={[styles.fieldLabel, { textAlign }]}>{label}</Text>;
}

function FieldInput({ value, onChangeText, placeholder, keyboardType = "default", textAlign }) {
  return (
    <TextInput
      style={[styles.input, { textAlign }]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="#7E8BA5"
      keyboardType={keyboardType}
    />
  );
}

function OptionGroup({ items, value, onChange, getLabel }) {
  return (
    <View style={styles.optionWrap}>
      {items.map((item) => (
        <TouchableOpacity
          key={item}
          style={[styles.optionChip, value === item && styles.optionChipActive]}
          onPress={() => onChange(item)}
        >
          <Text style={[styles.optionChipText, value === item && styles.optionChipTextActive]}>
            {getLabel(item)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

function InsightTile({ label, value }) {
  return (
    <View style={styles.insightTile}>
      <Text style={styles.insightTileLabel}>{label}</Text>
      <Text style={styles.insightTileValue}>{value}</Text>
    </View>
  );
}

function BulletList({ items, textAlign }) {
  return (
    <View style={styles.bulletWrap}>
      {items.map((item) => (
        <View key={item} style={styles.bulletRow}>
          <View style={styles.bulletDot} />
          <Text style={[styles.bulletText, { textAlign }]}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

function HeaderBlock({ t, textAlign }) {
  return (
    <SectionCard dark style={styles.headerBlock}>
      <View style={styles.headerTopRow}>
        <View style={styles.brandRow}>
          <Image source={BRAND_ICON} style={styles.brandIcon} />
          <View>
            <Text style={[styles.brandText, { textAlign }]}>{t.brand}</Text>
            <Text style={[styles.updatedText, { textAlign }]}>{t.updated}</Text>
          </View>
        </View>
        <View style={styles.badgePill}>
          <Text style={styles.badgePillText}>{t.badge}</Text>
        </View>
      </View>
      <Text style={[styles.mainTitle, { textAlign }]}>{t.headline}</Text>
      <Text style={[styles.mainSubtitle, { textAlign }]}>{t.subheadline}</Text>
    </SectionCard>
  );
}

function OverviewScreen({ t, lang, modules, onOpen }) {
  const ranked = [...modules].sort((a, b) => b.annualPotential - a.annualPotential);
  const combinedMonthly = modules
    .filter((item) => item.module !== SCREENS.insurance)
    .reduce((sum, item) => sum + item.monthlyPotential, 0);
  const combinedAnnual = modules
    .filter((item) => item.module !== SCREENS.insurance)
    .reduce((sum, item) => sum + item.annualPotential, 0);

  return (
    <>
      <SectionCard dark>
        <Text style={styles.sectionEyebrow}>{t.dashboard}</Text>
        <Text style={styles.sectionTitleLight}>{t.overviewTitle}</Text>
        <Text style={styles.sectionTextLight}>{t.overviewSubtitle}</Text>
        <View style={styles.summaryHeroRow}>
          <View style={styles.summaryHeroBox}>
            <Text style={styles.summaryHeroLabel}>{t.combinedPotential}</Text>
            <Text style={styles.summaryHeroValue}>{formatCurrency(combinedMonthly, lang)} ₪</Text>
            <Text style={styles.summaryHeroSub}>{t.monthlyPotentialLabel}</Text>
          </View>
          <View style={styles.summaryHeroBoxAlt}>
            <Text style={styles.summaryHeroLabelDark}>{t.annualPerspective}</Text>
            <Text style={styles.summaryHeroValueDark}>{formatCurrency(combinedAnnual, lang)} ₪</Text>
            <Text style={styles.summaryHeroSubDark}>{t.notIncluded}</Text>
          </View>
        </View>
      </SectionCard>

      <SectionCard>
        <Text style={styles.sectionTitle}>{t.priorityTitle}</Text>
        <Text style={styles.sectionText}>{t.prioritySubtitle}</Text>
        {ranked.map((item, index) => (
          <TouchableOpacity key={item.module} style={styles.roadmapRow} onPress={() => onOpen(item.module)}>
            <View style={styles.roadmapRank}><Text style={styles.roadmapRankText}>{index + 1}</Text></View>
            <View style={styles.roadmapBody}>
              <Text style={styles.roadmapTitle}>{getModuleTitle(item.module, t)}</Text>
              <Text style={styles.roadmapMeta}>
                {formatCurrency(item.annualPotential, lang)} ₪ / year · {getPriorityLabel(item.priorityScore, t)}
              </Text>
            </View>
            <View style={styles.roadmapTag}>
              <Text style={styles.roadmapTagText}>{getSpeedLabel(item.speedDays, t)}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </SectionCard>

      <SectionCard>
        <Text style={styles.sectionTitle}>{t.playbookTitle}</Text>
        <BulletList
          items={[t.playbook1, t.playbook2, t.playbook3, t.playbook4]}
          textAlign={lang === "he" ? "right" : "left"}
        />
      </SectionCard>

      <SectionCard>
        <Text style={styles.sectionTitle}>{t.premiumFeaturesTitle}</Text>
        <Text style={styles.sectionText}>{t.premiumFeaturesSubtitle}</Text>
        <View style={styles.featureGrid}>
          {[
            [t.feature1Title, t.feature1Text],
            [t.feature2Title, t.feature2Text],
            [t.feature3Title, t.feature3Text],
            [t.feature4Title, t.feature4Text],
          ].map(([title, copy]) => (
            <View key={title} style={styles.featureCard}>
              <Text style={styles.featureCardTitle}>{title}</Text>
              <Text style={styles.featureCardText}>{copy}</Text>
            </View>
          ))}
        </View>
      </SectionCard>
    </>
  );
}

function ModuleResult({ result, t, lang, textAlign, onContact, onOpenPremium }) {
  return (
    <>
      <SectionCard dark>
        <Text style={styles.sectionEyebrow}>{t.resultTitle}</Text>
        <Text style={styles.sectionTitleLight}>{getModuleTitle(result.module, t)}</Text>
        <Text style={styles.sectionTextLight}>{t.resultSubtitle}</Text>
        <View style={styles.resultHeroWrap}>
          <Text style={styles.resultPrimaryLabel}>{result.primaryLabel}</Text>
          <Text style={styles.resultPrimaryValue}>{result.primaryValue}</Text>
          <Text style={styles.resultSecondaryText}>
            {t.monthlyPotentialLabel}: {formatCurrency(result.monthlyPotential, lang)} ₪ · {t.annualPotentialLabel}: {formatCurrency(result.annualPotential, lang)} ₪
          </Text>
        </View>
      </SectionCard>

      <View style={styles.insightGrid}>
        <InsightTile label={t.confidence} value={`${result.confidence}/100`} />
        <InsightTile label={t.readiness} value={`${result.readiness}/100`} />
        <InsightTile label={t.priority} value={getPriorityLabel(result.priorityScore, t)} />
        <InsightTile label={t.insightEffort} value={getEffortTone(result.effort, t)} />
      </View>

      <SectionCard>
        <Text style={[styles.sectionTitle, { textAlign }]}>{t.quickSummary}</Text>
        <View style={styles.summaryGrid}>
          <View style={styles.summaryMiniCard}>
            <Text style={styles.summaryMiniLabel}>{t.monthlyPotentialLabel}</Text>
            <Text style={styles.summaryMiniValue}>{formatCurrency(result.monthlyPotential, lang)} ₪</Text>
          </View>
          <View style={styles.summaryMiniCard}>
            <Text style={styles.summaryMiniLabel}>{t.annualPotentialLabel}</Text>
            <Text style={styles.summaryMiniValue}>{formatCurrency(result.annualPotential, lang)} ₪</Text>
          </View>
          <View style={styles.summaryMiniCard}>
            <Text style={styles.summaryMiniLabel}>{t.benchmarkLabel}</Text>
            <Text style={styles.summaryMiniValueSmall}>{result.benchmark}</Text>
          </View>
          <View style={styles.summaryMiniCard}>
            <Text style={styles.summaryMiniLabel}>{t.insightSpeed}</Text>
            <Text style={styles.summaryMiniValueSmall}>{getSpeedLabel(result.speedDays, t)}</Text>
          </View>
        </View>
        {typeof result.optimizedPayment === "number" ? (
          <View style={styles.detailLine}>
            <Text style={styles.detailLineLabel}>{t.optimizedPayment}</Text>
            <Text style={styles.detailLineValue}>{formatCurrency(result.optimizedPayment, lang)} ₪</Text>
          </View>
        ) : null}
        {typeof result.estimatedConsumption === "number" ? (
          <>
            <View style={styles.detailLine}>
              <Text style={styles.detailLineLabel}>{t.estimatedConsumption}</Text>
              <Text style={styles.detailLineValue}>{formatCurrency(result.estimatedConsumption, lang)} kWh</Text>
            </View>
            <View style={styles.detailLine}>
              <Text style={styles.detailLineLabel}>{t.bestTariff}</Text>
              <Text style={styles.detailLineValue}>{t[result.bestTariffKey]}</Text>
            </View>
          </>
        ) : null}
        {typeof result.rangeMin === "number" ? (
          <>
            <View style={styles.detailLine}>
              <Text style={styles.detailLineLabel}>{t.annualPriceBand}</Text>
              <Text style={styles.detailLineValue}>{formatCurrency(result.rangeMin, lang)}-{formatCurrency(result.rangeMax, lang)} ₪</Text>
            </View>
            <View style={styles.providerWrap}>
              {result.providers.map((provider) => (
                <View key={provider} style={styles.providerPill}>
                  <Text style={styles.providerPillText}>{provider}</Text>
                </View>
              ))}
            </View>
          </>
        ) : null}
      </SectionCard>

      <SectionCard>
        <Text style={[styles.sectionTitle, { textAlign }]}>{t.whyThisMatters}</Text>
        <Text style={[styles.sectionText, { textAlign }]}>{result.insights.why}</Text>
      </SectionCard>

      <SectionCard>
        <Text style={[styles.sectionTitle, { textAlign }]}>{t.actionPlan}</Text>
        <BulletList items={result.insights.steps} textAlign={textAlign} />
      </SectionCard>

      <SectionCard>
        <Text style={[styles.sectionTitle, { textAlign }]}>{t.documents}</Text>
        <BulletList items={result.insights.docs} textAlign={textAlign} />
        <Text style={[styles.noticeText, { textAlign }]}>{t.documentNotice}</Text>
      </SectionCard>

      <SectionCard dark>
        <Text style={[styles.sectionTitleLight, { textAlign }]}>{t.contactTitle}</Text>
        <Text style={[styles.sectionTextLight, { textAlign }]}>{t.contactSubtitle}</Text>
        <TouchableOpacity style={styles.primaryButton} onPress={onContact}>
          <Text style={styles.primaryButtonText}>{t.contactButton}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton} onPress={onOpenPremium}>
          <Text style={styles.secondaryButtonText}>{t.premiumButton}</Text>
        </TouchableOpacity>
      </SectionCard>
    </>
  );
}

function PremiumScreen({ t, onContact }) {
  return (
    <>
      <SectionCard dark>
        <Text style={styles.sectionEyebrow}>{t.premium}</Text>
        <Text style={styles.sectionTitleLight}>{t.premiumTitle}</Text>
        <Text style={styles.sectionTextLight}>{t.premiumSubtitle}</Text>
        <View style={styles.priceBadge}>
          <Text style={styles.priceBadgeText}>{t.premiumPrice}</Text>
        </View>
      </SectionCard>

      <SectionCard>
        <BulletList
          items={[t.premiumPillar1, t.premiumPillar2, t.premiumPillar3, t.premiumPillar4, t.premiumPillar5]}
          textAlign="left"
        />
      </SectionCard>

      <View style={styles.featureGrid}>
        {[
          [t.premiumTier1, t.premiumTier1Text],
          [t.premiumTier2, t.premiumTier2Text],
          [t.premiumTier3, t.premiumTier3Text],
        ].map(([title, copy]) => (
          <SectionCard key={title} style={styles.tierCard}>
            <Text style={styles.featureCardTitle}>{title}</Text>
            <Text style={styles.featureCardText}>{copy}</Text>
          </SectionCard>
        ))}
      </View>

      <SectionCard>
        <Text style={styles.sectionTitle}>{t.premiumActivity}</Text>
        <BulletList items={[t.activity1, t.activity2, t.activity3, t.activity4]} textAlign="left" />
      </SectionCard>

      <SectionCard dark>
        <TouchableOpacity style={styles.primaryButton} onPress={onContact}>
          <Text style={styles.primaryButtonText}>{t.unlockPremium}</Text>
        </TouchableOpacity>
      </SectionCard>
    </>
  );
}

function LegalScreen({ t, textAlign }) {
  return (
    <SectionCard>
      <Text style={[styles.sectionTitle, { textAlign }]}>{t.legalTitle}</Text>
      <Text style={[styles.sectionText, { textAlign }]}>{t.legalBody}</Text>
      <Text style={[styles.sectionText, { textAlign, marginTop: 12 }]}>{t.legalBody2}</Text>
    </SectionCard>
  );
}

export default function App() {
  const [lang, setLang] = useState("de");
  const [screen, setScreen] = useState(SCREENS.dashboard);

  const [taxForm, setTaxForm] = useState({
    salary: "",
    salaryType: "net",
    familyStatus: "single",
    children: "0",
    jobChanges: "no",
    gap: "no",
    donations: "no",
    pension: "no",
    lastCheck: "never",
  });
  const [mortgageForm, setMortgageForm] = useState({ amount: "", years: "", rate: "", currentPayment: "" });
  const [electricityForm, setElectricityForm] = useState({ bill: "", kwh: "", profile: "family" });
  const [insuranceForm, setInsuranceForm] = useState({ age: "", vehicleType: "family", year: "", experience: "", claims: "no" });
  const [taxResult, setTaxResult] = useState(null);
  const [mortgageResult, setMortgageResult] = useState(null);
  const [electricityResult, setElectricityResult] = useState(null);
  const [insuranceResult, setInsuranceResult] = useState(null);
  const [errorText, setErrorText] = useState("");

  const t = getText(lang);
  const textAlign = t.dir === "rtl" ? "right" : "left";

  const previewTax = useMemo(() => getTaxPreview(t), [t]);
  const previewMortgage = useMemo(() => getMortgagePreview(), []);
  const previewElectricity = useMemo(() => getElectricityPreview(t), [t]);
  const previewInsurance = useMemo(() => getInsurancePreview(t), [t]);

  const moduleStates = [
    taxResult || previewTax,
    mortgageResult || previewMortgage,
    electricityResult || previewElectricity,
    insuranceResult || previewInsurance,
  ];

  const handleTax = () => {
    const result = calculateTaxScenario(taxForm, t);
    if (!result) {
      setErrorText(t.missingTax);
      return;
    }
    result.title = t.tax;
    setErrorText("");
    setTaxResult(result);
  };

  const handleMortgage = () => {
    const result = calculateMortgageScenario(mortgageForm);
    if (!result) {
      setErrorText(t.missingMortgage);
      return;
    }
    result.title = t.mortgage;
    result.primaryLabel = t.monthlyPotentialLabel;
    result.primaryValue = `${formatCurrency(result.monthlyPotential, lang)} ₪ / month`;
    setErrorText("");
    setMortgageResult(result);
  };

  const handleElectricity = () => {
    const result = calculateElectricityScenario(electricityForm, t);
    if (!result) {
      setErrorText(t.missingElectricity);
      return;
    }
    result.title = t.electricity;
    setErrorText("");
    setElectricityResult(result);
  };

  const handleInsurance = () => {
    const result = calculateInsuranceScenario(insuranceForm, t);
    if (!result) {
      setErrorText(t.missingInsurance);
      return;
    }
    result.title = t.insurance;
    setErrorText("");
    setInsuranceResult(result);
  };

  const currentResult =
    screen === SCREENS.tax
      ? taxResult || previewTax
      : screen === SCREENS.mortgage
      ? mortgageResult || previewMortgage
      : screen === SCREENS.electricity
      ? electricityResult || previewElectricity
      : screen === SCREENS.insurance
      ? insuranceResult || previewInsurance
      : null;

  const contactCurrentModule = async () => {
    if (!currentResult) return;
    await openWhatsApp(buildWhatsAppMessage(screen, currentResult, t), t);
  };

  const contactPremium = async () => {
    await openWhatsApp(t.premiumMessageIntro, t);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
        <HeaderBlock t={t} textAlign={textAlign} />
        <LanguageToggle lang={lang} setLang={setLang} />
        <NavChips current={screen} onChange={setScreen} t={t} />

        {screen === SCREENS.dashboard ? (
          <OverviewScreen t={t} lang={lang} modules={moduleStates} onOpen={setScreen} />
        ) : null}

        {screen === SCREENS.tax ? (
          <>
            <SectionCard>
              <Text style={[styles.sectionTitle, { textAlign }]}>{t.moduleTaxTitle}</Text>
              <Text style={[styles.sectionText, { textAlign }]}>{t.moduleTaxSubtitle}</Text>
              <FieldLabel label={t.salary} textAlign={textAlign} />
              <FieldInput
                value={taxForm.salary}
                onChangeText={(v) => setTaxForm((prev) => ({ ...prev, salary: normalizeNumberInput(v) }))}
                placeholder={t.salary}
                keyboardType="numeric"
                textAlign={textAlign}
              />
              <FieldLabel label={t.salaryType} textAlign={textAlign} />
              <OptionGroup
                items={["net", "gross", "unknown"]}
                value={taxForm.salaryType}
                onChange={(value) => setTaxForm((prev) => ({ ...prev, salaryType: value }))}
                getLabel={(value) => (value === "net" ? t.net : value === "gross" ? t.gross : t.notSure)}
              />
              <FieldLabel label={t.familyStatus} textAlign={textAlign} />
              <OptionGroup
                items={["single", "married", "single_parent"]}
                value={taxForm.familyStatus}
                onChange={(value) => setTaxForm((prev) => ({ ...prev, familyStatus: value }))}
                getLabel={(value) =>
                  value === "single" ? t.single : value === "married" ? t.married : t.singleParent
                }
              />
              <FieldLabel label={t.children} textAlign={textAlign} />
              <FieldInput
                value={taxForm.children}
                onChangeText={(v) => setTaxForm((prev) => ({ ...prev, children: normalizeNumberInput(v) }))}
                placeholder={t.children}
                keyboardType="numeric"
                textAlign={textAlign}
              />
              <FieldLabel label={t.changedEmployer} textAlign={textAlign} />
              <OptionGroup items={YES_NO} value={taxForm.jobChanges} onChange={(value) => setTaxForm((prev) => ({ ...prev, jobChanges: value }))} getLabel={(value) => (value === "yes" ? t.yes : t.no)} />
              <FieldLabel label={t.gap} textAlign={textAlign} />
              <OptionGroup items={YES_NO} value={taxForm.gap} onChange={(value) => setTaxForm((prev) => ({ ...prev, gap: value }))} getLabel={(value) => (value === "yes" ? t.yes : t.no)} />
              <FieldLabel label={t.donations} textAlign={textAlign} />
              <OptionGroup items={YES_NO} value={taxForm.donations} onChange={(value) => setTaxForm((prev) => ({ ...prev, donations: value }))} getLabel={(value) => (value === "yes" ? t.yes : t.no)} />
              <FieldLabel label={t.pension} textAlign={textAlign} />
              <OptionGroup items={YES_NO} value={taxForm.pension} onChange={(value) => setTaxForm((prev) => ({ ...prev, pension: value }))} getLabel={(value) => (value === "yes" ? t.yes : t.no)} />
              <FieldLabel label={t.lastCheck} textAlign={textAlign} />
              <OptionGroup
                items={["never", "3plus", "1to2", "recent"]}
                value={taxForm.lastCheck}
                onChange={(value) => setTaxForm((prev) => ({ ...prev, lastCheck: value }))}
                getLabel={(value) =>
                  value === "never"
                    ? t.never
                    : value === "3plus"
                    ? t.threePlus
                    : value === "1to2"
                    ? t.oneToTwo
                    : t.recently
                }
              />
              <TouchableOpacity style={styles.primaryButton} onPress={handleTax}>
                <Text style={styles.primaryButtonText}>{t.estimateRefund}</Text>
              </TouchableOpacity>
              {errorText ? <Text style={[styles.errorText, { textAlign }]}>{errorText}</Text> : null}
            </SectionCard>
            <ModuleResult result={currentResult} t={t} lang={lang} textAlign={textAlign} onContact={contactCurrentModule} onOpenPremium={() => setScreen(SCREENS.premium)} />
          </>
        ) : null}

        {screen === SCREENS.mortgage ? (
          <>
            <SectionCard>
              <Text style={[styles.sectionTitle, { textAlign }]}>{t.moduleMortgageTitle}</Text>
              <Text style={[styles.sectionText, { textAlign }]}>{t.moduleMortgageSubtitle}</Text>
              <FieldLabel label={t.loanAmount} textAlign={textAlign} />
              <FieldInput
                value={mortgageForm.amount}
                onChangeText={(v) => setMortgageForm((prev) => ({ ...prev, amount: normalizeNumberInput(v) }))}
                placeholder={t.loanAmount}
                keyboardType="numeric"
                textAlign={textAlign}
              />
              <FieldLabel label={t.termYears} textAlign={textAlign} />
              <FieldInput
                value={mortgageForm.years}
                onChangeText={(v) => setMortgageForm((prev) => ({ ...prev, years: normalizeNumberInput(v) }))}
                placeholder={t.termYears}
                keyboardType="numeric"
                textAlign={textAlign}
              />
              <FieldLabel label={t.currentRate} textAlign={textAlign} />
              <FieldInput
                value={mortgageForm.rate}
                onChangeText={(v) => setMortgageForm((prev) => ({ ...prev, rate: normalizeNumberInput(v) }))}
                placeholder={t.currentRate}
                keyboardType="numeric"
                textAlign={textAlign}
              />
              <FieldLabel label={t.currentPayment} textAlign={textAlign} />
              <FieldInput
                value={mortgageForm.currentPayment}
                onChangeText={(v) => setMortgageForm((prev) => ({ ...prev, currentPayment: normalizeNumberInput(v) }))}
                placeholder={t.currentPayment}
                keyboardType="numeric"
                textAlign={textAlign}
              />
              <TouchableOpacity style={styles.primaryButton} onPress={handleMortgage}>
                <Text style={styles.primaryButtonText}>{t.checkMortgage}</Text>
              </TouchableOpacity>
              {errorText ? <Text style={[styles.errorText, { textAlign }]}>{errorText}</Text> : null}
            </SectionCard>
            <ModuleResult result={currentResult} t={t} lang={lang} textAlign={textAlign} onContact={contactCurrentModule} onOpenPremium={() => setScreen(SCREENS.premium)} />
          </>
        ) : null}

        {screen === SCREENS.electricity ? (
          <>
            <SectionCard>
              <Text style={[styles.sectionTitle, { textAlign }]}>{t.moduleElectricityTitle}</Text>
              <Text style={[styles.sectionText, { textAlign }]}>{t.moduleElectricitySubtitle}</Text>
              <FieldLabel label={t.monthlyBill} textAlign={textAlign} />
              <FieldInput
                value={electricityForm.bill}
                onChangeText={(v) => setElectricityForm((prev) => ({ ...prev, bill: normalizeNumberInput(v) }))}
                placeholder={t.monthlyBill}
                keyboardType="numeric"
                textAlign={textAlign}
              />
              <FieldLabel label={t.monthlyKwh} textAlign={textAlign} />
              <FieldInput
                value={electricityForm.kwh}
                onChangeText={(v) => setElectricityForm((prev) => ({ ...prev, kwh: normalizeNumberInput(v) }))}
                placeholder={t.monthlyKwh}
                keyboardType="numeric"
                textAlign={textAlign}
              />
              <FieldLabel label={t.usageProfile} textAlign={textAlign} />
              <OptionGroup
                items={ELECTRICITY_PROFILES}
                value={electricityForm.profile}
                onChange={(value) => setElectricityForm((prev) => ({ ...prev, profile: value }))}
                getLabel={(value) => getProfileLabel(t, value)}
              />
              <TouchableOpacity style={styles.primaryButton} onPress={handleElectricity}>
                <Text style={styles.primaryButtonText}>{t.checkElectricity}</Text>
              </TouchableOpacity>
              {errorText ? <Text style={[styles.errorText, { textAlign }]}>{errorText}</Text> : null}
            </SectionCard>
            <ModuleResult result={currentResult} t={t} lang={lang} textAlign={textAlign} onContact={contactCurrentModule} onOpenPremium={() => setScreen(SCREENS.premium)} />
          </>
        ) : null}

        {screen === SCREENS.insurance ? (
          <>
            <SectionCard>
              <Text style={[styles.sectionTitle, { textAlign }]}>{t.moduleInsuranceTitle}</Text>
              <Text style={[styles.sectionText, { textAlign }]}>{t.moduleInsuranceSubtitle}</Text>
              <FieldLabel label={t.age} textAlign={textAlign} />
              <FieldInput
                value={insuranceForm.age}
                onChangeText={(v) => setInsuranceForm((prev) => ({ ...prev, age: normalizeNumberInput(v) }))}
                placeholder={t.age}
                keyboardType="numeric"
                textAlign={textAlign}
              />
              <FieldLabel label={t.vehicleType} textAlign={textAlign} />
              <OptionGroup
                items={VEHICLE_TYPES}
                value={insuranceForm.vehicleType}
                onChange={(value) => setInsuranceForm((prev) => ({ ...prev, vehicleType: value }))}
                getLabel={(value) => getVehicleLabel(t, value)}
              />
              <FieldLabel label={t.vehicleYear} textAlign={textAlign} />
              <FieldInput
                value={insuranceForm.year}
                onChangeText={(v) => setInsuranceForm((prev) => ({ ...prev, year: normalizeNumberInput(v) }))}
                placeholder={t.vehicleYear}
                keyboardType="numeric"
                textAlign={textAlign}
              />
              <FieldLabel label={t.drivingExperience} textAlign={textAlign} />
              <FieldInput
                value={insuranceForm.experience}
                onChangeText={(v) => setInsuranceForm((prev) => ({ ...prev, experience: normalizeNumberInput(v) }))}
                placeholder={t.drivingExperience}
                keyboardType="numeric"
                textAlign={textAlign}
              />
              <FieldLabel label={t.claimsHistory} textAlign={textAlign} />
              <OptionGroup
                items={YES_NO}
                value={insuranceForm.claims}
                onChange={(value) => setInsuranceForm((prev) => ({ ...prev, claims: value }))}
                getLabel={(value) => (value === "yes" ? t.yes : t.no)}
              />
              <TouchableOpacity style={styles.primaryButton} onPress={handleInsurance}>
                <Text style={styles.primaryButtonText}>{t.showInsurance}</Text>
              </TouchableOpacity>
              {errorText ? <Text style={[styles.errorText, { textAlign }]}>{errorText}</Text> : null}
            </SectionCard>
            <ModuleResult result={currentResult} t={t} lang={lang} textAlign={textAlign} onContact={contactCurrentModule} onOpenPremium={() => setScreen(SCREENS.premium)} />
          </>
        ) : null}

        {screen === SCREENS.premium ? <PremiumScreen t={t} onContact={contactPremium} /> : null}
        {screen === SCREENS.legal ? <LegalScreen t={t} textAlign={textAlign} /> : null}

        <Text style={[styles.footerNote, { textAlign }]}>{t.footer}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#050915",
  },
  screen: {
    flex: 1,
    backgroundColor: "#050915",
  },
  content: {
    padding: 18,
    paddingBottom: 40,
  },
  headerBlock: {
    marginTop: 4,
  },
  cardLight: {
    backgroundColor: "#F5F7FC",
    borderRadius: 24,
    padding: 18,
    marginBottom: 16,
  },
  cardDark: {
    backgroundColor: "#0B1530",
    borderRadius: 24,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  headerTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  brandIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    marginRight: 12,
  },
  brandText: {
    color: "#DCE5FF",
    fontSize: 15,
    fontWeight: "800",
  },
  updatedText: {
    color: "#9BA8C7",
    fontSize: 12,
    marginTop: 2,
  },
  badgePill: {
    backgroundColor: "#182754",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  badgePillText: {
    color: "#E7ECFF",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 0.8,
  },
  mainTitle: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "900",
    lineHeight: 36,
    marginBottom: 8,
  },
  mainSubtitle: {
    color: "#C3CBE0",
    fontSize: 15,
    lineHeight: 22,
  },
  langRow: {
    flexDirection: "row",
    marginBottom: 14,
  },
  langChip: {
    backgroundColor: "#121D3A",
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 999,
    marginRight: 8,
  },
  langChipActive: {
    backgroundColor: "#F5F7FC",
  },
  langChipText: {
    color: "#E8EEFF",
    fontSize: 12,
    fontWeight: "800",
  },
  langChipTextActive: {
    color: "#0B1530",
  },
  navRow: {
    paddingBottom: 14,
  },
  navChip: {
    backgroundColor: "#121D3A",
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 8,
  },
  navChipActive: {
    backgroundColor: "#8DB6FF",
  },
  navChipText: {
    color: "#E8EEFF",
    fontWeight: "800",
    fontSize: 13,
  },
  navChipTextActive: {
    color: "#091327",
  },
  sectionEyebrow: {
    color: "#8EA6D6",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0.8,
    marginBottom: 6,
    textTransform: "uppercase",
  },
  sectionTitleLight: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "900",
    marginBottom: 8,
  },
  sectionTextLight: {
    color: "#C5CEE2",
    fontSize: 15,
    lineHeight: 22,
  },
  sectionTitle: {
    color: "#0D1734",
    fontSize: 22,
    fontWeight: "900",
    marginBottom: 8,
  },
  sectionText: {
    color: "#4E5B78",
    fontSize: 15,
    lineHeight: 22,
  },
  summaryHeroRow: {
    marginTop: 18,
  },
  summaryHeroBox: {
    backgroundColor: "#14224A",
    borderRadius: 22,
    padding: 16,
    marginBottom: 12,
  },
  summaryHeroBoxAlt: {
    backgroundColor: "#F5F7FC",
    borderRadius: 22,
    padding: 16,
  },
  summaryHeroLabel: {
    color: "#9CB1DC",
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 6,
  },
  summaryHeroValue: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "900",
  },
  summaryHeroSub: {
    color: "#B8C5E5",
    fontSize: 13,
    marginTop: 4,
  },
  summaryHeroLabelDark: {
    color: "#586883",
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 6,
  },
  summaryHeroValueDark: {
    color: "#0D1734",
    fontSize: 28,
    fontWeight: "900",
  },
  summaryHeroSubDark: {
    color: "#6A7893",
    fontSize: 13,
    marginTop: 4,
  },
  roadmapRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E4EAF5",
  },
  roadmapRank: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#E4ECFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  roadmapRankText: {
    color: "#10204A",
    fontWeight: "900",
  },
  roadmapBody: {
    flex: 1,
  },
  roadmapTitle: {
    color: "#10204A",
    fontSize: 15,
    fontWeight: "800",
  },
  roadmapMeta: {
    color: "#637089",
    fontSize: 13,
    marginTop: 3,
  },
  roadmapTag: {
    backgroundColor: "#EAF0FF",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  roadmapTagText: {
    color: "#10204A",
    fontWeight: "800",
    fontSize: 12,
  },
  featureGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -6,
  },
  featureCard: {
    width: "50%",
    padding: 6,
  },
  tierCard: {
    width: "100%",
    marginHorizontal: 6,
  },
  featureCardTitle: {
    color: "#0D1734",
    fontSize: 16,
    fontWeight: "900",
    marginBottom: 6,
  },
  featureCardText: {
    color: "#55637F",
    fontSize: 14,
    lineHeight: 20,
  },
  fieldLabel: {
    color: "#21304C",
    fontSize: 13,
    fontWeight: "800",
    marginTop: 12,
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 15,
    color: "#0D1734",
    borderWidth: 1,
    borderColor: "#DDE6F4",
  },
  optionWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 2,
  },
  optionChip: {
    backgroundColor: "#FFFFFF",
    borderRadius: 999,
    paddingHorizontal: 13,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#DDE6F4",
    marginRight: 8,
    marginTop: 8,
  },
  optionChipActive: {
    backgroundColor: "#10204A",
    borderColor: "#10204A",
  },
  optionChipText: {
    color: "#294160",
    fontSize: 13,
    fontWeight: "700",
  },
  optionChipTextActive: {
    color: "#FFFFFF",
  },
  primaryButton: {
    backgroundColor: "#8DB6FF",
    borderRadius: 18,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 18,
  },
  primaryButtonText: {
    color: "#091327",
    fontSize: 15,
    fontWeight: "900",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
    borderRadius: 18,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 12,
  },
  secondaryButtonText: {
    color: "#E4EBFF",
    fontSize: 15,
    fontWeight: "900",
  },
  errorText: {
    color: "#C43C3C",
    fontSize: 13,
    marginTop: 10,
    fontWeight: "700",
  },
  resultHeroWrap: {
    marginTop: 14,
    backgroundColor: "#14224A",
    borderRadius: 20,
    padding: 16,
  },
  resultPrimaryLabel: {
    color: "#A8B8E8",
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 6,
  },
  resultPrimaryValue: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "900",
  },
  resultSecondaryText: {
    color: "#C5CEE2",
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
  },
  insightGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
  },
  insightTile: {
    width: "50%",
    padding: 6,
  },
  insightTileLabel: {
    color: "#8EA6D6",
    fontSize: 12,
    fontWeight: "800",
    marginBottom: 6,
  },
  insightTileValue: {
    backgroundColor: "#0B1530",
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "900",
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 18,
    overflow: "hidden",
  },
  summaryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -6,
    marginTop: 4,
  },
  summaryMiniCard: {
    width: "50%",
    padding: 6,
  },
  summaryMiniLabel: {
    color: "#66758F",
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 6,
  },
  summaryMiniValue: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 14,
    color: "#10204A",
    fontWeight: "900",
    fontSize: 18,
    borderWidth: 1,
    borderColor: "#E0E7F5",
    overflow: "hidden",
  },
  summaryMiniValueSmall: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 14,
    color: "#10204A",
    fontWeight: "800",
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#E0E7F5",
    overflow: "hidden",
  },
  detailLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E4EAF5",
  },
  detailLineLabel: {
    color: "#5A6783",
    fontSize: 13,
    fontWeight: "700",
  },
  detailLineValue: {
    color: "#10204A",
    fontSize: 14,
    fontWeight: "900",
  },
  bulletWrap: {
    marginTop: 4,
  },
  bulletRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  bulletDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#8DB6FF",
    marginTop: 6,
    marginRight: 10,
  },
  bulletText: {
    flex: 1,
    color: "#47546D",
    fontSize: 14,
    lineHeight: 21,
  },
  noticeText: {
    color: "#68748C",
    fontSize: 13,
    lineHeight: 20,
    marginTop: 12,
  },
  providerWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 12,
  },
  providerPill: {
    backgroundColor: "#EAF0FF",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  providerPillText: {
    color: "#10204A",
    fontSize: 12,
    fontWeight: "800",
  },
  priceBadge: {
    backgroundColor: "#F5F7FC",
    alignSelf: "flex-start",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 16,
  },
  priceBadgeText: {
    color: "#0B1530",
    fontSize: 13,
    fontWeight: "900",
  },
  footerNote: {
    color: "#8593B1",
    fontSize: 12,
    lineHeight: 18,
    marginTop: 4,
    marginBottom: 10,
  },
});
