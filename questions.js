// Starting Values
let counter = 30;
let currentQuestion = 0;
let score = 0;
let lost = 0;
let timer;

// Next Question Function
function nextQuestion() {
    const isQuestionOver = (quizQuestions.length - 1) === currentQuestion;
    if (isQuestionOver) {
        // TODO
        console.log('Sorry, game over. :(');
        displayResult();
    } else {
        currentQuestion++;
        loadQuestion();
    }  
}
// Start a 30 seconds timer for user to respond or choose an answer to each question
function timeUp() {
    clearInterval(timer);
    lost++;
    preloadImage('lost');
    setTimeout(nextQuestion, 3 * 1000);
}
function countDown() {
    counter--;
    $('#time').html('Timer: ' + counter);
    if (counter === 0) {
        timeUp();
    }
}
// Display the question and the choices to the browser
function loadQuestion() {
    counter = 30;
    timer = setInterval(countDown, 1000);

    const question = quizQuestions[currentQuestion].question; // 
    const choices = quizQuestions[currentQuestion].choices; // 

    $('#time').html('Timer: ' + counter);
    $('#game').html(`
        <h4>${question}</h4>
        ${loadChoices(choices)}
        ${loadRemainingQuestion()}
    `);
}
function loadChoices(choices) {
    let result = '';

    for (let i = 0; i < choices.length; i++) {
        result += `<p class="choice" data-answer="${choices[i]}">${choices[i]}</p>`;
    }
    return result;
}
// Either correct/wrong choice selected, go to the next question
// Event Delegation
$(document).on('click', '.choice', function() {
    clearInterval(timer);
    const selectedAnswer = $(this).attr('data-answer');
    const correctAnswer = quizQuestions[currentQuestion].correctAnswer;

    if (correctAnswer === selectedAnswer) {
        score++;
        console.log('Horray you win!');
        preloadImage('win');
        setTimeout(nextQuestion, 3 * 1000);
    } else {
        lost++;
        console.log('Im sorry you lost!');
        preloadImage('lost');
        setTimeout(nextQuestion, 3 * 1000);
    }
});


function displayResult() {
    const result = `
        <p>You get ${score} questions(s) right</p>
        <p>You missed ${lost} questions(s)</p>
        <p>Total questions ${quizQuestions.length} questions(s) right</p>
        <button class="btn btn-primary" id="reset">Reset Game</button>
    `;

    $('#game').html(result);
}


$(document).on('click', '#reset', function() {
    counter = 30;
    currentQuestion = 0;
    score = 0;
    lost = 0;
    timer = null;

    loadQuestion();
});


function loadRemainingQuestion() {
    const remainingQuestion = quizQuestions.length - (currentQuestion + 1);
    const totalQuestion = quizQuestions.length;

    return `Remaining Question: ${remainingQuestion}/${totalQuestion}`;
}


function randomImage(images) {
    const random = Math.floor(Math.random() * images.length);
    const randomImage = images[random];
    return randomImage;
}


// Gify Display Correct / Incorrect
function preloadImage(status) {
    const correctAnswer = quizQuestions[currentQuestion].correctAnswer;

    if (status === 'win') {
        $('#game').html(`
            <p class="preload-image">Congratulations, you pick the corrrect answer</p>
            <p class="preload-image">The correct answer is <b>${correctAnswer}</b></p>
            <img src="${randomImage(WinImages)}" />
        `);
    } else {
        $('#game').html(`
            <p class="preload-image">The correct answer was <b>${correctAnswer}</b></p>
            <p class="preload-image">You lost pretty bad</p>
            <img src="${randomImage(LoseImages)}" />
        `);
    }
}

$('#start').click(function() {
    $('#start').remove();
    $('#time').html(counter);
    loadQuestion();
});


$('#start').on('click', function() {
    for (let i = 0; i < triviaQuestions.length; i++) {
        var questions = $('<h6>');
        questions.text(triviaQuestions[i].question);
        $('#questions').append(questions);
    }
    console.log("startbuttonclick")
})

const quizQuestions = [
    {
        question: "Where was I born?",
        choices: ["Los Angeles, CA", "Olympia, WA", "Portland, OR", "Honolulu, HI"],
        correctAnswer: "Portland, OR"
    },

    {
        question: "What is my pet at home?",
        choices: ["Goldfish", "Chinchilla", "Hedgehog", "Ferret"],
        correctAnswer: "Hedgehog"
    },

    {
        question: "Favorite kind of music?",
        choices: ["Classical", "Alternative", "Hip-hop", "EDM", "All of the above"],
        correctAnswer: "All of the above"
    },

    {
        question: "What is my favorite fish?",
        choices: ["Koi", "Mola Mola", "Puffer fish", "Lumpsucker"],
        correctAnswer: "Mola Mola"
    },
    {
        question: "What is my eye color?",
        choices: ["Blue", "Brown", "Green", "Hazel"],
        correctAnswer: "Green"
    },
    {
        question: "What is my favorite festival?",
        choices: ["Bass Canyon", "Paradiso", "Shambala", "Noctural Wonderland"],
        correctAnswer: "Bass Canyon"
    },
    {
        question: "What is my favorite beverage to order?",
        choices: ["Dirty Chai", "Americano", "London Fog", "Green Tea"],
        correctAnswer: "London Fog"
        
        question: "Where is my hometown?",
        choices: ["Bellingham", "Bellevue", "Burlington", "Bremerton"],
        correctAnswer: "Bremerton"
    },

const WinImages = [
    //can't get images to connect with QUESTIONS
    ./'assets\images\WinZone',
];

const LoseImages = [
    //can't get images to connect with QUESTIONS wtf
    .LoseImages 

  


