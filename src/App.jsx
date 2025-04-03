import React, { useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Main from './components/Main/Main';

function App() {
  const [count, setCount] = useState(0);

  return (
    <React.Fragment>
      <Sidebar />
      <Main />
    </React.Fragment>
  )
}

export default App
