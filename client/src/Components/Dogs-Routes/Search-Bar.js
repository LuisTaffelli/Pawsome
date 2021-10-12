import React from 'react';
import {useState} from 'react';




function SearchBar({onSearch}){

	function handlebutton(){
    onSearch(input)
    setInput("")
  }
  
  const [input, setInput] = useState([""])

  return (<div >
    <input type='text' placeholder='Breed...' 
    onChange={e => {
      e.preventDefault()
      setInput(e.target.value)
    }}
    value={input}/>
    <button onClick={() => (
      handlebutton()
      )}>Buscar</button>
  </div>)
}


export default SearchBar;