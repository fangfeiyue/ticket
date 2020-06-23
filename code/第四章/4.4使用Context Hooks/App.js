import React, { Component, useState, useContext, createContext } from 'react';

const CountContext = createContext(0);
const OnlineContext = createContext(true);

function Bar() {
  return (
    <CountContext.Consumer>
      {
        count=><h1>Bar:{count}</h1>
      }
    </CountContext.Consumer>
  );
}

class Foo extends Component {
  static contextType = CountContext;
  render(){
    return <h1>Foo:{this.context}</h1>;
  };
}

function Count() {
  const count = useContext(CountContext);
  const online = useContext(OnlineContext);
  return <h1>Count:{count}online:{String(online)}</h1>;
}

function App() {
  const [count, setCount] = useState(0);
  const [online, setOnline] = useState(false);
  return (
    <div>
      <button
        onClick={()=>setCount(count + 1)}
      >点我</button>
      <button
        onClick={()=>setOnline(!online)}
      >改变网络状态</button>

      <CountContext.Provider value={count}>
        <OnlineContext.Provider value={online}>
          <Foo/>
          <Bar/>
          <Count/>
        </OnlineContext.Provider>
      </CountContext.Provider>
    </div>
  )
}

export default App;