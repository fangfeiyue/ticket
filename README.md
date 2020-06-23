# React新特性一览
## Context实现跨层级的组件数据传递
contex

context提供了一种方式，能够让数据在组件树中传递而不必一级一级的手动传递

这种类似使用全局变量的方式会使组件失去独立性，复用起来更困难。

contexType
lazy
suspense
memo

## 静态属性ContextType访问跨层级组件的数据

## Lazy与Suspense实现延迟加载

webpack - code splitting
关键字import 静态/动态导入模块

import('test.js').then(...)



## Memo实现指定组件进行渲染

React是举世瞩目的前端MVVM框架，当数据发生变化就会重新渲染视图。
```
import React, { Component } from 'react';
import './App.css';
class Foo extends Component {
  render() {
    return (
      <div>改变count值时不希望重新渲染：{Math.random()}</div>
    )
  }
}
class App extends Component {
  state = {
    count: 0
  };
  render() {
    return (
      <div>
        <Foo name="name"/>
        <div>count的值：{ this.state.count }</div>
        <div 
          onClick={()=>this.setState({ count:this.state.count + 1})}>
          点我改变count值
        </div>
      </div>
    );
  }
}

export default App;
```
当我们点击`点我改变count值`时count的值会加一，这个时候页面显示的内容也会随之变化，但是我们同时发现每次改变count的值时Foo组件中显示的随机数也在变化，这就奇怪了，count的值和Foo组件中显示的内容并没有什么联系，按理来说count的变化不应该会导致Foo中显示的内容变化呀，这是为什么呢？

客官别急，且听小生分析，如有不对，烦劳大佬们多多指教哈。

当count的值发生变化的时候会引起App组件中中的render函数重新执行，Foo组件包含在render方法内，所以Foo组件也会被重新渲染，最终导致Foo组件中的随机数发生变化。

在我们改变count值的时候，并不想Foo组件重新渲染，这样就造成了不必要的性能损耗。

那么我们应该怎么解决这个问题呢？

### shouldComponentUpdate()

React提供了[shouldComponentUpdate(nextProps, nextState)](https://reactjs.org/docs/react-component.html#shouldcomponentupdate)这个方法。根据这个方法的返回值，判断 React 组件的输出是否受当前 state 或 props 更改的影响。这个方法默认返回true，返回false时不会重新render，并且这个方法不会在初始化渲染或使用forceUpdate()时被调用。

代码修改如下：
```
import React, { Component } from 'react';
import './App.css';

class Foo extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.name === this.props.name)return false;
  }
  render() {
    return (
      <div>
        改变count值时不希望重新渲染：{Math.random()}
      </div>
    )
  }
}
class App extends Component {
  state = {
    count: 0
  };
  render() {
    return (
      <div>
        <Foo name="name"/>
        <div>count的值：{ this.state.count }</div>
        <div 
          onClick={()=>this.setState({ count:this.state.count + 1})}>
          点我改变count值
        </div>
      </div>
    );
  }
}

export default App;
```
这个时候当我们改变count的值的时候，并未改变Foo组件接收的name的值，所以Foo组件不会重新渲染。

上面我们只是举了个简单的例子，实际开发总Foo组件的props或者state可能会有很多数据，甚至包括数组、对象等这些相对复杂的数据。如果我们要对每一个数据对比后在决定是否渲染组件，工作量实在过于庞大。有什么更好的解决方法吗？

## React.PureComponent

React.PureComponent和React.Component相似，不同的是React.Component没有实现shouldComponentUpdate()，而React.PureComponent中以浅层对比prop和state的方式实现了该函数。









# React颠覆性新特性Hooks
##  React Hooks的概念与意义
## 使用State Hooks
## 使用Effect Hooks
## 使用Context Hooks
## 使用Memo&Callback Hooks
## 使用Ref Hooks
## 自定义Hooks
## Hooks的使用法则
## Hooks的常见问题

# 渐进式Web App
## PWA简介
## 服务工作线程：Service Worker
## “承诺”控制流：Promise
## 更优雅的请求：fetch
## 资源的缓存系统：Cache API
## 消息推送：Notification API
## 如何在项目中开启PWA
## 
## 
## 
## 
## 
## 
## 


首先没能给您带来良好的购物体验深感抱歉。您说的不好指的是哪呢，可否描述详细一些或者配上图片呢。为了更好的保护买家利益，只要宝贝没开封本店支持无条件退货的。看您评价日期是当天签收当天就给了差评，期间未曾有过任何沟通，咨询您哪里不满意也未见您回复。难道只是为了给个差评吗？希望我们碰到的不是差评师。我们尊重每个买家的评价，期待您的回复，帮助我们发现问题解决问题，让我们为买家提供更好的产品和服务，谢谢您。
