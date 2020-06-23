import React, { Component, memo } from 'react'; 

const Foo = memo((props) => {
  console.log('渲染了');
  return  <div>{props.count}</div>;
});

class App extends Component {
  state = {
    count: 0
  };
  render() {
    const { count } = this.state;
    return (
      <div>
        <button onClick={()=>this.setState({
          count: count + 1
        })}>点我</button>
        <Foo/>
      </div>
    );
  }
}
export default App;
