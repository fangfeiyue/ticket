// hook返回JSX

import React, { useEffect, useState, useRef } from 'react';

function useCounter(count) {
  return <h1>{count||1}</h1>
}

function useCount(defaultCount) {
  const counterRef = useRef();
  const [count, setCount] = useState(defaultCount);
  useEffect(() => {
    counterRef.current = setInterval(() => {
      setCount(count => count + 1);
    }, 1000);
  }, []);
  useEffect(() => {
    if (count >= 10) {
      clearInterval(counterRef.current);
    }
  });

  return [count, setCount];
}

function App() {
  const [count, setCount] = useCount(0);
  const Counter = useCounter(count);
  return <div>{Counter}</div>
}

export default App;