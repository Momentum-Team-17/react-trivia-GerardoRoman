import axios from "axios";
import React, { useEffect, useRef, useState } from "react";


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
            question.current = response.data.results[0].question
            let correctAnswer = response.data.results[0].correct_answer
            let wrongAnswers = response.data.results[0].incorrect_answers
            answers.current = [...wrongAnswers, correctAnswer]
            score.current = 0
            // console.log(answers.current)
})
}, [])

        function handleClick(selectedAnswer) {
            if (questions.results[currentQuestion].correct_answer === selectedAnswer) {
                score.current += 1
                setCurrentQuestion(currentQuestion => currentQuestion + 1)
            } else {
                alert('Wrong answer!')
                score.current -= 1
            }
        }

    return (
        <>
<div className="container">
    <div className='question'>
        <h1>{question.current}</h1>
    </div>
    <div className='score'>
        <h2>{score.current}</h2>
    </div>
    <div className='all-buttons'>{answers.current && answers.current.map((answer) => (
        <div key={answer}>
            <button onClick={() => handleClick(answer)}>{answer}</button>
        </div>
        ))}
    </div>
</div>
</>
    )
}


