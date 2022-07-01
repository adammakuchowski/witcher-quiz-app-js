const questionNumber = document.querySelector('.question-number')
const questionContent = document.querySelector('.question-content')
const answerContainer = document.querySelector('.answer-container')

const nextQuestionButton = document.querySelector('.next-question-button')

let questionCounter = 0
let currentQuestion
let availableQuestions = []
let avaiableAnswers = []

const setAvailableQuestions = () => {
    for (const question of questionsContent) {
        availableQuestions.push(question)
    }
}

const getNewQuestion = () => {
    questionNumber.innerHTML = `Question ${questionCounter + 1} of ${questionsContent.length}`

    const randomQuestion = availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
    currentQuestion = randomQuestion
    questionContent.innerHTML = currentQuestion.question

    const indexToRemove = availableQuestions.indexOf(currentQuestion)
    availableQuestions.splice(indexToRemove, 1)

    for (const answer of currentQuestion.answers) {
        const option = document.createElement('div')
        option.innerHTML = answer
        option.className = 'answer'
        answerContainer.appendChild(option)
    }

    questionCounter++
}

const nextQuestion = () => {
    if(questionCounter === questionsContent.length){
        console.log('quiz over')
    }
    else {
        getNewQuestion()
    }
}

window.onload = function() {
    setAvailableQuestions()
    getNewQuestion()
}

nextQuestionButton.addEventListener('click', nextQuestion)
