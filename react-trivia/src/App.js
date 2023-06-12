import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Game from './triviaGame'

function App() {
  const [categories, setCategories] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)
  // const [question, setQuestion] = useState(null)

  useEffect(() => {
    const API_URL = `https://opentdb.com/api_category.php`;

    axios.get(API_URL).then((taco) => setCategories(taco.data.trivia_categories) )
    }, [])

    const handleCategorySelect = (categoryId) => {
      setSelectedCategory(categoryId);
      // continue to the next phase of the triva game using the selected category ID
    };
if(selectedCategory) {
  return (
    < Game categoryId={selectedCategory} />
  )
}
  return (

    <div className='category-list'>
      <h1>Welcome to React Trivia!</h1>
      <h2>Select a category!</h2>
      {
      categories && categories.map((category) => (
      <button key={category.id} onClick={() => handleCategorySelect(category.id)}>{category.name}</button>
      ))}
    </div>
  );
}

export default App;
