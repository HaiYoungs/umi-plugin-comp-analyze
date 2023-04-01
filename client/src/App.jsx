import React from 'react';
import FileTree from './components/FileTree';
import RenderGraph from './components/RenderGraph';
import './App.css'

function App() {
  return (
    <div className="App">
      <div className='tree'>
        <FileTree></FileTree>
      </div>
      <div className="graph">
        <RenderGraph></RenderGraph>
      </div>
    </div>
  );
}

export default App;
