const questions = [
  {
    question: "What is the primary function of the liver?",
    answers: [
      { text: "The liver pumps blood throughout the body", correct: false },
      {
        text: "The liver exchanges oxygen and carbon dioxide",
        correct: false,
      },
      {
        text: "The liver detoxifies chemicals and produces bile",
        correct: true,
      },
      { text: "The liver stores and digests food", correct: false },
    ],
  },
  {
    question: "How does the heart function in the body?",
    answers: [
      { text: "The heart pumps blood throughout the body", correct: true },
      {
        text: "The heart filters waste from the blood",
        correct: false,
      },
      {
        text: "The heart breaks down food",
        correct: false,
      },
      {
        text: "The heart produces hormones that control metabolism",
        correct: false,
      },
    ],
  },
  {
    question: "What role do the kidneys play?",
    answers: [
      {
        text: "The kidneys pump oxygenated blood throughout the body",
        correct: false,
      },
      {
        text: "The kidneys produce insulin to control blood sugar",
        correct: false,
      },
      {
        text: "The kidneys digest food and absorb nutrients",
        correct: false,
      },
      {
        text: "The kidneys filter waste from the blood and regulate fluid balance",
        correct: true,
      },
    ],
  },
  {
    question: "How do the lungs function?",
    answers: [
      { text: "The lungs produce bile to help digest fats", correct: false },
      {
        text: "The lungs exchange oxygen and carbon dioxide",
        correct: true,
      },
      {
        text: "The lungs filter waste products from the blood",
        correct: false,
      },
      { text: "The lungs store and release glucose", correct: false },
    ],
  },
  {
    question: "What is the stomach's role in the digestive system?",
    answers: [
      {
        text: "The stomach filters blood and produces red blood cells",
        correct: false,
      },
      {
        text: "The stomach breaks down food with acid and enzymes",
        correct: true,
      },
      {
        text: "The stomach exchanges gases between the blood and air",
        correct: false,
      },
      { text: "The stomach regulates body temperature", correct: false },
    ],
  },
  {
    question: "How does the brain control bodily functions?",
    answers: [
      { text: "The brain filters waste from the blood", correct: false },
      {
        text: "The brain digests and absorbs nutrients from food",
        correct: false,
      },
      {
        text: "The brain sends signals to regulate body functions and processes sensory information",
        correct: true,
      },
      { text: "The brain stores oxygen for the body", correct: false },
    ],
  },
  {
    question: "What is the role of the pancreas?",
    answers: [
      {
        text: "The pancreas regulates blood sugar by producing insulin and glucagon",
        correct: true,
      },
      {
        text: "The pancreas filters toxins from the blood",
        correct: false,
      },
      {
        text: "The pancreas pumps blood to the lungs",
        correct: false,
      },
      { text: "The pancreas produces bile to digest fats", correct: false },
    ],
  },
  {
    question: "How do the intestines function?",
    answers: [
      {
        text: "The intestines produce red and white blood cells",
        correct: false,
      },
      {
        text: "The intestines pump blood throughout the body",
        correct: false,
      },
      {
        text: "The intestines exchange gases in the body",
        correct: false,
      },
      {
        text: "The small intestine absorbs nutrients, and the large intestine absorbs water and forms waste",
        correct: true,
      },
    ],
  },
  {
    question: "What is the spleen's function?",
    answers: [
      {
        text: "The spleen digests and absorbs nutrients from food",
        correct: false,
      },
      {
        text: "The spleen filters blood and helps fight infections",
        correct: true,
      },
      {
        text: "The spleen pumps oxygenated blood throughout the body",
        correct: false,
      },
      { text: "The spleen produces insulin and glucagon", correct: false },
    ],
  },
  {
    question: "How do endocrine glands affect the body?",
    answers: [
      {
        text: "Endocrine glands release hormones that control metabolism and growth",
        correct: true,
      },
      {
        text: "Endocrine glands exchange oxygen and carbon dioxide",
        correct: false,
      },
      {
        text: "Endocrine glands digest food and absorb nutrients",
        correct: false,
      },
      { text: "Endocrine glands filter waste from the blood", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
  nextButton.innerHTML = " Play Again";
  nextButton.style.display = "block";
}
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
