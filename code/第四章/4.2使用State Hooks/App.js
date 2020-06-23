import React, { useState } from 'react';

// let id = 0;

function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('Jack');
  // const [count, setCount] = useState(() => {
  //   console.log('次数');
  //   return 0;
  // });
  
  // let count, setCount, name, setName;

  // id++;

  // if (id & 1) {
  //   [count, setCount] = useState(0);
  //   [name, setName] = useState('Jack');
  // }else {
  //   [name, setName] = useState('Jack'); 
  //   [count, setCount] = useState(0);
  // }

  return (
    <div>
      <button
        onClick={()=>setCount(100)}
      >click me</button>
      count:{count} name:{name} {Math.random()}
    </div>
  );
}

export default App;
