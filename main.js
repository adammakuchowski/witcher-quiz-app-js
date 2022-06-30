const questionNumber = document.querySelector('.question-number')
const questionContent = document.querySelector('.question-content')
const answerContainer = document.querySelector('.answer-container')

let questionCounter = 0
let currentQuestion
let availableQuestions = []

const setAvailableQuestions = () => {
    for (const question of questionsContent) {
        availableQuestions.push(question)
    }
}

const getNewQuestion = () => {
    questionNumber.innerHTML = `Question ${questionCounter + 1} of ${questionsContent.length}`

    const randomQuestion = availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
    currentQuestion = randomQuestion
    questionContent.innerHTML = currentQuestion.quest
}

window.onload = function() {

    setAvailableQuestions()
    getNewQuestion()
}
