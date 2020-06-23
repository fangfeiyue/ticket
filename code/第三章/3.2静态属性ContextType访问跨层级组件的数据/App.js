import React, { Component, createContext } from 'react';

const BatteryContext = createContext(0);

class Leaf extends Component {
  static contextType = BatteryContext;
  render() {
    console.log(this.contextType)
  return <div>{this.context}</div>
  }
};

const Middle = ()=> <Leaf/>;

class App extends Component {
  state = {
    count: 0
  };
  render() {
    const { count } = this.state;
    return (
      <BatteryContext.Provider value={count}>
        <button onClick={()=>this.setState({count: count + 1})}>点我</button>
        <Middle/>
      </BatteryContext.Provider>
    );
  };
}

export default App;