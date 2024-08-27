// Примерные данные для тестирования (позже замените на данные из Google Sheets)
const data = [
    { spanish: "gato", russian: ["кот", "собака", "лошадь", "рыба"], correct: 0 },
    { spanish: "perro", russian: ["кот", "собака", "лошадь", "рыба"], correct: 1 },
    { spanish: "caballo", russian: ["кот", "собака", "лошадь", "рыба"], correct: 2 },
    { spanish: "pez", russian: ["кот", "собака", "лошадь", "рыба"], correct: 3 }
];

let currentQuestion = 0;

function loadQuestion() {
    const question = data[currentQuestion];
    document.getElementById("spanish-word").textContent = question.spanish;
    document.getElementById("option1").textContent = question.russian[0];
    document.getElementById("option2").textContent = question.russian[1];
    document.getElementById("option3").textContent = question.russian[2];
    document.getElementById("option4").textContent = question.russian[3];

    resetButtons();
}

function resetButtons() {
    document.querySelectorAll('button').forEach(button => {
        button.classList.remove('correct', 'incorrect');
    });
}

function checkAnswer(selectedOption) {
    const question = data[currentQuestion];
    const buttons = document.querySelectorAll('button');

    if (selectedOption === question.correct) {
        buttons[selectedOption].classList.add('correct');
    } else {
        buttons[selectedOption].classList.add('incorrect');
        buttons[question.correct].classList.add('correct');
    }

    setTimeout(nextQuestion, 3000);
}

function nextQuestion() {
    currentQuestion = (currentQuestion + 1) % data.length;
    loadQuestion();
}

loadQuestion();
