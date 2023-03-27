import axios from "axios"
import React, { useEffect, useRef, useState } from "react"
import he from 'he'

export default function Game({categoryId}) {
    const [questions, setQuestions] = useState(null)
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const answers = useRef(null)
    let question = useRef(null)
    let score = useRef(0)

    useEffect(() => {
        const URL = `https://opentdb.com/api.php?amount=10&category=${categoryId}`;
        axios.get(URL).then((response) => { 

            setQuestions(response.data)
            question.current = he.decode(response.data.results[0].question)
            const correctAnswer = response.data.results[0].correct_answer
            const wrongAnswers = response.data.results[0].incorrect_answers
            answers.current = [...wrongAnswers, correctAnswer]
            score.current = 0
            // console.log(answers.current)
})
}, [])

const handleAnswerSelect = (answer) => {
    const isCorrect = answer === he.decode(questions.results[currentQuestion].correct_answer)
    if (isCorrect) {
        score.current += 1 
    } else {
        alert("Sorry, that's incorrect. The correct answer is: " + questions.results[currentQuestion].correct_answer)
    }
    const nextQuestion = currentQuestion + 1
    if (nextQuestion < questions.results.length) {
        setCurrentQuestion(nextQuestion)
        question.current = questions.results[nextQuestion].question
        const correctAnswer = questions.results[nextQuestion].correct_answer
        const wrongAnswers = questions.results[nextQuestion].incorrect_answers
        answers.current = [...wrongAnswers, correctAnswer]
    } else {
        alert(`Game Over! Your final score is ${score.current}`)
    }
}

return (
    <>
        <div className="container">
            <div className='score'>
                <h2>Score: {score.current}/10</h2>
            </div>
            <div className='question'>
                <h1>{he.decode(question.current)}</h1>
            </div>
            <div className='all-buttons'>
                {answers.current && answers.current.map((answer) => (
                    <div key={answer}>
                        <button onClick={() => handleAnswerSelect(answer)}>{he.decode(answer)}</button>
                    </div>
                ))}
            </div>
        </div>
    </>
    )
}