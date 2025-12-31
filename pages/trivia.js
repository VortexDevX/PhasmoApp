// Trivia Section with High Score Tracking
let triviaQuestions = [];
let triviaIndex = 0;
let score = 0;
let highScore = parseInt(localStorage.getItem("phasmo-trivia-highscore")) || 0;

// Initialize high score display
document.addEventListener("DOMContentLoaded", () => {
  const highScoreElement = document.getElementById("high-score");
  if (highScoreElement) {
    highScoreElement.textContent = highScore;
  }
});

// Function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Update score display
function updateScoreDisplay() {
  const currentScoreElement = document.getElementById("current-score");
  if (currentScoreElement) {
    currentScoreElement.textContent = score;
  }
}

// Fetch trivia questions
fetch("../trivia.json")
  .then((response) => response.json())
  .then((data) => {
    // Shuffle the questions
    triviaQuestions = shuffleArray(data);
    // Shuffle the options for each question
    triviaQuestions.forEach((question) => {
      question.options = shuffleArray([...question.options]);
    });
    loadTrivia();
  })
  .catch((error) => console.error("Error loading trivia:", error));

// Load Trivia Questions
function loadTrivia() {
  const triviaContent = document.getElementById("trivia-content");

  // Check if trivia game is complete
  if (triviaIndex >= triviaQuestions.length) {
    // Check and update high score
    const isNewHighScore = score > highScore;
    if (isNewHighScore) {
      highScore = score;
      localStorage.setItem("phasmo-trivia-highscore", highScore);
      document.getElementById("high-score").textContent = highScore;
    }

    const percentage = Math.round((score / triviaQuestions.length) * 100);
    let emoji = "💀";
    let message = "Keep studying!";

    if (percentage >= 90) {
      emoji = "🏆";
      message = "Perfect ghost hunter!";
    } else if (percentage >= 70) {
      emoji = "👻";
      message = "Great hunting skills!";
    } else if (percentage >= 50) {
      emoji = "📖";
      message = "Not bad, keep learning!";
    }

    triviaContent.innerHTML = `
      <div class="trivia-complete">
        <h3>${emoji} Quiz Complete! ${emoji}</h3>
        <div class="final-score">${score}/${triviaQuestions.length}</div>
        <p style="font-size: 1.2rem; color: var(--text-secondary);">${message}</p>
        <p style="margin-top: var(--spacing-sm); color: var(--text-muted);">Accuracy: ${percentage}%</p>
        ${
          isNewHighScore
            ? '<p class="high-score"><i class="fas fa-star"></i> New High Score! <i class="fas fa-star"></i></p>'
            : ""
        }
        <button id="retry-trivia">
          <i class="fas fa-redo"></i> Play Again
        </button>
      </div>
    `;

    document.getElementById("retry-trivia").addEventListener("click", () => {
      triviaIndex = 0;
      score = 0;
      updateScoreDisplay();
      triviaQuestions = shuffleArray(triviaQuestions);
      triviaQuestions.forEach((question) => {
        question.options = shuffleArray([...question.options]);
      });
      loadTrivia();
    });
    return;
  }

  // Calculate progress
  const progress = ((triviaIndex + 1) / triviaQuestions.length) * 100;

  // Load the current question
  const question = triviaQuestions[triviaIndex];
  triviaContent.innerHTML = `
    <div class="trivia-question">
      <p class="question-text">${question.question}</p>
      <div class="trivia-options">
        ${question.options
          .map(
            (option) => `
          <button class="trivia-option">${option}</button>
        `
          )
          .join("")}
      </div>
      <div class="trivia-progress">
        <span>Question ${triviaIndex + 1} of ${triviaQuestions.length}</span>
        <div class="progress-bar-container">
          <div class="progress-bar" style="width: ${progress}%"></div>
        </div>
        <span>Score: ${score}</span>
      </div>
    </div>
  `;

  // Add click listeners to the options
  document.querySelectorAll(".trivia-option").forEach((button) => {
    button.addEventListener("click", () => checkAnswer(button.textContent));
  });
}

// Check Trivia Answer
function checkAnswer(selected) {
  const question = triviaQuestions[triviaIndex];
  const options = document.querySelectorAll(".trivia-option");

  // Highlight correct and wrong answers
  options.forEach((option) => {
    option.disabled = true;

    if (option.textContent === question.answer) {
      option.classList.add("correct");
    }
    if (option.textContent === selected && selected !== question.answer) {
      option.classList.add("wrong");
    }
  });

  // Update score if the answer is correct
  if (selected === question.answer) {
    score++;
    updateScoreDisplay();
  }

  // Move to the next question after delay
  setTimeout(() => {
    triviaIndex++;
    loadTrivia();
  }, 1200);
}
