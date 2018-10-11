import React, { Component } from 'react';
import ControlPanel from './controlPanel'
import './App.css';

class App extends Component {
  render() {
    return (
      <div style={{margin: '30px'}} className="App">
        <ControlPanel/>
      </div>
    );
  }
}

export default App;
