// =========================================
// Quiz with: instant correction + explanation + final score
// + anonymous tester ID (no name input)
// =========================================

// 1) Create an anonymous Tester ID (saved on the same device)
function getOrCreateTesterId() {
  const key = "tester_id";
  let id = localStorage.getItem(key);

  if (!id) {
    const rand = Math.random().toString(16).slice(2, 8).toUpperCase();
    id = `Tester-${rand}`;
    localStorage.setItem(key, id);
  }
  return id;
}

const testerId = getOrCreateTesterId();

// 2) Questions
const questions = [
  {
    question:
      "س1 (صح أو خطأ): كتلة التحكم في العملية (PCB) يتم الاحتفاظ بها حتى بعد انتهاء العملية وإنهائها.",
    answers: ["صح", "خطأ"],
    correct: 1,
    explanation:
      "الإجابة الصحيحة: خطأ. عادةً تُحرر بيانات العملية بعد الإنهاء، وقد تبقى مؤقتًا في بعض الأنظمة لغرض جمع حالة الخروج."
  },
  {
    question: "س2 (اختيار من متعدد): أي من التالي ليس من مكونات العملية داخل الذاكرة؟",
    answers: ["قسم النص (Text Section)", "المكدس (Stack)", "المترجم (Compiler)", "الكومة (Heap)"],
    correct: 2,
    explanation:
      "الإجابة الصحيحة: المترجم (Compiler). مكونات العملية داخل الذاكرة تشمل Text وStack وHeap وغيرها."
  },
  {
    question: "س3 (صح أو خطأ): يمكن لبرنامج واحد أن يُنشئ عدة عمليات في نفس الوقت.",
    answers: ["صح", "خطأ"],
    correct: 0,
    explanation:
      "الإجابة الصحيحة: صح. يمكن تشغيل نفس البرنامج عدة مرات أو إنشاء عمليات جديدة عبر fork."
  },
  {
    question: "س4 (اختيار من متعدد): ما الترتيب الصحيح لانتقال العملية من الإنشاء إلى الإنهاء؟",
    answers: [
      "New → Running → Ready → Terminated",
      "New → Ready → Running → Terminated",
      "Ready → New → Waiting → Terminated",
      "Running → New → Ready → Terminated"
    ],
    correct: 1,
    explanation:
      "الإجابة الصحيحة: New → Ready → Running → Terminated. وقد تمر العملية Waiting عند تنفيذ I/O."
  },
  {
    question: "س5 (اختيار من متعدد): أي عبارة صحيحة عن المجدول قصير المدى (CPU Scheduler)؟",
    answers: [
      "يُستدعى كل عدة دقائق",
      "ينقل العمليات من التخزين الثانوي إلى الذاكرة",
      "يختار العملية التالية من Ready Queue ويُستدعى بالمللي ثانية",
      "يتحكم في درجة تعدد البرمجة"
    ],
    correct: 2,
    explanation:
      "الإجابة الصحيحة: يختار العملية التالية من Ready Queue ويُستدعى بالمللي ثانية."
  },
  {
    question:
      "س6 (صح أو خطأ): التبديل السياقي (Context Switch) هو عبء إضافي ولا يقوم النظام بأي عمل مفيد أثناءه.",
    answers: ["صح", "خطأ"],
    correct: 0,
    explanation:
      "الإجابة الصحيحة: صح. لأنه وقت حفظ/استرجاع سياق العمليات (Overhead) وليس تنفيذ عمل المستخدم."
  },
  {
    question: "س7 (اختيار من متعدد): في نظام UNIX، ما نداء النظام المستخدم لإنشاء عملية جديدة؟",
    answers: ["exec()", "exit()", "fork()", "wait()"],
    correct: 2,
    explanation:
      "الإجابة الصحيحة: fork(). ينشئ عملية جديدة (Child)."
  }
];

// 3) Variables
let currentQuestion = 0;
let score = 0;
let answered = false;

// 4) HTML elements (must exist in index.html)
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const resultEl = document.getElementById("result");
const nextBtn = document.getElementById("nextBtn");

// 5) Show tester ID message
function showTesterHeader(message) {
  resultEl.innerHTML = `
    <div style="text-align:right; opacity:.9; margin-bottom:10px;">
      <strong>معرّف المختبر:</strong> ${testerId}
    </div>
    <div style="text-align:right;">${message}</div>
  `;
}

// 6) Load question
function loadQuestion() {
  answered = false;
  nextBtn.disabled = true;
  answersEl.innerHTML = "";

  const q = questions[currentQuestion];
  questionEl.innerText = q.question;

  showTesterHeader("اختر إجابة لعرض التصحيح والشرح.");

  q.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.innerText = answer;
    button.classList.add("answer-btn");
    button.onclick = () => checkAnswer(index);
    answersEl.appendChild(button);
  });
}

// 7) Check answer + color + explanation
function checkAnswer(selectedIndex) {
  if (answered) return;
  answered = true;

  const q = questions[currentQuestion];
  const correctIndex = q.correct;
  const buttons = document.querySelectorAll(".answer-btn");

  // Disable + color
  buttons.forEach((btn, index) => {
    btn.disabled = true;
    if (index === correctIndex) btn.classList.add("correct");
    if (index === selectedIndex && selectedIndex !== correctIndex) btn.classList.add("wrong");
  });

  // Score
  const isCorrect = selectedIndex === correctIndex;
  if (isCorrect) score++;

  // Result text
  resultEl.innerHTML = `
    <div style="text-align:right; line-height:1.9">
      <div style="opacity:.9; margin-bottom:8px;">
        <strong>معرّف المختبر:</strong> ${testerId}
      </div>

      <div style="font-size:18px; margin-bottom:6px;">
        ${isCorrect ? "إجابة صحيحة ✅" : "إجابة خاطئة ❌"}
      </div>

      <div>
        <strong>الإجابة الصحيحة:</strong> ${q.answers[correctIndex]}
      </div>

      <div style="margin-top:6px;">
        <strong>الشرح:</strong> ${q.explanation}
      </div>
    </div>
  `;

  nextBtn.disabled = false;
}

// 8) Next button
nextBtn.onclick = () => {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showFinalResult();
  }
};

// 9) Final result
function showFinalResult() {
  const total = questions.length;
  const percent = Math.round((score / total) * 100);

  let level = "يحتاج مراجعة";
  if (percent >= 85) level = "ممتاز";
  else if (percent >= 70) level = "جيد جدًا";
  else if (percent >= 50) level = "جيد";

  questionEl.innerText = "انتهى الاختبار 🎉";
  answersEl.innerHTML = "";
  nextBtn.style.display = "none";

  resultEl.innerHTML = `
    <div style="text-align:center; line-height:2">
      <div style="text-align:right; opacity:.9; margin-bottom:10px;">
        <strong>معرّف المختبر:</strong> <span id="tid">${testerId}</span>
        <button id="copyBtn" style="margin-right:10px; background:#334155; color:#fff; border:none; padding:6px 10px; border-radius:8px; cursor:pointer;">
          نسخ المعرّف
        </button>
      </div>

      <h2>درجتك النهائية</h2>
      <h1>${score} / ${total}</h1>
      <h3>${percent}% - ${level}</h3>

      <button id="restartBtn" style="background:#16a34a; color:#fff; padding:10px 16px; border-radius:8px; border:none; cursor:pointer;">
        إعادة الاختبار
      </button>
    </div>
  `;

  // Copy Tester ID
  document.getElementById("copyBtn").onclick = async () => {
    try {
      await navigator.clipboard.writeText(testerId);
      document.getElementById("copyBtn").innerText = "تم النسخ ✅";
      setTimeout(() => (document.getElementById("copyBtn").innerText = "نسخ المعرّف"), 1200);
    } catch {
      alert("لم يتم النسخ تلقائيًا. انسخ المعرّف يدويًا.");
    }
  };

  // Restart
  document.getElementById("restartBtn").onclick = () => {
    currentQuestion = 0;
    score = 0;
    nextBtn.style.display = "inline-block";
    loadQuestion();
  };
}

// Start quiz
loadQuestion();
