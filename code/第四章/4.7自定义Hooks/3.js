// 共享size
import React, { useState, useEffect, useCallback } from 'react';

function Counter() {
  const size = useSize();
  return <h1>width:{size.width} height:{size.height}</h1>
}

function useSize() {
  const dom = document.documentElement;
  const [size, setSize] = useState({
    width: dom.clientWidth,
    height: dom.clientHeight
  });

  const onResize = useCallback(() => {
    setSize({
      width: dom.clientWidth,
      height: dom.clientHeight
    });
  }, []);

  useEffect(() => {
    window.addEventListener('resize', onResize, false);
    return () => {
      window.removeEventListener('resize', onResize, false);
    }
  }, [onResize]);

  return size;
}

function App() {
  const size = useSize();
  return (
    <div>
      width: {size.width} height: {size.height}
      <Counter/>
    </div>
  );
}

export default App;
