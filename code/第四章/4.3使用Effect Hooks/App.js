// 第二个参数是一个数组，只有数组的每一项都不变的时候useEffect才不会执行
import React, { useState, useEffect } from 'react';

function App() {
  const dom = document.documentElement;
  const [count, setCount] = useState(0);
  const [size, setSize] = useState({
    width: dom.clientWidth,
    height: dom.clientHeight
  });

  const onResize = () => {
    setSize({
      width: dom.clientWidth,
      height: dom.clientHeight
    });
  };

  const onClick = () => {
    console.log('click');
  };

  useEffect(() => {
    document.title = count;
  });

  useEffect(() => {
    console.log('paint')
    window.addEventListener('resize', onResize, false);
    return () => {
      window.removeEventListener('resize', onResize, false);
    };
  }, []);

  useEffect(() => {
    document.querySelector('#size').addEventListener('click', onClick, false);
    return () => {
      document.querySelector('#size').removeEventListener('click', onClick, false);
    };
  });

  return (
    <div>
      <button
        onClick={()=>setCount(count + 1)}
      >点我</button>
      {
        count % 2 ? <div key="1" id="size">奇数 width:{size.width} height:{size.height}</div> : <div key="2" id="size">偶数 width:{size.width} height:{size.height}</div>
      }
    </div>
  );
}

export default App;
