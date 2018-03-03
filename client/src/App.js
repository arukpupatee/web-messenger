import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';

import './App.css';

import { MessageBoard } from './components/MessageBoard'
import { MessageInput } from './components/MessageInput'

class App extends Component {
  constructor() {
    super();

    const endpoint= "http://localhost:5000";
    const socket = socketIOClient(endpoint);
    this.state = {
      socket: socket,
      endpoint: endpoint
    };
  }

  render() {
    const { socket } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Web Messenger</h1>
        </header>
        <p className="App-intro">
          Web Messenger for FireOneOne Interview
        </p>
        <MessageBoard socket={socket} />
        <MessageInput socket={socket} />
      </div>
    );
  }
}

export default App;
