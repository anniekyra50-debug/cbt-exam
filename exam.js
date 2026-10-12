// ==========================================
// STUDENT INFORMATION
// ==========================================
const studentName = localStorage.getItem("name") || "";
const studentSurname = localStorage.getItem("surname") || "";
const studentCourse = localStorage.getItem("course") || "";
document.getElementById("studentInfo").textContent =
    "👤 " + studentName + " " + studentSurname +
    " | 📚 " + studentCourse;
// ==========================================
// QUESTIONS
// ==========================================
const questions = document.querySelectorAll(".question");
const numbers = document.querySelectorAll(".number");
let currentQuestion = 0;
// ==========================================
// SHOW QUESTION
// ==========================================
function showQuestion(index) {
    questions.forEach(function(question) {
        question.classList.remove("active");
    });
    numbers.forEach(function(number) {
        number.classList.remove("active");
    });
    questions[index].classList.add("active");
    numbers[index].classList.add("active");
    // Previous button
    if (index === 0) {
        document.getElementById("previousBtn").disabled = true;
    } else {
        document.getElementById("previousBtn").disabled = false;
    }
    // Next button
    if (index === questions.length - 1) {
        document.getElementById("nextBtn").style.display = "none";
    } else {
        document.getElementById("nextBtn").style.display = "inline-block";
    }
}
// ==========================================
// NEXT BUTTON
// ==========================================
document.getElementById("nextBtn").addEventListener("click", function() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion(currentQuestion);
    }
});
// ==========================================
// PREVIOUS BUTTON
// ==========================================
document.getElementById("previousBtn").addEventListener("click", function() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion(currentQuestion);
    }
});
// ==========================================
// QUESTION NUMBER BUTTONS
// ==========================================
numbers.forEach(function(number, index) {
    number.addEventListener("click", function() {
        currentQuestion = index;
        showQuestion(currentQuestion);
    });
});
// ==========================================
// MARK QUESTIONS AS ANSWERED
// ==========================================
const answers = document.querySelectorAll(
    'input[type="radio"]'
);
answers.forEach(function(answer) {
    answer.addEventListener("change", function() {
        const question = answer.closest(".question");
        const questionIndex =
            Array.from(questions).indexOf(question);
        numbers[questionIndex].classList.add("answered");
    });
});
// ==========================================
// TIMER
// ==========================================
let timeLeft = 10 * 60;
const timer = document.getElementById("timer");
const countdown = setInterval(function() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timer.textContent =
        String(minutes).padStart(2, "0") +
        ":" +
        String(seconds).padStart(2, "0");
    // Last minute warning
    if (timeLeft <= 60) {
        timer.classList.add("danger");
    }
    timeLeft--;
    // Time finished
    if (timeLeft < 0) {
        clearInterval(countdown);
        submitExam(true);
    }
}, 1000);
// ==========================================
// SUBMIT EXAM
// ==========================================
function submitExam(timeUp = false) {
    let score = 0;
    const totalQuestions = questions.length;
    questions.forEach(function(question) {
        const selectedAnswer =
            question.querySelector(
                'input[type="radio"]:checked'
            );
        if (
            selectedAnswer &&
            selectedAnswer.value === "correct"
        ) {
            score++;
        }
    });
    const percentage =
        Math.round((score / totalQuestions) * 100);
    if (timeUp) {
        alert(
            "⏰ TIME'S UP!\n\n" +
            "Your exam has been submitted automatically."
        );
    } else {
        const confirmSubmit = confirm(
            "Are you sure you want to submit your exam?"
        );
        if (!confirmSubmit) {
            return;
        }
    }
    // Stop timer
    clearInterval(countdown);
    // Show final result
    alert(
        "🏆 EXAM RESULT\n\n" +
        "Student: " + studentName + " " + studentSurname + "\n" +
        "Course: " + studentCourse + "\n\n" +
        "Score: " + score + "/" + totalQuestions + "\n" +
        "Percentage: " + percentage + "%"
    );
    location.reload();
}
// Submit button
document.getElementById("submitBtn").addEventListener(
    "click",
    function() {
        submitExam(false);
    }
);
// ==========================================
// START WITH QUESTION 1
// ==========================================
showQuestion(0);