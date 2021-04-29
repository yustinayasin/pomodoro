import './App.css';
import React, { useState, useEffect} from 'react';


function App() {
  //biar bisa diclear intervalnya
  const timerRef = React.useRef();

  //minute sama seconds ga perlu dijadiin state karena turunan dari remaining time
  const [remainingTime, setRemainingTime] = useState(1500);
  const [isPaused, setIsPaused] = useState(false);
  const [isBreak, setIsBreak] = useState(false);


  //useEffect sama kek componentDidMount dan componentUnmount
  //pake array kosong as second argument biar berlaku seperti componentDidMount
  useEffect(() => {
    console.log('useEffect has been called!');
    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    if(remainingTime===0) {
      if(isBreak) {
        clearInterval(timerRef.current);
        setRemainingTime(1500);
      } else {
        clearInterval(timerRef.current);
        setRemainingTime(300);
      }
      setIsBreak((isBreak) => !isBreak);
    }
  }, [remainingTime])


  function timer() {
    setRemainingTime((remainingTime) => remainingTime - 1);
  }

  const startTimer = () => {
    clearInterval(timerRef.current);             // clear any running interval
    //setRemainingTime(1500);                      // reset state back to 25 minutes
    if(isBreak) {
      if(remainingTime > 0 && remainingTime < 300) {
        setIsPaused((isPaused) => !isPaused);
      } else {
        timerRef.current = setInterval(timer, 1000); // start/restart interval
      }
    } else {
      if(remainingTime > 0 && remainingTime < 1500) {
        setIsPaused((isPaused) => !isPaused);
      } else {
        timerRef.current = setInterval(timer, 1000); // start/restart interval
      }
    }
    
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    setIsPaused((isPaused) => !isPaused);
    if(isBreak) {
      setRemainingTime(300);
    } else {
      setRemainingTime(1500);
    }
  }

  const continueTimer = () => {
    clearInterval(timerRef.current);
    setIsPaused((isPaused) => !isPaused);
    timerRef.current = setInterval(timer, 1000);
  }

  const skipBreak = () => {
    clearInterval(timerRef.current);
    setRemainingTime(1500);
    setIsBreak((isBreak) => !isBreak);
  }

  function checkCondition() {
    if(isBreak) {
      if(remainingTime===0 || remainingTime===300) {
        return true;
      }
    } else {
      if(remainingTime===0 || remainingTime===1500) {
        return true;
      }
    }
    return false;
  }

  //function padStart itu buat nambahin 0 dengan 2 digit
  const minute = String(Math.floor(remainingTime / 60)).padStart(2, 0);
  const seconds = String(remainingTime % 60).padStart(2, 0);


  return (
    <div className={isBreak ? "pomodoro pomodoro-break" : "pomodoro"}>
      <div className="timer">
        {minute}:{seconds}
      </div>
      <div className="button-container">
        {
          isPaused 
          ? <>
            <button className="btn stop" onClick={stopTimer}>stop</button>
            <button className="btn continue" onClick={continueTimer}>continue</button>
            </>
          : <> 
            <button className="btn start" onClick={startTimer}>{ checkCondition() ? 'start' : 'pause'}</button>
            {
              isBreak && <button className="btn skip-break" onClick={skipBreak}>skip break</button>
            }
          </>
         }
      </div>
    </div>
  );
}
export default App;
