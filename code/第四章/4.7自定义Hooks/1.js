// 自定义hooks封装count自动加一，到10为止
import React, { useState, useEffect, useRef } from 'react';

function Counter(props) {
  return <h1>{props.count}</h1>
}

function useCount(defaultCount) {
  let counterRef = useRef();
  const [count, setCount] = useState(defaultCount);

  useEffect(() => {
    counterRef.current = setInterval(() => {
      setCount(count => count + 1);
    }, 1000);
  }, []);

  useEffect(() => {
    if (count >= 10){
      clearInterval(counterRef.current);
    }
  });

  return [count, setCount];
}

function App() {
  const [count, setCount] = useCount(0);
  return <Counter count={count}/>
}

export default App;