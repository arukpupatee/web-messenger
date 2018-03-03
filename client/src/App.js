import React, { Component } from 'react';
import './App.css';

import { MessageBoard } from './components/MessageBoard'

class App extends Component {
  constructor() {
    super();
  }

  
  render() {
    
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Web Messenger</h1>
        </header>
        <p className="App-intro">
          Web Messenger for FireOneOne Interview
        </p>
        <MessageBoard />
      </div>
    );
  }
}

export default App;
