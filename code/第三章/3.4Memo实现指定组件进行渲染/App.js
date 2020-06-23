import React, { Component, PureComponent } from 'react'

class Foo extends PureComponent {
  // shouldComponentUpdate(nextProps, nextState) {
  //   if (nextProps.name === this.props.name) return false;
  //   return true;
  // }
  constructor(props) {
    super(props);
    this.fn = this.fn.bind(this);
  }
  fn() {
    this.props.cb()
  }
  render() {
    console.log('渲染了')
    return (
      <div>
        {this.props.person.age}
        <button onClick={this.fn}>foo</button>
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      name: 'f',
      person: {
        age: 1
      }
    };
    this.fn = this.fn.bind(this);
  }
  fn() {
    console.log('fn',this)
  }
  render() {
    const { count, name, person } = this.state;
    console.log(count, person)
    return (
      <div>
        <button onClick={()=>this.setState({
          count: count + 1
        })}>点我</button>
        <button onClick={()=>{
          person.age++;
          this.setState({
            person
          });
        }}>点我</button>
        {/* <Foo person={person} name={name} cb={()=>{}}/> */}
        <Foo person={person} name={name} cb={this.fn}/>
      </div>
    )
  }
}

export default App;
