// =========================================
// OS Comprehensive Quiz (15 Questions)
// For: OS_quiz2.html
// Features: Instant coloring + Final score
// =========================================

const questions = [
  {
    question: "1) ما هو تعريف نظام التشغيل؟",
    answers: [
      "برنامج لتصفح الإنترنت",
      "وسيط بين المستخدم ومكونات الحاسوب يدير الموارد",
      "جهاز إدخال",
      "لغة برمجة"
    ],
    correct: 1
  },
  {
    question: "2) نظام التشغيل يهدف إلى تعظيم الاستفادة من الموارد وتحسين الأداء.",
    answers: ["صح", "خطأ"],
    correct: 0
  },
  {
    question: "3) أي نوع من أنظمة التشغيل يعالج مجموعة من المهام دفعة واحدة دون تفاعل مباشر مع المستخدم؟",
    answers: ["Time Sharing", "Batch System", "Real-Time", "Network OS"],
    correct: 1
  },
  {
    question: "4) في نظام مشاركة الوقت (Time Sharing) يتم:",
    answers: [
      "تشغيل برنامج واحد فقط",
      "تخصيص جزء زمني صغير لكل مستخدم/عملية بالتناوب",
      "إيقاف النظام بعد كل مهمة",
      "تشغيل دفعات بدون تقسيم زمني"
    ],
    correct: 1
  },
  {
    question: "5) ما وظيفة Bootstrap Loader؟",
    answers: [
      "حذف الملفات",
      "تحميل النواة (Kernel) إلى الذاكرة عند بدء التشغيل",
      "جدولة العمليات",
      "إدارة الطابعة"
    ],
    correct: 1
  },
  {
    question: "6) المقاطعة Interrupt تسمح بإيقاف المعالج مؤقتًا لتنفيذ حدث مهم ثم العودة.",
    answers: ["صح", "خطأ"],
    correct: 0
  },
  {
    question: "7) أي مما يلي يُعد من خدمات نظام التشغيل؟",
    answers: ["إدارة الملفات", "تنفيذ البرامج", "تخصيص الموارد", "جميع ما سبق"],
    correct: 3
  },
  {
    question: "8) الفرق الأساسي بين CLI و GUI هو:",
    answers: [
      "لا يوجد فرق",
      "CLI نصي بالأوامر و GUI رسومي بالنوافذ والأيقونات",
      "GUI لا يعمل إلا بدون نظام تشغيل",
      "CLI لا يستخدم أوامر"
    ],
    correct: 1
  },
  {
    question: "9) System Calls تُستخدم من أجل:",
    answers: [
      "تشغيل الألعاب",
      "الوصول إلى خدمات نظام التشغيل من البرامج",
      "زيادة سرعة الإنترنت",
      "إطفاء الجهاز فقط"
    ],
    correct: 1
  },
  {
    question: "10) open(), read(), write() هي أمثلة على:",
    answers: ["أوامر CLI", "استدعاءات نظام System Calls", "مقاطعات Interrupts", "مفاهيم الشبكات"],
    correct: 1
  },
  {
    question: "11) الفرق بين User Mode و Kernel Mode هو:",
    answers: [
      "لا يوجد فرق",
      "Kernel Mode يملك صلاحيات أعلى للتعامل مع العتاد والذاكرة",
      "User Mode أقوى من Kernel Mode",
      "Kernel Mode لا يتعامل مع الأجهزة"
    ],
    correct: 1
  },
  {
    question: "12) يمكن لبرنامج واحد أن يُنشئ عدة عمليات (Processes) في نفس الوقت.",
    answers: ["صح", "خطأ"],
    correct: 0
  },
  {
    question: "13) أي مما يلي ليس من مكونات العملية داخل الذاكرة؟",
    answers: ["Text Section", "Stack", "Compiler", "Heap"],
    correct: 2
  },
  {
    question: "14) كتلة التحكم في العملية PCB تحتوي على:",
    answers: [
      "عداد البرنامج (Program Counter) فقط",
      "حالة العملية فقط",
      "معلومات الجدولة والذاكرة وعداد البرنامج وغيرها",
      "اسم المستخدم فقط"
    ],
    correct: 2
  },
  {
    question: "15) التبديل السياقي (Context Switch) يعتبر عبئًا إضافيًا (Overhead).",
    answers: ["صح", "خطأ"],
    correct: 0
  }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const resultEl = document.getElementById("result");
const nextBtn = document.getElementById("nextBtn");

function loadQuestion() {
  answered = false;
  nextBtn.disabled = true;
  answersEl.innerHTML = "";
  resultEl.innerHTML = "";

  const q = questions[currentQuestion];
  questionEl.innerText = q.question;

  q.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.innerText = answer;
    button.classList.add("answer-btn");
    button.onclick = () => checkAnswer(index);
    answersEl.appendChild(button);
  });
}

function checkAnswer(selectedIndex) {
  if (answered) return;
  answered = true;

  const correctIndex = questions[currentQuestion].correct;
  const buttons = document.querySelectorAll(".answer-btn");

  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === correctIndex) btn.classList.add("correct");
    if (i === selectedIndex && selectedIndex !== correctIndex) btn.classList.add("wrong");
  });

  if (selectedIndex === correctIndex) {
    score++;
    resultEl.innerHTML = "إجابة صحيحة ✅";
  } else {
    resultEl.innerHTML = "إجابة خاطئة ❌";
  }

  nextBtn.disabled = false;
}

nextBtn.onclick = () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showFinalResult();
  }
};

function showFinalResult() {
  const total = questions.length;
  const percent = Math.round((score / total) * 100);

  let level = "يحتاج مراجعة";
  if (percent >= 85) level = "ممتاز";
  else if (percent >= 70) level = "جيد جدًا";
  else if (percent >= 50) level = "جيد";

  questionEl.innerText = "انتهى الاختبار 🎉";
  answersEl.innerHTML = "";
  resultEl.innerHTML = `
    <h2>درجتك النهائية: ${score} / ${total}</h2>
    <h3>${percent}% - ${level}</h3>
    <button id="restartBtn" style="background:#16a34a;color:#fff;padding:10px 16px;border:none;border-radius:8px;cursor:pointer;">
      إعادة الاختبار
    </button>
  `;
  nextBtn.style.display = "none";

  document.getElementById("restartBtn").onclick = () => {
    currentQuestion = 0;
    score = 0;
    nextBtn.style.display = "inline-block";
    loadQuestion();
  };
}

loadQuestion();
