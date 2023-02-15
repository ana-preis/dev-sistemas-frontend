/* eslint-disable */
import monica from './monica-01.png';
import sansao from './sansao.png';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [firstNumber, setFirstNumber] = useState("")
  const [secondNumber, setSecondNumber] = useState("")
  const [result, setResult] = useState("")
  const [op, setOp] = useState("")
  
  let operation = ""

  const randomNumber = () => Math.floor(Math.random() * 10);
  const randomOp = () => Math.floor(Math.random() * 2);
  const operations = ["+", "-"]

  useEffect(() => {
    renderCalculator()
  }, []);
  
  const renderCalculator = () => {
    const randomOpIndex = randomOp()
    const newOperation = operations[randomOpIndex]
    setOp(newOperation)
    operation = newOperation
    let numberA = randomNumber()
    let numberB = randomNumber()
    
    if (operation == "+") {
      while (numberA + numberB > 9) {
        numberA = randomNumber()
        numberB = randomNumber()
      }
    } else if (operation == "-") {
      while (numberA - numberB < 0) {
        numberA = randomNumber()
        numberB = randomNumber()
      }
    }

    setFirstNumber(numberA)
    setSecondNumber(numberB)
  }

  const calculate = (input, tecla, resultElement) => {
    if (op == "+" && firstNumber + secondNumber !== tecla) {
      setResult("Errado")
      input.value = ""
      resultElement.style = "background-color: #961600"
      return
    } else if (op == "-" && firstNumber - secondNumber !== tecla) {
      setResult("Errado")
      resultElement.style = "background-color: #961600"
      input.value = ""
      return
    }
    setResult("Certo!!!")
    resultElement.style = "background-color: #007a0a"
    setTimeout(2000)
    input.value = ""
    renderCalculator()
  }

  document.onkeyup = function (evento){
    let tecla = Number(evento.key)
    let input = document.getElementById('inpNumero')
    let resultElement = document.getElementById('resultId')
    input.value = tecla
    if(!isNaN(tecla)) {
      calculate(input, tecla, resultElement)
      return
    }
    setResult("Apenas números!!")
    input.value = ""
    resultElement.style = "background-color: #961600"
  }

  return (
    <div className="App">

      

      <header className="App-header">
        <p>Mini Game Matemático da Turma da Mônica</p>
        <div className='img-container'>
          <img src={sansao} className="App-logo" alt="logo" />
          <div>
            <label>{firstNumber} </label>
            <label>{op} </label>
            <label>{secondNumber} = </label>
  
            <div>
              <input id='inpNumero' className='input'></input>
            </div>
  
            <div className='result' id='resultId'>
              <label className='label-result'>{result}</label>
            </div>
          </div>
          <img src={monica} className='img-monica'/>
        </div>
      </header>
      

    </div>
  );
}

export default App;
