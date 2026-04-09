import { Linking } from "react-native";
import React, { useMemo, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const T = {
  de: {
    dir: "ltr",
    brand: "Quanturion Pro",
    cockpit: "Savings Cockpit",
    greeting: "Hallo 👋",
    heroEyebrow: "Executive Savings Cockpit",
    heroTitle: "Aktuell ungenutzter finanzieller Vorteil",
    monthly: "Monatlicher Vorteil",
    annual: "Jährlicher Vorteil",
    reveal: "Vorteil sichtbar machen",
    roadmap: "Roadmap",
    access: "Zugang",
    modules: "Module",
    proAccess: "Executive Zugang",
    proTitle: "Aus Potenzial wird ein klarer nächster Schritt",
    proText:
      "Nicht nur sehen, wo Geld liegen bleibt — sondern verstehen, womit du sinnvoll beginnst und was dir sofort echten Mehrwert bringt.",
    unlock: "Zugang freischalten",
    cockpitTitle: "Dein persönliches Savings Cockpit",
    cockpitSub:
      "Eine priorisierte Übersicht über erkannte Hebel, Tempo, Aufwand und den sinnvollsten Startpunkt.",
    strongestLever: "Stärkster Hebel",
    fastestLever: "Schnellster Hebel",
    tax: "Steuer",
    mortgage: "Hypothek",
    electricity: "Strom",
    insurance: "Versicherung",
    taxSub: "Erkannter Vorteil",
    mortgageSub: "Erkannter Vorteil",
    electricitySub: "Schneller Hebel",
    insuranceSub: "Optimierungspotenzial",
    roadmapTitle: "Priorisierte Roadmap",
    roadmapSub:
      "Beginne nicht mit allem. Beginne mit dem Hebel, der am sichtbarsten wirkt.",
    startPoint: "Dein sinnvollster Startpunkt",
    speed: "Tempo",
    effort: "Aufwand",
    confidence: "Sicherheitsniveau",
    readiness: "Readiness",
    priority: "Priorität",
    simple: "Einfach",
    standard: "Standard",
    advanced: "Erweitert",
    high: "Hoch",
    medium: "Mittel",
    low: "Niedrig",
    days7: "7 Tage",
    days14: "14 Tage",
    days21: "21 Tage",
    input: "Eingabe",
    analysis: "Analyse",
    result: "Ergebnis",
    analyzePrep: "Analyse vorbereiten",
    showResult: "Ergebnis sichtbar machen",
    whyRelevant: "Warum das für dich relevant ist",
    checklist: "Unterlagen-Checkliste",
    moduleResult: "Dein persönliches Ergebnis",
    actionText: "Dein sinnvollster nächster Schritt",
    salary: "Monatsgehalt (₪)",
    salaryType: "Gehaltsart",
    net: "Netto",
    gross: "Brutto",
    unsure: "Unsicher",
    familyStatus: "Familienstatus",
    single: "Ledig",
    married: "Verheiratet",
    singleParent: "Alleinerziehend",
    children: "Kinder",
    employerChange: "Arbeitgeber gewechselt?",
    donations: "Spenden / Nachweise vorhanden?",
    yes: "Ja",
    no: "Nein",
    loanAmount: "Darlehenssumme (₪)",
    years: "Laufzeit (Jahre)",
    rate: "Aktueller Zinssatz (%)",
    payment: "Aktuelle Monatsrate (optional)",
    bill: "Monatliche Stromrechnung (₪)",
    kwh: "kWh pro Monat (optional)",
    usage: "Nutzungsprofil",
    couple: "Paar",
    family: "Familie",
    homeOffice: "Home Office",
    age: "Alter",
    vehicleType: "Fahrzeugtyp",
    vehicleYear: "Baujahr",
    experience: "Fahrerfahrung (Jahre)",
    claims: "Schadenhistorie?",
    mini: "Kleinwagen",
    suv: "SUV",
    luxury: "Luxus",
    familyCar: "Familienauto",
    taxTone:
      "Ein strukturiertes Review deckt oft ungenutzte Ansprüche auf, besonders nach Veränderungen im Arbeits- oder Familienstatus.",
    mortgageTone:
      "Wenn die aktuelle Struktur veraltet ist, liegt hier oft der größte monatliche Hebel.",
    electricityTone:
      "Das ist meist der schnellste operative Vorteil mit wenig Reibung.",
    insuranceTone:
      "Nicht immer der größte Hebel, aber oft ein sauberer Preis-/Leistungsgewinn.",
    footer:
      "Executive Design: mehr Klarheit, mehr Kontrolle, sichtbarerer Mehrwert.",
  },
  en: {
    dir: "ltr",
    brand: "Quanturion Pro",
    cockpit: "Savings Cockpit",
    greeting: "Hello 👋",
    heroEyebrow: "Executive Savings Cockpit",
    heroTitle: "Currently unused financial upside",
    monthly: "Monthly upside",
    annual: "Annual upside",
    reveal: "Reveal your upside",
    roadmap: "Roadmap",
    access: "Access",
    modules: "Modules",
    proAccess: "Executive Access",
    proTitle: "Turn potential into a clear next move",
    proText:
      "Do not just see where money is being left on the table — understand where to start and what creates immediate value.",
    unlock: "Unlock access",
    cockpitTitle: "Your personal savings cockpit",
    cockpitSub:
      "A prioritized view of visible levers, speed, effort and the smartest place to begin.",
    strongestLever: "Strongest lever",
    fastestLever: "Fastest lever",
    tax: "Tax",
    mortgage: "Mortgage",
    electricity: "Electricity",
    insurance: "Insurance",
    taxSub: "Detected upside",
    mortgageSub: "Detected upside",
    electricitySub: "Fast lever",
    insuranceSub: "Optimization potential",
    roadmapTitle: "Prioritized roadmap",
    roadmapSub:
      "Do not start with everything. Start with the lever that is most visible.",
    startPoint: "Your smartest starting point",
    speed: "Speed",
    effort: "Effort",
    confidence: "Confidence",
    readiness: "Readiness",
    priority: "Priority",
    simple: "Simple",
    standard: "Standard",
    advanced: "Advanced",
    high: "High",
    medium: "Medium",
    low: "Low",
    days7: "7 days",
    days14: "14 days",
    days21: "21 days",
    input: "Input",
    analysis: "Analysis",
    result: "Result",
    analyzePrep: "Prepare analysis",
    showResult: "Reveal result",
    whyRelevant: "Why this matters for you",
    checklist: "Document checklist",
    moduleResult: "Your personal result",
    actionText: "Your smartest next step",
    salary: "Monthly salary (₪)",
    salaryType: "Salary type",
    net: "Net",
    gross: "Gross",
    unsure: "Not sure",
    familyStatus: "Family status",
    single: "Single",
    married: "Married",
    singleParent: "Single parent",
    children: "Children",
    employerChange: "Changed employer?",
    donations: "Donations / receipts available?",
    yes: "Yes",
    no: "No",
    loanAmount: "Loan amount (₪)",
    years: "Term (years)",
    rate: "Current interest rate (%)",
    payment: "Current monthly payment (optional)",
    bill: "Monthly electricity bill (₪)",
    kwh: "kWh per month (optional)",
    usage: "Usage profile",
    couple: "Couple",
    family: "Family",
    homeOffice: "Home office",
    age: "Age",
    vehicleType: "Vehicle type",
    vehicleYear: "Vehicle year",
    experience: "Driving experience (years)",
    claims: "Claims history?",
    mini: "Compact",
    suv: "SUV",
    luxury: "Luxury",
    familyCar: "Family car",
    taxTone:
      "A structured review often reveals unused claims, especially after changes in work or family status.",
    mortgageTone:
      "When the current structure is outdated, this is often the strongest monthly lever.",
    electricityTone:
      "This is usually the fastest operational upside with low friction.",
    insuranceTone:
      "Not always the biggest lever, but often a clean price-to-value improvement.",
    footer:
      "Executive design: more clarity, more control, more visible value.",
  },
  he: {
    dir: "rtl",
    brand: "Quanturion Pro",
    cockpit: "לוח חיסכון",
    greeting: "שלום 👋",
    heroEyebrow: "לוח חיסכון מתקדם",
    heroTitle: "יתרון כספי שלא ממומש כרגע",
    monthly: "יתרון חודשי",
    annual: "יתרון שנתי",
    reveal: "הצג את היתרון שלך",
    roadmap: "מפת דרך",
    access: "גישה",
    modules: "מודולים",
    proAccess: "גישה מתקדמת",
    proTitle: "להפוך פוטנציאל לצעד הבא הברור",
    proText:
      "לא רק לראות איפה נשאר כסף על השולחן — אלא להבין איפה נכון להתחיל ומה יוצר ערך מיידי.",
    unlock: "פתח גישה",
    cockpitTitle: "לוח החיסכון האישי שלך",
    cockpitSub:
      "מבט מתועדף על מנופים גלויים, מהירות, מאמץ והנקודה החכמה ביותר להתחלה.",
    strongestLever: "המנוף החזק ביותר",
    fastestLever: "המנוף המהיר ביותר",
    tax: "מס",
    mortgage: "משכנתא",
    electricity: "חשמל",
    insurance: "ביטוח",
    taxSub: "יתרון שזוהה",
    mortgageSub: "יתרון שזוהה",
    electricitySub: "מנוף מהיר",
    insuranceSub: "פוטנציאל אופטימיזציה",
    roadmapTitle: "מפת דרך מתועדפת",
    roadmapSub: "לא מתחילים מהכול. מתחילים מהמנוף שהכי נראה לעין.",
    startPoint: "נקודת ההתחלה החכמה שלך",
    speed: "מהירות",
    effort: "מאמץ",
    confidence: "רמת ביטחון",
    readiness: "מוכנות",
    priority: "עדיפות",
    simple: "פשוט",
    standard: "סטנדרטי",
    advanced: "מתקדם",
    high: "גבוה",
    medium: "בינוני",
    low: "נמוך",
    days7: "7 ימים",
    days14: "14 ימים",
    days21: "21 ימים",
    input: "הזנה",
    analysis: "ניתוח",
    result: "תוצאה",
    analyzePrep: "הכן ניתוח",
    showResult: "הצג תוצאה",
    whyRelevant: "למה זה חשוב עבורך",
    checklist: "רשימת מסמכים",
    moduleResult: "התוצאה האישית שלך",
    actionText: "הצעד הבא החכם שלך",
    salary: "שכר חודשי (₪)",
    salaryType: "סוג שכר",
    net: "נטו",
    gross: "ברוטו",
    unsure: "לא בטוח",
    familyStatus: "מצב משפחתי",
    single: "רווק/ה",
    married: "נשוי/אה",
    singleParent: "הורה יחיד",
    children: "ילדים",
    employerChange: "החלפת מעסיק?",
    donations: "יש תרומות / קבלות?",
    yes: "כן",
    no: "לא",
    loanAmount: "סכום הלוואה (₪)",
    years: "תקופה (שנים)",
    rate: "ריבית נוכחית (%)",
    payment: "תשלום חודשי נוכחי (אופציונלי)",
    bill: "חשבון חשמל חודשי (₪)",
    kwh: "קוט״ש לחודש (אופציונלי)",
    usage: "פרופיל שימוש",
    couple: "זוג",
    family: "משפחה",
    homeOffice: "משרד ביתי",
    age: "גיל",
    vehicleType: "סוג רכב",
    vehicleYear: "שנת רכב",
    experience: "ניסיון נהיגה (שנים)",
    claims: "היסטוריית תביעות?",
    mini: "קטן",
    suv: "SUV",
    luxury: "יוקרה",
    familyCar: "משפחתי",
    taxTone:
      "בדיקה מסודרת חושפת לעיתים קרובות זכאויות לא מנוצלות, במיוחד אחרי שינויים בעבודה או במשפחה.",
    mortgageTone:
      "כאשר המבנה הנוכחי מיושן, זה לרוב המנוף החודשי החזק ביותר.",
    electricityTone:
      "זה בדרך כלל היתרון התפעולי המהיר ביותר עם מעט חיכוך.",
    insuranceTone:
      "לא תמיד המנוף הגדול ביותר, אבל לעיתים קרובות שיפור נקי של מחיר מול ערך.",
    footer:
      "עיצוב מתקדם: יותר בהירות, יותר שליטה, יותר ערך גלוי.",
  },
};

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function normalizeNumberInput(value) {
  return value.replace(/,/g, ".").replace(/[^0-9.]/g, "");
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(Math.round(Number(value) || 0));
}

function calculateMonthlyPayment(principal, annualRate, years) {
  const monthlyRate = annualRate / 100 / 12;
  const months = years * 12;
  if (!months) return 0;
  if (!monthlyRate) return principal / months;
  const factor = Math.pow(1 + monthlyRate, months);
  return (principal * monthlyRate * factor) / (factor - 1);
}

function getPriorityLabel(score, t) {
  if (score >= 80) return t.high;
  if (score >= 60) return t.medium;
  return t.low;
}

function getEffortLabel(level, t) {
  if (level === "high") return t.advanced;
  if (level === "medium") return t.standard;
  return t.simple;
}

function getSpeedLabel(days, t) {
  if (days <= 7) return t.days7;
  if (days <= 14) return t.days14;
  return t.days21;
}

function initialPreview() {
  return {
    tax: {
      module: "tax",
      monthlyPotential: 317,
      annualPotential: 3800,
      displayMain: "3,800 ₪ / year",
      confidence: 78,
      readiness: 81,
      priorityScore: 74,
      effort: "low",
      speedDays: 7,
      documents: ["Payslips", "Annual summary", "Supporting documents"],
    },
    mortgage: {
      module: "mortgage",
      monthlyPotential: 850,
      annualPotential: 10200,
      displayMain: "850 ₪ / month",
      confidence: 84,
      readiness: 88,
      priorityScore: 86,
      effort: "medium",
      speedDays: 21,
      documents: ["Mortgage schedule", "Bank overview", "Outstanding balance"],
    },
    electricity: {
      module: "electricity",
      monthlyPotential: 170,
      annualPotential: 2040,
      displayMain: "170 ₪ / month",
      confidence: 79,
      readiness: 83,
      priorityScore: 72,
      effort: "low",
      speedDays: 7,
      documents: ["Electricity bill", "Customer number", "Usage data"],
    },
    insurance: {
      module: "insurance",
      monthlyPotential: 100,
      annualPotential: 1200,
      displayMain: "2,800–3,900 ₪ / year",
      confidence: 76,
      readiness: 79,
      priorityScore: 66,
      effort: "low",
      speedDays: 14,
      documents: ["Current policy", "Claims history", "Vehicle registration"],
    },
  };
}

function calculateTaxScenario(form) {
  const salary = parseFloat(form.salary);
  const children = parseFloat(form.children || "0");
  if (!salary || !form.familyStatus) return null;

  let annual = salary * 12;
  if (form.salaryType === "net") annual *= 1.28;
  if (form.salaryType === "unknown") annual *= 1.18;

  let base = annual * 0.055;
  if (form.jobChanges === "yes") base += annual * 0.012;
  if (form.donations === "yes") base += annual * 0.004;
  if (form.familyStatus === "married") base += 700;
  if (form.familyStatus === "single_parent") base += 1200;
  if (children > 0) base += children * 480;

  const min = Math.max(Math.round(base * 0.72), 600);
  const max = Math.max(Math.round(base * 1.2), min + 400);
  const annualPotential = Math.round((min + max) / 2);
  const monthlyPotential = Math.round(annualPotential / 12);

  const confidence = clamp(
    62 + (form.jobChanges === "yes" ? 8 : 0) + (children > 0 ? 5 : 0) + (form.donations === "yes" ? 3 : 0),
    60,
    93
  );

  const priorityScore = clamp(
    50 + (form.jobChanges === "yes" ? 12 : 0) + (children > 0 ? 8 : 0) + (form.familyStatus === "single_parent" ? 8 : 0),
    45,
    96
  );

  return {
    module: "tax",
    monthlyPotential,
    annualPotential,
    displayMain: `${formatCurrency(annualPotential)} ₪ / year`,
    confidence,
    readiness: clamp(confidence + 4, 60, 96),
    priorityScore,
    effort: priorityScore > 82 ? "medium" : "low",
    speedDays: priorityScore > 75 ? 7 : 14,
    documents: ["Payslips", "Annual summary", "Donation / family documents"],
  };
}

function calculateMortgageScenario(form) {
  const principal = parseFloat(form.amount);
  const years = parseFloat(form.years);
  const rate = form.rate.trim() === "" ? null : parseFloat(form.rate);
  const currentPayment = form.currentPayment.trim() === "" ? null : parseFloat(form.currentPayment);

  if (!principal || !years || (rate === null && currentPayment === null)) return null;

  const actualPayment = rate !== null ? calculateMonthlyPayment(principal, rate, years) : currentPayment;
  const optimizedPayment = calculateMonthlyPayment(principal, 4.54, years);
  const monthlyPotential = Math.max(Math.round(actualPayment - optimizedPayment), 0);
  const annualPotential = monthlyPotential * 12;

  const confidence = clamp(65 + (rate !== null ? 10 : 0), 60, 92);
  const priorityScore = clamp(54 + (annualPotential > 8000 ? 20 : 10) + (principal > 1000000 ? 8 : 0), 50, 95);

  return {
    module: "mortgage",
    monthlyPotential,
    annualPotential,
    displayMain: `${formatCurrency(monthlyPotential)} ₪ / month`,
    confidence,
    readiness: clamp(confidence + 5, 60, 95),
    priorityScore,
    effort: annualPotential > 12000 ? "medium" : "low",
    speedDays: annualPotential > 12000 ? 21 : 14,
    documents: ["Mortgage schedule", "Bank overview", "Rate structure"],
  };
}

function calculateElectricityScenario(form) {
  const bill = parseFloat(form.bill);
  const kwh = form.kwh.trim() === "" ? null : parseFloat(form.kwh);
  if (!bill || Number.isNaN(bill)) return null;

  const profileMultiplier =
    form.profile === "single" ? 0.88 :
    form.profile === "couple" ? 1 :
    form.profile === "home_office" ? 1.14 : 1.2;

  const estimatedConsumption = kwh ? kwh : Math.max(160, (bill - 28) / 0.6) * profileMultiplier;

  const options = [
    { monthly: 18 + estimatedConsumption * 0.54 },
    { monthly: 24 + estimatedConsumption * 0.49 },
    { monthly: 27 + estimatedConsumption * 0.47 },
  ].sort((a, b) => a.monthly - b.monthly);

  const best = options[0];
  const monthlyPotential = Math.max(Math.round(bill - best.monthly), 0);
  const annualPotential = monthlyPotential * 12;

  const confidence = clamp(68 + (kwh ? 12 : 0), 62, 91);
  const priorityScore = clamp(58 + (monthlyPotential > 90 ? 14 : 8), 55, 92);

  return {
    module: "electricity",
    monthlyPotential,
    annualPotential,
    displayMain: `${formatCurrency(monthlyPotential)} ₪ / month`,
    confidence,
    readiness: clamp(confidence + 6, 64, 94),
    priorityScore,
    effort: "low",
    speedDays: 7,
    documents: ["Latest bill", "Customer number", "Usage data"],
  };
}

function calculateInsuranceScenario(form) {
  const age = parseFloat(form.age);
  const year = parseFloat(form.year);
  const experience = parseFloat(form.experience);
  if (!age || !year || !experience || !form.vehicleType) return null;

  let base =
    form.vehicleType === "mini" ? 2800 :
    form.vehicleType === "suv" ? 4100 :
    form.vehicleType === "luxury" ? 5600 : 3400;

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

  const min = Math.round(base * 0.9);
  const max = Math.round(base * 1.17);
  const annualPotential = Math.max(Math.round((max - min) * 0.55), 350);
  const monthlyPotential = Math.round(annualPotential / 12);

  const confidence = clamp(69 + (experience ? 8 : 0), 64, 92);
  const priorityScore = clamp(56 + (form.claims === "no" ? 8 : 0) + (age > 25 ? 6 : 0), 55, 88);

  return {
    module: "insurance",
    monthlyPotential,
    annualPotential,
    displayMain: `${formatCurrency(min)}–${formatCurrency(max)} ₪ / year`,
    confidence,
    readiness: clamp(confidence + 3, 64, 93),
    priorityScore,
    effort: "low",
    speedDays: 14,
    documents: ["Current policy", "Claims history", "Vehicle registration"],
  };
}

function BottomTab({ label, active, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.bottomTab}>
      <View style={[styles.bottomDot, active && styles.bottomDotActive]} />
      <Text style={[styles.bottomText, active && styles.bottomTextActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

function LangSwitch({ lang, setLang }) {
  return (
    <View style={styles.langRow}>
      {["de", "en", "he"].map((l) => (
        <TouchableOpacity
          key={l}
          onPress={() => setLang(l)}
          style={[styles.langChip, lang === l && styles.langChipActive]}
        >
          <Text style={[styles.langChipText, lang === l && styles.langChipTextActive]}>
            {l.toUpperCase()}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

function StatCard({ title, value, sub }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statTitle}>{title}</Text>
      <Text style={styles.statValue}>{value}</Text>
      {sub ? <Text style={styles.statSub}>{sub}</Text> : null}
    </View>
  );
}

function Step({ n, label, active, done }) {
  return (
    <View style={styles.stepWrap}>
      <View style={[styles.stepCircle, active && styles.stepCircleActive, done && styles.stepCircleDone]}>
        <Text style={styles.stepCircleText}>{n}</Text>
      </View>
      <Text style={[styles.stepLabel, active && styles.stepLabelActive]}>{label}</Text>
    </View>
  );
}

function InputField({ label, value, onChangeText, placeholder, keyboardType = "default", rtl = false }) {
  return (
    <View style={styles.fieldWrap}>
      <Text style={[styles.fieldLabel, rtl && { textAlign: "right" }]}>{label}</Text>
      <TextInput
        style={[styles.input, rtl && { textAlign: "right" }]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#7E8BA5"
        keyboardType={keyboardType}
      />
    </View>
  );
}

function Segmented({ value, options, onChange }) {
  return (
    <View style={styles.segmentWrap}>
      {options.map((opt) => (
        <TouchableOpacity
          key={opt.value}
          onPress={() => onChange(opt.value)}
          style={[styles.segmentItem, value === opt.value && styles.segmentItemActive]}
        >
          <Text style={[styles.segmentText, value === opt.value && styles.segmentTextActive]}>
            {opt.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default function App() {
  const [lang, setLang] = useState("de");
  const t = T[lang];
  const rtl = t.dir === "rtl";

  const [tab, setTab] = useState("cockpit");
  const [module, setModule] = useState("tax");
  const [step, setStep] = useState(1);

  const previews = useMemo(() => initialPreview(), []);
  const [results, setResults] = useState(previews);

  const [taxForm, setTaxForm] = useState({
    salary: "",
    salaryType: "net",
    familyStatus: "single",
    children: "0",
    jobChanges: "no",
    donations: "no",
  });

  const [mortgageForm, setMortgageForm] = useState({
    amount: "",
    years: "",
    rate: "",
    currentPayment: "",
  });

  const [electricityForm, setElectricityForm] = useState({
    bill: "",
    kwh: "",
    profile: "family",
  });

  const [insuranceForm, setInsuranceForm] = useState({
    age: "",
    vehicleType: "family",
    year: "",
    experience: "",
    claims: "no",
  });

  const activeResult = results[module];

  const labels = {
    tax: t.tax,
    mortgage: t.mortgage,
    electricity: t.electricity,
    insurance: t.insurance,
  };

  const tones = {
    tax: t.taxTone,
    mortgage: t.mortgageTone,
    electricity: t.electricityTone,
    insurance: t.insuranceTone,
  };

  const calculate = () => {
    let next = null;
    if (module === "tax") next = calculateTaxScenario(taxForm);
    if (module === "mortgage") next = calculateMortgageScenario(mortgageForm);
    if (module === "electricity") next = calculateElectricityScenario(electricityForm);
    if (module === "insurance") next = calculateInsuranceScenario(insuranceForm);
    if (next) setResults((prev) => ({ ...prev, [module]: next }));
  };

  const openModule = (key) => {
    setModule(key);
    setStep(1);
    setTab("modules");
  };

  const strongest = Object.values(results).sort((a, b) => b.annualPotential - a.annualPotential)[0];
  const fastest = Object.values(results).sort((a, b) => a.speedDays - b.speedDays)[0];

  const totalMonthly =
    results.tax.monthlyPotential +
    results.mortgage.monthlyPotential +
    results.electricity.monthlyPotential +
    results.insurance.monthlyPotential;

  const totalAnnual =
    results.tax.annualPotential +
    results.mortgage.annualPotential +
    results.electricity.annualPotential +
    results.insurance.annualPotential;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <View style={styles.screen}>
        <ScrollView contentContainerStyle={styles.content}>
          <LangSwitch lang={lang} setLang={setLang} />

          <View style={[styles.header, rtl && { flexDirection: "row-reverse" }]}>
            <View style={styles.logoBox}>
              <Text style={styles.logoText}>Q</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.brand, rtl && { textAlign: "right" }]}>{t.brand}</Text>
              <Text style={[styles.brandSub, rtl && { textAlign: "right" }]}>{t.cockpit}</Text>
            </View>
            <View style={styles.proPill}>
              <Text style={styles.proPillText}>PRO</Text>
            </View>
          </View>

          {tab === "cockpit" && (
            <>
              <View style={styles.heroCard}>
                <Text style={[styles.heroEyebrow, rtl && { textAlign: "right" }]}>{t.heroEyebrow}</Text>
                <Text style={[styles.heroTitle, rtl && { textAlign: "right" }]}>{t.heroTitle}</Text>
                <Text style={[styles.heroValue, rtl && { textAlign: "right" }]}>₪ {formatCurrency(totalMonthly)}</Text>
                <Text style={[styles.heroSub, rtl && { textAlign: "right" }]}>
                  {t.monthly} · ₪ {formatCurrency(totalAnnual)} {t.annual.toLowerCase()}
                </Text>

                <TouchableOpacity style={styles.goldButton} onPress={() => setTab("roadmap")}>
                  <Text style={styles.goldButtonText}>{t.reveal}</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.infoRow}>
                <View style={styles.infoMini}>
                  <Text style={styles.infoMiniTitle}>{t.strongestLever}</Text>
                  <Text style={styles.infoMiniValue}>{labels[strongest.module]}</Text>
                </View>
                <View style={styles.infoMini}>
                  <Text style={styles.infoMiniTitle}>{t.fastestLever}</Text>
                  <Text style={styles.infoMiniValue}>{labels[fastest.module]}</Text>
                </View>
              </View>

              <View style={styles.grid}>
                <TouchableOpacity style={styles.moduleCard} onPress={() => openModule("tax")}>
                  <Text style={styles.moduleTitle}>{t.tax}</Text>
                  <Text style={styles.moduleValue}>₪ {formatCurrency(results.tax.monthlyPotential)}</Text>
                  <Text style={styles.moduleSub}>{t.taxSub}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.moduleCard} onPress={() => openModule("mortgage")}>
                  <Text style={styles.moduleTitle}>{t.mortgage}</Text>
                  <Text style={styles.moduleValue}>₪ {formatCurrency(results.mortgage.monthlyPotential)}</Text>
                  <Text style={styles.moduleSub}>{t.mortgageSub}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.moduleCard} onPress={() => openModule("electricity")}>
                  <Text style={styles.moduleTitle}>{t.electricity}</Text>
                  <Text style={styles.moduleValue}>₪ {formatCurrency(results.electricity.monthlyPotential)}</Text>
                  <Text style={styles.moduleSub}>{t.electricitySub}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.moduleCard} onPress={() => openModule("insurance")}>
                  <Text style={styles.moduleTitle}>{t.insurance}</Text>
                  <Text style={styles.moduleValue}>₪ {formatCurrency(results.insurance.monthlyPotential)}</Text>
                  <Text style={styles.moduleSub}>{t.insuranceSub}</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.accessCard}>
                <Text style={[styles.accessTitle, rtl && { textAlign: "right" }]}>{t.proAccess}</Text>
                <Text style={[styles.accessText, rtl && { textAlign: "right" }]}>{t.proText}</Text>
                <TouchableOpacity style={styles.outlineButton} onPress={() => setTab("access")}>
                  <Text style={styles.outlineButtonText}>{t.unlock}</Text>
                </TouchableOpacity>
              </View>
            </>
          )}

          {tab === "roadmap" && (
            <View style={styles.roadmapCard}>
              <Text style={[styles.sectionTitle, rtl && { textAlign: "right" }]}>{t.roadmapTitle}</Text>
              <Text style={[styles.sectionSub, rtl && { textAlign: "right" }]}>{t.roadmapSub}</Text>

              {Object.values(results)
                .sort((a, b) => b.annualPotential - a.annualPotential)
                .map((item, index) => (
                  <TouchableOpacity
                    key={item.module}
                    style={[styles.roadmapRow, rtl && { flexDirection: "row-reverse" }]}
                    onPress={() => openModule(item.module)}
                  >
                    <View style={styles.rankCircle}>
                      <Text style={styles.rankCircleText}>{index + 1}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.roadmapModule, rtl && { textAlign: "right" }]}>{labels[item.module]}</Text>
                      <Text style={[styles.roadmapMeta, rtl && { textAlign: "right" }]}>
                        ₪ {formatCurrency(item.annualPotential)} / {t.annual.toLowerCase()} · {t.priority} {getPriorityLabel(item.priorityScore, t)}
                      </Text>
                    </View>
                    <View style={styles.speedBadge}>
                      <Text style={styles.speedBadgeText}>{getSpeedLabel(item.speedDays, t)}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
            </View>
          )}

          {tab === "access" && (
            <>
              <View style={styles.heroCard}>
                <Text style={[styles.heroEyebrow, rtl && { textAlign: "right" }]}>{t.proAccess}</Text>
                <Text style={[styles.heroTitle, rtl && { textAlign: "right" }]}>{t.proTitle}</Text>
                <Text style={[styles.heroSub, rtl && { textAlign: "right" }]}>{t.proText}</Text>
              </View>

              <View style={styles.accessFeatures}>
                <StatCard title={t.startPoint} value={t.modules} sub={t.cockpitTitle} />
                <StatCard title={t.confidence} value="High-Trust" sub={t.whyRelevant} />
                <StatCard title={t.roadmap} value="1 → 2 → 3" sub={t.actionText} />
                <StatCard title={t.checklist} value="Ready" sub={t.reveal} />
              </View>
            </>
          )}

          {tab === "modules" && (
            <>
              <View style={styles.moduleSwitch}>
                {["tax", "mortgage", "electricity", "insurance"].map((key) => (
                  <TouchableOpacity
                    key={key}
                    onPress={() => {
                      setModule(key);
                      setStep(1);
                    }}
                    style={[styles.switchPill, module === key && styles.switchPillActive]}
                  >
                    <Text style={[styles.switchPillText, module === key && styles.switchPillTextActive]}>
                      {labels[key]}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.moduleHero}>
                <Text style={[styles.heroEyebrow, rtl && { textAlign: "right" }]}>{labels[module]}</Text>
                <Text style={[styles.sectionTitle, rtl && { textAlign: "right" }]}>{t.cockpitTitle}</Text>

                <View style={styles.stepRow}>
                  <Step n="1" label={t.input} active={step === 1} done={step > 1} />
                  <Step n="2" label={t.analysis} active={step === 2} done={step > 2} />
                  <Step n="3" label={t.result} active={step === 3} done={false} />
                </View>
              </View>

              {step === 1 && (
                <View style={styles.formCard}>
                  {module === "tax" && (
                    <>
                      <InputField
                        label={t.salary}
                        value={taxForm.salary}
                        onChangeText={(v) => setTaxForm((p) => ({ ...p, salary: normalizeNumberInput(v) }))}
                        placeholder="13500"
                        keyboardType="numeric"
                        rtl={rtl}
                      />
                      <InputField
                        label={t.children}
                        value={taxForm.children}
                        onChangeText={(v) => setTaxForm((p) => ({ ...p, children: normalizeNumberInput(v) }))}
                        placeholder="2"
                        keyboardType="numeric"
                        rtl={rtl}
                      />
                      <Text style={[styles.fieldLabel, rtl && { textAlign: "right" }]}>{t.salaryType}</Text>
                      <Segmented
                        value={taxForm.salaryType}
                        onChange={(value) => setTaxForm((p) => ({ ...p, salaryType: value }))}
                        options={[
                          { value: "net", label: t.net },
                          { value: "gross", label: t.gross },
                          { value: "unknown", label: t.unsure },
                        ]}
                      />
                      <Text style={[styles.fieldLabel, rtl && { textAlign: "right" }]}>{t.familyStatus}</Text>
                      <Segmented
                        value={taxForm.familyStatus}
                        onChange={(value) => setTaxForm((p) => ({ ...p, familyStatus: value }))}
                        options={[
                          { value: "single", label: t.single },
                          { value: "married", label: t.married },
                          { value: "single_parent", label: t.singleParent },
                        ]}
                      />
                      <Text style={[styles.fieldLabel, rtl && { textAlign: "right" }]}>{t.employerChange}</Text>
                      <Segmented
                        value={taxForm.jobChanges}
                        onChange={(value) => setTaxForm((p) => ({ ...p, jobChanges: value }))}
                        options={[
                          { value: "yes", label: t.yes },
                          { value: "no", label: t.no },
                        ]}
                      />
                      <Text style={[styles.fieldLabel, rtl && { textAlign: "right" }]}>{t.donations}</Text>
                      <Segmented
                        value={taxForm.donations}
                        onChange={(value) => setTaxForm((p) => ({ ...p, donations: value }))}
                        options={[
                          { value: "yes", label: t.yes },
                          { value: "no", label: t.no },
                        ]}
                      />
                    </>
                  )}

                  {module === "mortgage" && (
                    <>
                      <InputField
                        label={t.loanAmount}
                        value={mortgageForm.amount}
                        onChangeText={(v) => setMortgageForm((p) => ({ ...p, amount: normalizeNumberInput(v) }))}
                        placeholder="1200000"
                        keyboardType="numeric"
                        rtl={rtl}
                      />
                      <InputField
                        label={t.years}
                        value={mortgageForm.years}
                        onChangeText={(v) => setMortgageForm((p) => ({ ...p, years: normalizeNumberInput(v) }))}
                        placeholder="25"
                        keyboardType="numeric"
                        rtl={rtl}
                      />
                      <InputField
                        label={t.rate}
                        value={mortgageForm.rate}
                        onChangeText={(v) => setMortgageForm((p) => ({ ...p, rate: normalizeNumberInput(v) }))}
                        placeholder="6.1"
                        keyboardType="numeric"
                        rtl={rtl}
                      />
                      <InputField
                        label={t.payment}
                        value={mortgageForm.currentPayment}
                        onChangeText={(v) => setMortgageForm((p) => ({ ...p, currentPayment: normalizeNumberInput(v) }))}
                        placeholder="7600"
                        keyboardType="numeric"
                        rtl={rtl}
                      />
                    </>
                  )}

                  {module === "electricity" && (
                    <>
                      <InputField
                        label={t.bill}
                        value={electricityForm.bill}
                        onChangeText={(v) => setElectricityForm((p) => ({ ...p, bill: normalizeNumberInput(v) }))}
                        placeholder="650"
                        keyboardType="numeric"
                        rtl={rtl}
                      />
                      <InputField
                        label={t.kwh}
                        value={electricityForm.kwh}
                        onChangeText={(v) => setElectricityForm((p) => ({ ...p, kwh: normalizeNumberInput(v) }))}
                        placeholder="620"
                        keyboardType="numeric"
                        rtl={rtl}
                      />
                      <Text style={[styles.fieldLabel, rtl && { textAlign: "right" }]}>{t.usage}</Text>
                      <Segmented
                        value={electricityForm.profile}
                        onChange={(value) => setElectricityForm((p) => ({ ...p, profile: value }))}
                        options={[
                          { value: "single", label: t.single },
                          { value: "couple", label: t.couple },
                          { value: "family", label: t.family },
                          { value: "home_office", label: t.homeOffice },
                        ]}
                      />
                    </>
                  )}

                  {module === "insurance" && (
                    <>
                      <InputField
                        label={t.age}
                        value={insuranceForm.age}
                        onChangeText={(v) => setInsuranceForm((p) => ({ ...p, age: normalizeNumberInput(v) }))}
                        placeholder="37"
                        keyboardType="numeric"
                        rtl={rtl}
                      />
                      <InputField
                        label={t.vehicleYear}
                        value={insuranceForm.year}
                        onChangeText={(v) => setInsuranceForm((p) => ({ ...p, year: normalizeNumberInput(v) }))}
                        placeholder="2021"
                        keyboardType="numeric"
                        rtl={rtl}
                      />
                      <InputField
                        label={t.experience}
                        value={insuranceForm.experience}
                        onChangeText={(v) => setInsuranceForm((p) => ({ ...p, experience: normalizeNumberInput(v) }))}
                        placeholder="12"
                        keyboardType="numeric"
                        rtl={rtl}
                      />
                      <Text style={[styles.fieldLabel, rtl && { textAlign: "right" }]}>{t.vehicleType}</Text>
                      <Segmented
                        value={insuranceForm.vehicleType}
                        onChange={(value) => setInsuranceForm((p) => ({ ...p, vehicleType: value }))}
                        options={[
                          { value: "mini", label: t.mini },
                          { value: "family", label: t.familyCar },
                          { value: "suv", label: t.suv },
                          { value: "luxury", label: t.luxury },
                        ]}
                      />
                      <Text style={[styles.fieldLabel, rtl && { textAlign: "right" }]}>{t.claims}</Text>
                      <Segmented
                        value={insuranceForm.claims}
                        onChange={(value) => setInsuranceForm((p) => ({ ...p, claims: value }))}
                        options={[
                          { value: "yes", label: t.yes },
                          { value: "no", label: t.no },
                        ]}
                      />
                    </>
                  )}

                  <TouchableOpacity style={styles.goldButton} onPress={() => setStep(2)}>
                    <Text style={styles.goldButtonText}>{t.analyzePrep}</Text>
                  </TouchableOpacity>
                </View>
              )}

              {step === 2 && (
                <View style={styles.analysisCard}>
                  <Text style={[styles.sectionTitle, rtl && { textAlign: "right" }]}>{t.analysis}</Text>
                  <Text style={[styles.sectionSub, rtl && { textAlign: "right" }]}>
                    {t.cockpitSub}
                  </Text>

                  <View style={styles.analysisBox}>
                    <Text style={[styles.analysisLine, rtl && { textAlign: "right" }]}>• {t.monthly}</Text>
                    <Text style={[styles.analysisLine, rtl && { textAlign: "right" }]}>• {t.confidence}</Text>
                    <Text style={[styles.analysisLine, rtl && { textAlign: "right" }]}>• {t.roadmap}</Text>
                    <Text style={[styles.analysisLine, rtl && { textAlign: "right" }]}>• {t.checklist}</Text>
                  </View>

                  <TouchableOpacity
                    style={styles.goldButton}
                    onPress={() => {
                      calculate();
                      setStep(3);
                    }}
                  >
                    <Text style={styles.goldButtonText}>{t.showResult}</Text>
                  </TouchableOpacity>
                </View>
              )}

              {step === 3 && (
                <>
                  <View style={styles.resultCard}>
                    <Text style={[styles.heroEyebrow, rtl && { textAlign: "right" }]}>{t.moduleResult}</Text>
                    <Text style={[styles.sectionTitle, rtl && { textAlign: "right" }]}>{labels[module]}</Text>
                    <Text style={[styles.resultMain, rtl && { textAlign: "right" }]}>{activeResult.displayMain}</Text>
                    <Text style={[styles.resultSub, rtl && { textAlign: "right" }]}>
                      ₪ {formatCurrency(activeResult.monthlyPotential)} / {t.monthly.toLowerCase()} · ₪ {formatCurrency(activeResult.annualPotential)} / {t.annual.toLowerCase()}
                    </Text>
                  </View>

                  <View style={styles.statsGrid}>
                    <StatCard title={t.confidence} value={`${activeResult.confidence}/100`} />
                    <StatCard title={t.readiness} value={`${activeResult.readiness}/100`} />
                    <StatCard title={t.priority} value={getPriorityLabel(activeResult.priorityScore, t)} />
                    <StatCard title={t.effort} value={getEffortLabel(activeResult.effort, t)} />
                  </View>

                  <View style={styles.whitePanel}>
                    <Text style={[styles.whitePanelTitle, rtl && { textAlign: "right" }]}>{t.whyRelevant}</Text>
                    <Text style={[styles.whitePanelText, rtl && { textAlign: "right" }]}>{tones[module]}</Text>
                  </View>

                  <View style={styles.whitePanel}>
                    <Text style={[styles.whitePanelTitle, rtl && { textAlign: "right" }]}>{t.actionText}</Text>
                    <Text style={[styles.whitePanelText, rtl && { textAlign: "right" }]}>
                      {module === "tax" && (lang === "de" ? "Sammle Unterlagen der letzten Jahre und starte mit einer sauberen Prüfung." : lang === "en" ? "Collect documents from recent years and begin with a structured review." : "אסוף מסמכים מהשנים האחרונות והתחל בבדיקה מסודרת.")}
                      {module === "mortgage" && (lang === "de" ? "Vergleiche aktuelle Struktur und Zielzins, bevor du tiefer gehst." : lang === "en" ? "Compare the current structure and a target rate before going deeper." : "השווה בין המבנה הנוכחי לריבית יעד לפני שמעמיקים.")}
                      {module === "electricity" && (lang === "de" ? "Bestätige Rechnung und Verbrauch, dann nur bei sichtbarem Vorteil wechseln." : lang === "en" ? "Confirm bill and usage, then switch only if the upside is clearly visible." : "אמת חשבון וצריכה, ואז עבור רק אם היתרון נראה בבירור.")}
                      {module === "insurance" && (lang === "de" ? "Ordne Profil, Schadenhistorie und Police sauber, bevor du anfragst." : lang === "en" ? "Organize your profile, claims history and policy before requesting quotes." : "סדר את הפרופיל, היסטוריית התביעות והפוליסה לפני בקשת הצעות.")}
                    </Text>
                    <Text style={[styles.whiteMini, rtl && { textAlign: "right" }]}>
                      {t.speed}: {getSpeedLabel(activeResult.speedDays, t)}
                    </Text>
                  </View>

                  <View style={styles.whitePanel}>
                    <Text style={[styles.whitePanelTitle, rtl && { textAlign: "right" }]}>{t.checklist}</Text>
                    {activeResult.documents.map((d) => (
                      <Text key={d} style={[styles.whitePanelText, { marginBottom: 4 }, rtl && { textAlign: "right" }]}>
                        • {d}
                      </Text>
                    ))}
                  </View>

                  <View style={styles.accessCard}>
                    <Text style={[styles.accessTitle, rtl && { textAlign: "right" }]}>{t.proAccess}</Text>
                    <Text style={[styles.accessText, rtl && { textAlign: "right" }]}>{t.proText}</Text>
                    <TouchableOpacity style={styles.outlineButton}>
                      <Text style={styles.outlineButtonText}>{t.unlock}</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </>
          )}

          <Text style={[styles.footer, rtl && { textAlign: "right" }]}>{t.footer}</Text>
        </ScrollView>

        <View style={styles.bottomNav}>
          <BottomTab label={t.cockpit} active={tab === "cockpit"} onPress={() => setTab("cockpit")} />
          <BottomTab label={t.modules} active={tab === "modules"} onPress={() => setTab("modules")} />
          <BottomTab label={t.roadmap} active={tab === "roadmap"} onPress={() => setTab("roadmap")} />
          <BottomTab label={t.access} active={tab === "access"} onPress={() => setTab("access")} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#040B16",
  },
  screen: {
    flex: 1,
    backgroundColor: "#040B16",
  },
  content: {
    padding: 18,
    paddingBottom: 110,
  },

  langRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 12,
  },
  langChip: {
    backgroundColor: "#111C34",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  langChipActive: {
    backgroundColor: "#D4AF37",
    borderColor: "#D4AF37",
  },
  langChipText: {
    color: "#D9E0EF",
    fontWeight: "800",
    fontSize: 12,
  },
  langChipTextActive: {
    color: "#071021",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  logoBox: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: "#081328",
    borderWidth: 1,
    borderColor: "#D4AF37",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  logoText: {
    color: "#E0B14A",
    fontSize: 28,
    fontWeight: "900",
  },
  brand: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
  },
  brandSub: {
    color: "#98A6C6",
    fontSize: 13,
    marginTop: 2,
  },
  proPill: {
    backgroundColor: "#111B30",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(224,177,74,0.45)",
  },
  proPillText: {
    color: "#E0B14A",
    fontWeight: "900",
    fontSize: 12,
  },

  heroCard: {
    backgroundColor: "#081328",
    borderRadius: 26,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(224,177,74,0.3)",
  },
  heroEyebrow: {
    color: "#E0B14A",
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "900",
    lineHeight: 30,
  },
  heroValue: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "900",
    marginTop: 16,
  },
  heroSub: {
    color: "#A5B1CD",
    fontSize: 15,
    lineHeight: 22,
    marginTop: 6,
  },

  goldButton: {
    backgroundColor: "#D4AF37",
    borderRadius: 18,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 18,
  },
  goldButtonText: {
    color: "#071021",
    fontWeight: "900",
    fontSize: 15,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  infoMini: {
    width: "48.2%",
    backgroundColor: "#0C1730",
    borderRadius: 18,
    padding: 14,
  },
  infoMiniTitle: {
    color: "#92A1C2",
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 6,
  },
  infoMiniValue: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  moduleCard: {
    width: "48.2%",
    backgroundColor: "#0A1630",
    borderRadius: 22,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  moduleTitle: {
    color: "#CDD5E8",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 10,
  },
  moduleValue: {
    color: "#E0B14A",
    fontSize: 24,
    fontWeight: "900",
  },
  moduleSub: {
    color: "#8D9BBC",
    fontSize: 12,
    marginTop: 6,
  },

  accessCard: {
    backgroundColor: "#0B1530",
    borderRadius: 24,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(224,177,74,0.26)",
  },
  accessTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "900",
    marginBottom: 8,
  },
  accessText: {
    color: "#BEC9E4",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 14,
  },
  outlineButton: {
    borderWidth: 1,
    borderColor: "#D4AF37",
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: "center",
  },
  outlineButtonText: {
    color: "#E0B14A",
    fontSize: 15,
    fontWeight: "900",
  },

  roadmapCard: {
    backgroundColor: "#081328",
    borderRadius: 26,
    padding: 18,
    borderWidth: 1,
    borderColor: "rgba(224,177,74,0.25)",
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "900",
    marginBottom: 8,
  },
  sectionSub: {
    color: "#BFC8DE",
    fontSize: 15,
    lineHeight: 22,
  },
  roadmapRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.06)",
  },
  rankCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#D4AF37",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  rankCircleText: {
    color: "#071021",
    fontWeight: "900",
  },
  roadmapModule: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },
  roadmapMeta: {
    color: "#9DAACA",
    fontSize: 13,
    marginTop: 4,
  },
  speedBadge: {
    backgroundColor: "#111D3C",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(224,177,74,0.18)",
  },
  speedBadgeText: {
    color: "#E0B14A",
    fontSize: 12,
    fontWeight: "800",
  },

  accessFeatures: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statCard: {
    width: "48.2%",
    backgroundColor: "#101B36",
    borderRadius: 20,
    padding: 14,
    marginBottom: 10,
  },
  statTitle: {
    color: "#9DA9C7",
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 6,
  },
  statValue: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "900",
  },
  statSub: {
    color: "#98A6C6",
    marginTop: 4,
    fontSize: 12,
  },

  moduleSwitch: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
  },
  switchPill: {
    backgroundColor: "#0E1A35",
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  switchPillActive: {
    backgroundColor: "#D4AF37",
    borderColor: "#D4AF37",
  },
  switchPillText: {
    color: "#D8E0F3",
    fontSize: 13,
    fontWeight: "800",
  },
  switchPillTextActive: {
    color: "#071021",
  },

  moduleHero: {
    backgroundColor: "#081328",
    borderRadius: 24,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "rgba(224,177,74,0.26)",
  },
  stepRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
  },
  stepWrap: {
    alignItems: "center",
    flex: 1,
  },
  stepCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#182446",
    alignItems: "center",
    justifyContent: "center",
  },
  stepCircleActive: {
    backgroundColor: "#7A4CFF",
  },
  stepCircleDone: {
    backgroundColor: "#D4AF37",
  },
  stepCircleText: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 13,
  },
  stepLabel: {
    color: "#93A0C1",
    fontSize: 12,
    marginTop: 8,
    fontWeight: "700",
  },
  stepLabelActive: {
    color: "#FFFFFF",
  },

  formCard: {
    backgroundColor: "#F7F8FC",
    borderRadius: 24,
    padding: 18,
    marginBottom: 14,
  },
  analysisCard: {
    backgroundColor: "#081328",
    borderRadius: 24,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "rgba(224,177,74,0.22)",
  },
  analysisBox: {
    marginTop: 14,
    backgroundColor: "#0E1A35",
    borderRadius: 18,
    padding: 14,
  },
  analysisLine: {
    color: "#E2E8F8",
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 4,
  },

  fieldWrap: {
    marginBottom: 10,
  },
  fieldLabel: {
    color: "#21304C",
    fontSize: 13,
    fontWeight: "800",
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

  segmentWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  segmentItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#DDE6F4",
    marginRight: 8,
    marginBottom: 8,
  },
  segmentItemActive: {
    backgroundColor: "#081328",
    borderColor: "#081328",
  },
  segmentText: {
    color: "#243451",
    fontSize: 13,
    fontWeight: "700",
  },
  segmentTextActive: {
    color: "#FFFFFF",
  },

  resultCard: {
    backgroundColor: "#081328",
    borderRadius: 24,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(224,177,74,0.28)",
  },
  resultMain: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "900",
    marginTop: 12,
  },
  resultSub: {
    color: "#A7B4D3",
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
  },

  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  whitePanel: {
    backgroundColor: "#F7F8FC",
    borderRadius: 24,
    padding: 18,
    marginBottom: 12,
  },
  whitePanelTitle: {
    color: "#0D1734",
    fontSize: 20,
    fontWeight: "900",
    marginBottom: 8,
  },
  whitePanelText: {
    color: "#50607D",
    fontSize: 15,
    lineHeight: 22,
  },
  whiteMini: {
    color: "#6B7893",
    fontSize: 13,
    marginTop: 10,
    fontWeight: "700",
  },

  footer: {
    color: "#8593B1",
    fontSize: 12,
    lineHeight: 18,
    marginTop: 6,
    marginBottom: 8,
  },

  bottomNav: {
    position: "absolute",
    left: 14,
    right: 14,
    bottom: 14,
    backgroundColor: "#071021",
    borderRadius: 22,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "rgba(224,177,74,0.18)",
  },
  bottomTab: {
    alignItems: "center",
    flex: 1,
  },
  bottomDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#455375",
    marginBottom: 6,
  },
  bottomDotActive: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#D4AF37",
  },
  bottomText: {
    color: "#96A4C3",
    fontSize: 12,
    fontWeight: "700",
  },
  bottomTextActive: {
    color: "#FFFFFF",
  },
});
