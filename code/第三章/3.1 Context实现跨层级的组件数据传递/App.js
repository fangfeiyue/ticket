import React, { Component, createContext } from 'react'

const OnlineContext = createContext();
const BatteryContext = createContext(100);

const Leaf = () => {
  return (
    <BatteryContext.Consumer>
      {
        battery => (
          <OnlineContext.Consumer>
            {
              online => <h1>{battery}-{String(online)}</h1>
            }
          </OnlineContext.Consumer>
        )
      }
    </BatteryContext.Consumer>
  );
};

const Middle = () => <Leaf></Leaf>;

class App extends Component{
  state = {
    count: 0,
    online: false
  };
  render() {
    const { count, online } = this.state;
    return (
      <BatteryContext.Provider value={count}>
        <OnlineContext.Provider value={online}>
          <Middle/>
          <button onClick={() => this.setState({count: count + 1})}>点我</button>
          <button onClick={() => this.setState({online: !online})}>改变网路状态</button>
        </OnlineContext.Provider>
      </BatteryContext.Provider>
    );
  }
}

export default App;