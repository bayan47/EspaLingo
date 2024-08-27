let list = [];
let currentQuestion = 0;

async function init() {
    list = await loadCSV(); // Ожидаем завершения загрузки CSV файла
    console.info(`Загружено строк: ${list.length}`);
    loadQuestion(); // После загрузки данных сразу загружаем первый вопрос
}

function loadQuestion() {
    const question = list[currentQuestion]; // Используем данные из загруженного CSV
    if (!question) {
        console.error('Вопрос не найден');
        return;
    }
    
    document.getElementById("spanish-word").textContent = question[1]; // Испанское слово из второго столбца
    const russianWords = shuffleArray(list.map(item => item[0])); // Берем все русские слова и перемешиваем
    
    document.getElementById("option1").textContent = russianWords[0];
    document.getElementById("option2").textContent = russianWords[1];
    document.getElementById("option3").textContent = russianWords[2];
    document.getElementById("option4").textContent = russianWords[3];
    
    resetButtons();
}

function resetButtons() {
    document.querySelectorAll('button').forEach(button => {
        button.classList.remove('correct', 'incorrect');
    });
}

function checkAnswer(selectedOption) {
    const question = list[currentQuestion];
    const buttons = document.querySelectorAll('button');
    
    // Найдем правильный ответ среди кнопок
    const correctIndex = Array.from(buttons).findIndex(button => button.textContent === question[0]);

    if (selectedOption === correctIndex) {
        buttons[selectedOption].classList.add('correct');
    } else {
        buttons[selectedOption].classList.add('incorrect');
        buttons[correctIndex].classList.add('correct');
    }

    setTimeout(nextQuestion, 3000);
}

function nextQuestion() {
    currentQuestion = (currentQuestion + 1) % list.length;
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

// Функция для перемешивания массива
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Инициализация
init();
