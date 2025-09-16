import React, { useRef, useState, useEffect, useReducer } from 'react';

const initialState = {
  isRunning: false,
  time: 0,
};

const startAction = { type: 'start' };
const stopAction = { type: 'stop' };
const resetAction = { type: 'reset' };
const tickAction = { type: 'tick' };

function reducer(state, action) {
  switch (action.type) {
    case 'start':
      return { ...state, isRunning: true };
    case 'stop':
      return { ...state, isRunning: false };
    case 'reset':
      return { isRunning: false, time: 0 };
    case 'tick':
      return { ...state, time: state.time + 1 };
    default:
      throw new Error();
  }
}

const Stopwatch: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const timerIdRef = useRef<number | null>(0);

  const startTimer = () => {
    dispatch(startAction);
  };

  const stopTimer = () => {
    dispatch(stopAction);
  };

  useEffect(() => {
    if (!state.isRunning) {
      return;
    }
    timerIdRef.current = setInterval(() => dispatch({ type: 'tick' }), 1000);
    return () => {
      if (timerIdRef.current) {
        clearInterval(timerIdRef.current);
        timerIdRef.current = 0;
      }
    };
  }, [state.isRunning]);

  return (
    <div>
      <h1>Stopwatch</h1>
      <p>Time: {state.time} seconds</p>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
    </div>
  );
};

export default Stopwatch;
