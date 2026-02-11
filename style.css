const questions = [
    {
        question: "س1 (صح أو خطأ): كتلة التحكم في العملية (PCB) يتم الاحتفاظ بها حتى بعد انتهاء العملية وإنهائها.",
        answers: ["صح", "خطأ"],
        correct: 1
    },
    {
        question: "س2: أي من التالي ليس من مكونات العملية داخل الذاكرة؟",
        answers: ["قسم النص (Text Section)", "المكدس (Stack)", "المترجم (Compiler)", "الكومة (Heap)"],
        correct: 2
    },
    {
        question: "س3 (صح أو خطأ): يمكن لبرنامج واحد أن يُنشئ عدة عمليات في نفس الوقت.",
        answers: ["صح", "خطأ"],
        correct: 0
    },
    {
        question: "س4: ما الترتيب الصحيح لانتقال العملية من الإنشاء إلى الإنهاء؟",
        answers: [
            "New → Running → Ready → Terminated",
            "New → Ready → Running → Terminated",
            "Ready → New → Waiting → Terminated",
            "Running → New → Ready → Terminated"
        ],
        correct: 1
    },
    {
        question: "س5: أي عبارة صحيحة عن المجدول قصير المدى (CPU Scheduler)؟",
        answers: [
            "يُستدعى كل عدة دقائق",
            "ينقل العمليات من التخزين الثانوي إلى الذاكرة",
            "يختار العملية التالية من Ready Queue ويُستدعى بالمللي ثانية",
            "يتحكم في درجة تعدد البرمجة"
        ],
        correct: 2
    },
    {
        question: "س6 (صح أو خطأ): التبديل السياقي (Context Switch) هو عبء إضافي ولا يقوم النظام بأي عمل مفيد أثناءه.",
        answers: ["صح", "خطأ"],
        correct: 0
    },
    {
        question: "س7: في نظام UNIX، ما نداء النظام المستخدم لإنشاء عملية جديدة؟",
        answers: ["exec()", "exit()", "fork()", "wait()"],
        correct: 2
    }
];

let currentQuestion = 0;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const resultEl = document.getElementById("result");
const nextBtn = document.getElementById("nextBtn");

function loadQuestion() {
    resultEl.innerHTML = "";
    nextBtn.disabled = true;
    answersEl.innerHTML = "";

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
    const correctIndex = questions[currentQuestion].correct;
    const buttons = document.querySelectorAll(".answer-btn");

    buttons.forEach((btn, index) => {
        btn.disabled = true;
        if (index === correctIndex) {
            btn.classList.add("correct");
        }
        if (index === selectedIndex && selectedIndex !== correctIndex) {
            btn.classList.add("wrong");
        }
    });

    resultEl.innerHTML = selectedIndex === correctIndex
        ? "إجابة صحيحة ✅"
        : "إجابة خاطئة ❌";

    nextBtn.disabled = false;
}

nextBtn.onclick = () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        questionEl.innerText = "انتهى الاختبار ✅";
        answersEl.innerHTML = "";
        resultEl.innerHTML = "";
        nextBtn.style.display = "none";
    }
};

loadQuestion();
