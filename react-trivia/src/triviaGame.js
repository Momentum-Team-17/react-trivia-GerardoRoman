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

const handleAnswerSelect = (answer) => {
    console.log(`Selected answer: ${answer}`);
}

return (
    <>
        <div className="container">
            <div className='score'>
                <h2>Score: {score.current}</h2>
            </div>
            <div className='question'>
                <h1>{question.current}</h1>
            </div>
            <div className='all-buttons'>
                {answers.current && answers.current.map((answer) => (
                    <div key={answer}>
                        <button onClick={() => handleAnswerSelect(answer)}>{answer}</button>
                    </div>
                ))}
            </div>
        </div>
    </>
    )
}