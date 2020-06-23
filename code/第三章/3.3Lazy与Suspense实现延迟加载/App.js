import React, { Component, lazy, Suspense } from 'react'

const About = lazy(() => import(/* webpackChunkName:"about1" */ './About'));

class App extends Component {
  state = {
    hasError: false
  };

  // componentDidCatch() {
  //   this.setState({
  //     hasError: true
  //   })
  // }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    console.log(this.state.hasError)
    if (this.state.hasError){
      return <div>error</div>
    }
    return (
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <About />
        </Suspense>
      </div>
    );
  }
}

export default App;
