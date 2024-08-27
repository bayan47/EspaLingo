// Примерные данные для тестирования (позже замените на данные из Google Sheets)
const data = [
    { spanish: "gato", russian: ["кот", "собака", "лошадь", "рыба"], correct: 0 },
    { spanish: "perro", russian: ["кот", "собака", "лошадь", "рыба"], correct: 1 },
    { spanish: "caballo", russian: ["кот", "собака", "лошадь", "рыба"], correct: 2 },
    { spanish: "pez", russian: ["кот", "собака", "лошадь", "рыба"], correct: 3 }
];


list = [];
newData = [];

let currentQuestion = 0;

function init() {
    list = loadCSV();
    print(list.length);
}

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

async function loadCSV() {
    const response = await fetch('list.csv');
    const csvText = await response.text();
    return parseCSV(csvText);
}

function parseCSV(csvText) {
    const rows = csvText.trim().split('\n');
    return rows.map(row => row.split(','));
}

async function getRowData(rowNumber) {
    if (rowNumber > 0 && rowNumber <= list.length) {
        return data[rowNumber - 1];  // Индексация с 0, поэтому вычитаем 1
    } else {
        console.error('Номер строки выходит за пределы данных');
        return [];
    }
}

async function fetchData(rowNumber) {
    try {
        const rowData = await getRowData(rowNumber);
        console.log(`Данные строки ${rowNumber}:`, rowData);  // Выводим данные в консоль
    } catch (err) {
        console.error('Ошибка при получении данных:', err);
    }
}


loadQuestion();
