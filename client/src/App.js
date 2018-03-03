import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';

import './App.css';

import { MessengerWindow } from './components/MessengerWindow';

class App extends Component {
  constructor() {
    super();

    const endpoint= "http://localhost:5000";
    const socket = socketIOClient(endpoint);

    socket.on('login success', data => this.setState({user: data.user}));

    this.state = {
      socket: socket,
      endpoint: endpoint,
      user: null
    };
  }
  handleTextInputLoginEnter = e => {
    if (e.key === 'Enter') {
        e.preventDefault();
        var username = this.textInputLogin.value;
        this.login(username);
        this.textInputLogin.value = '';
    }
  }
  handleButtonLoginSubmit = e => {
    e.preventDefault();
    var username = this.textInputLogin.value;
    this.login(username);
    this.textInputLogin.value = '';
  }
  login = username => {
    const { socket } = this.state;
    socket.emit('login', username);
  }

  render() {
    const { socket } = this.state;
    const { user } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Web Messenger</h1>
        </header>
        <p className="App-intro">
          Web Messenger for FireOneOne Interview
        </p>
        {user
          ? <MessengerWindow socket={socket} user={user} />
          : <div>
              <span>Username: </span>
              <input 
                  type="text" 
                  ref={input => { this.textInputLogin = input }} 
                  onKeyPress={this.handleTextInputLoginEnter}
              />
              <button type="button" onClick={this.handleButtonLoginSubmit}>Login</button>
            </div>
        }
        
      </div>
    );
  }
}

export default App;
