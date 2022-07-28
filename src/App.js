import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Die from './Die';
import React, { useState, useEffect } from 'react';

import { nanoid } from 'nanoid';

import Confetti from 'react-confetti';

function App() {
  const [numbersArray, setNumbersArray] = useState(allNewDice(10));
  const [time, setTime] = useState(0);
  const [tenzies, setTenzies] = useState(false);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    setRunning(false);
    console.log('current running', running);
    console.log('current tenzies', tenzies);
  }, [tenzies]);

  useEffect(() => {
    console.log('running degisti: ', running);
    let myInterval;
    if (running) {
      myInterval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
      console.log('interval başladı');
    }

    console.log('current running', running);
    console.log('clear edildi');
    return () => clearInterval(myInterval);
  }, [running]);

  const winCon = (arr) => {
    let checkerArray = [];
    arr.map((obj) => {
      obj.isHeld && checkerArray.push(obj.value);
    });

    if (checkerArray.length == 10) {
      if (
        checkerArray.every((currentValue) => {
          return currentValue === checkerArray[0];
        })
      ) {
        console.log('Kazandınız');

        setTenzies(true);
      }
    }
  };

  //render edilince fonksiyondan gelen arrayi güncelliyor

  function allNewDice(diesAmount) {
    const numArray = [];

    for (let i = 0; i < diesAmount; i++) {
      numArray.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      });
    }

    return numArray;
  }

  function holdDice(id) {
    setNumbersArray((oldArray) =>
      oldArray.map((obj) => {
        return obj.id === id ? { ...obj, isHeld: !obj.isHeld } : obj;
      })
    );

    console.log('hold tıklandı id: ', id);
  }

  //numbersArray'e verilen array mapleniyor
  const element = numbersArray.map((obj, index) => {
    return (
      <Die
        key={obj.id}
        id={obj.id}
        className={'col-2 box'}
        value={obj.value}
        isHeld={obj.isHeld}
        holdDice={() => holdDice(obj.id)}
      />
    );
  });

  //reactta adam fonksiyonda dışarıya bir array atıyor!

  function rollFunction(e) {
    console.log('e.target.value: ', e.target.value);
    if (e.target.value === 'RESET!') {
      setNumbersArray(allNewDice(10));
      setTenzies(false);
      setRunning(true);
      setTime(0);
    }

    setRunning(true);

    setNumbersArray((oldArray) =>
      oldArray.map((obj) => {
        return obj.isHeld
          ? obj
          : { ...obj, value: Math.floor(Math.random() * 6) };
      })
    );
  }

  React.useEffect(() => {
    winCon(numbersArray);
  }, [numbersArray]);

  return (
    <div className='App'>
      <div className='navbar'>
        <h1>Tanzies Game</h1>
        <h1>Time: {time}</h1>
      </div>
      <p>
        You need to get the same number for every card on the board. Finish it
        ASAP! Click on any card to start the game.
      </p>
      <p>Roll and start to start the game.</p>
      <div className='container'>
        {tenzies && <Confetti className='confeti' />}
        <div className='row'>{element}</div>
      </div>

      {!tenzies ? (
        <button value='ROLL!' className='rollDice' onClick={rollFunction}>
          'ROLL!'
        </button>
      ) : (
        <button value='RESET!' className='rollDice' onClick={rollFunction}>
          'RESET!'
        </button>
      )}
    </div>
  );
}

export default App;
