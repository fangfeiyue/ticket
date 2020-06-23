// useRef的初步使用
import React, { useRef, PureComponent, useCallback, useState } from 'react';

class Counter extends PureComponent {
  speak() {
    console.log(`this.props.count=${this.props.count}`);
  }
  render() {
    return <h1 onClick={this.props.onClick}>count:{this.props.count}</h1>
  }
}

function App() {
  const counterRef = useRef();
  const [count, setCount] = useState(0);

  const onClick = useCallback(() => {
    // console.log('callback', counterRef.current);
    counterRef.current.speak();
  }, [counterRef]);

  return (
    <div>
      <button onClick={()=>setCount(count + 1)}>点我</button>
      <Counter
        onClick={onClick}
        count={count}
        ref={counterRef}
      />
    </div>
  );
}

export default App;