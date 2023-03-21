import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';


function App() {
  const [categories, setCategories] = useState(null)

  useEffect(() => {
    const API_URL = 'https://opentdb.com/api_category.php';

    axios.get(API_URL).then((taco) => setCategories(taco.data.trivia_categories) )
    }, [])
  return (

    <div className='category-list'>
      {
      categories && categories.map(category => <button>{category.name}</button>)
      }
    </div>
    // <div className="container">
    //   <div className='question'>
    //     <h1>this is a question</h1>
    //   </div>
    // <div className='all-buttons'>
    //   <button className='button1'>button1</button>
    //   <button className='button3'>button3</button>
    //   <button className='button2'>button2</button>
    //   <button className='button4'>button4</button>
    // </div>
    // </div>
  );
}

export default App;
