import axios from "axios";
import React, { useEffect, useRef, useState } from "react";


export default function Game({categoryId}) {
    const [questions, setQuestions] = useState(null)
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const answers = useRef(null)
    let question = useRef(null)

    useEffect(() => {
        const URL = `https://opentdb.com/api.php?amount=10&category=${categoryId}`;
        axios.get(URL).then((response) => { 

            setQuestions(response.data)
            question.current = response.data.results[0].question
            let correctAnswer = response.data.results[0].correct_answer
            let wrongAnswers = response.data.results[0].incorrect_answers
            answers.current = [...wrongAnswers, correctAnswer]
            // score.current = 0
            console.log(answers.current)
})
}, [])

    return (
        <>
 <div className="container">
      <div className='question'>
        <h1>{question.current}</h1>
      </div>
    <div className='all-buttons'>{answers.current && answers.current.map((answer) => (
        <div>
      <button className='button1'>{answer}</button>
      <button className='button3'>{answer}</button>
      <button className='button2'>{answer}</button>
      <button className='button4'>{answer}</button> 
      </div>
      ))}
    </div>
</div>
</>
    )
 }


