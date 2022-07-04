const questionNumber = document.querySelector('.question-number')
const questionContent = document.querySelector('.question-content')
const answerContainer = document.querySelector('.answer-container')
const resultsAnswer = document.querySelector('.results-answer')
const mainMenu = document.querySelector('.menu-container')
const quizGame = document.querySelector('.quiz-container')
const quizSummary = document.querySelector('.resault-container')

const nextQuestionButton = document.querySelector('.next-question-button')

let questionCounter = 0
let currentQuestion
let availableQuestions = []
let answerId = 0
let correctAnswers = 0
let attempt = 0

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

    let animationDelay = 0.1
    answerContainer.innerHTML = ''
    answerId = 0

    for (const answer of currentQuestion.answers) {
        const option = document.createElement('div')
        option.innerHTML = answer
        option.id = answerId
        option.className = 'answer'
        answerContainer.appendChild(option)
        option.style.animationDelay = `${animationDelay}s`
        animationDelay += 0.1
        answerId++

        option.setAttribute('onclick', 'giveAnswer(this)')
    }

    questionCounter++
}

const giveAnswer = (answer) => {
    if (answer.id == currentQuestion.correct) {
        answer.classList.add('correct')
        updateAnswerPoints('correct')
        correctAnswers++
    } else {
        answer.classList.add('wrong')
        updateAnswerPoints('wrong')

        for (let i = 0; i < answerContainer.children.length; i++) {
            if (answerContainer.children[i].id == currentQuestion.correct) {
                answerContainer.children[i].classList.add('correct')
            }
        }
    }

    freezeAnswers()
}

const freezeAnswers = () => {
    for (let i = 0; i < answerContainer.children.length; i++) {
        answerContainer.children[i].classList.add('freeze')
    }
}

const answerPoints = () => {
    resultsAnswer.innerHTML = ''

    for (const question of questionsContent) {
        const point = document.createElement('div')
        resultsAnswer.appendChild(point)
    }
}

const updateAnswerPoints = (pointResault) => {
    resultsAnswer.children[questionCounter - 1].classList.add(pointResault)
}

const nextQuestion = () => {
    if (questionCounter === questionsContent.length) {
        quizOver()
    }
    else {
        getNewQuestion()
    }
}

const quizOver = () => {
    quizGame.classList.add('hide')
    quizSummary.classList.remove('hide')

    showQuizResults()
}

const showQuizResults = () => {
    quizSummary.querySelector('.total-question').innerHTML = questionsContent.length
    quizSummary.querySelector('.total-attempt').innerHTML = attempt
    quizSummary.querySelector('.total-correct').innerHTML = correctAnswers
    quizSummary.querySelector('.total-wrong').innerHTML = (questionsContent.length - correctAnswers)
    quizSummary.querySelector('.total-perectage').innerHTML = `${((correctAnswers/questionsContent.length) * 100)} %`
    quizSummary.querySelector('.total-score').innerHTML = `${correctAnswers} / ${questionsContent.length}`
}

window.onload = function () {
    setAvailableQuestions()
    getNewQuestion()

    answerPoints()
}

nextQuestionButton.addEventListener('click', nextQuestion)
