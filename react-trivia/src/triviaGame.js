import axios from "axios";
import { useEffect, useRef, useState } from "react";


export default function Game({categoryId}) {
    const [questions, setQuestions] = useState(null)
    const [currentQuestion, setCurrentQuestion] = useState(0)
let question = useRef(null)
    useEffect(() => {
        const URL = `https://opentdb.com/api.php?amount=10&category=${categoryId}`;
        axios.get(URL).then((response) => { 
            // console.log(URL)
            setQuestions(response.data)
            question.current=response.data.results[0].question
            // console.log(categoryId)
})
    }, [])
    return (
 <div className="container">
      <div className='question'>
        <h1>{question.current}</h1>
      </div>
    <div className='all-buttons'>
      <button className='button1'>{question.current}</button>
      <button className='button3'>{question.current}</button>
      <button className='button2'>{question.current}</button>
      <button className='button4'>{question.current}</button>
    </div>
    </div>
    )
 }


