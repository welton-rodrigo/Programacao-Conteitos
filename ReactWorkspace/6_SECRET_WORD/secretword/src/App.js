//css
import './App.css';

//react
import {useCallback, useEffect, useState, UseState} from 'react';

//data
import { wordsList } from './data/words';

//components
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

const stages = [
  { id:1, name:"start"},
  { id:2, name:"game"},
  { id:3, name:"end"},

]

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList)

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters]= useState([]);

  const pickWordAndCategory = () => {
    //pick a rando caegory
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random()* Object.keys(categories).length)];
    console.log(category)

    //pick random word
    const word = words[category][Math.floor(Math.random()* words[category].length)]
    console.log(word)

    return{word, category}

  }

  //starts secrets word game
 const startGame = () => {
//pick word and pick category
  const {word, category} = pickWordAndCategory();
  
  //create an array of letter
  let wordLetters = word.split("");
  
  wordLetters = wordLetters.map((l) => l.toLowerCase());

  console.log(wordLetters);
  console.log(word, category);

//fill states
setPickedWord(word);
setPickedCategory(category);
setLetters(letters);
console.log(letters);
  setGameStage(stages[1].name);
 }

 //process the letter input
 const verifyLetter = () =>{
  setGameStage(stages[2].name)
 }

 const retry = () => {
  setGameStage(stages[0].name)
 }

 

  return (
    <div className="App">
     {gameStage === 'start' && <StartScreen startGame={startGame}/>}
     {gameStage === 'game' && <Game verifyLetter={verifyLetter}/>}
     {gameStage === 'end' && <GameOver retry={retry} />}
    </div>
  );
}

export default App;
