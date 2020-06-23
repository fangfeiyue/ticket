// hookRef
/*

通过ref.current获取组件，如：
`console.log(counterRef.current)`

不能通过ref获取到函数组件，由此可见函数组件不能完全替代类组件
*/

// 进入页面count自动加一，当大于等于的10的时候不再增加

import React, { PureComponent, useRef, useCallback, useState, useEffect } from 'react';

class Counter extends PureComponent {
  render(){
    return <h1>{this.props.count}</h1>
  }
}

function App() {
  let t = useRef();
  const [count, setCount] = useState(0);

  useEffect(() => {
    t.current = setInterval(() => {
      setCount(count=>count+1)
      console.log(count)
    }, 1000);
    console.log(t)
  }, []);

  useEffect(() => {
    if (count >= 10) {
      clearInterval(t.current);
    }
  });

  return (
    <div>
      <button onClick={()=>setCount(count + 1)}>点我</button>
      <Counter count={count}/>
    </div>
  );
}

export default App;

