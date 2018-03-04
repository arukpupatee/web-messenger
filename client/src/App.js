import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';

//import './App.css';

import { AppNavbar } from './components/AppNavbar';
import { MessengerWindow } from './components/MessengerWindow';

class App extends Component {
  constructor() {
    super();

    const endpoint = 'http://localhost:5000';
    const socket = socketIOClient(endpoint);

    socket.on('login success', loginData => {
      this.setState({messageHistory: loginData.messageHistory});
      this.setState({user: loginData.user});
      socket.emit('new message', loginData.data);
    });

    this.state = {
      socket: socket,
      endpoint: endpoint,
      user: null,
      messageHistory: []
    };
  }
  handleTextInputLoginEnter = e => {
    if (e.key === 'Enter') {
        e.preventDefault();
        var username = this.textInputLogin.value;
        this.login(username);
        this.loginButton.disabled = true;
    }
  }
  handleButtonLoginSubmit = e => {
    e.preventDefault();
    var username = this.textInputLogin.value;
    this.login(username);
    this.loginButton.disabled = true;
  }
  login = username => {
    const { socket } = this.state;
    socket.emit('login', username);
  }

  render() {
    const { socket } = this.state;
    const { user } = this.state;
    const { messageHistory } = this.state;
    return (
      <div className='App'>
        <AppNavbar />
        <div className='container'>
          {user
            ? <MessengerWindow socket={socket} user={user} messageHistory={messageHistory} />
            : <div>
                <div className='jumbotron'>
                  <h1 className='display-4'>Web Messenger</h1>
                  <p>Please Login !!</p>
                </div>
                <div className='input-group input-group-lg'>
                  <div className='input-group-prepend'>
                    <span className='input-group-text'>Username</span>
                  </div>
                  <input 
                      className='form-control' aria-label='Username' aria-describedby='basic-addon1'
                      placeholder='Username' 
                      type='text' 
                      ref={input => { this.textInputLogin = input }} 
                      onKeyPress={this.handleTextInputLoginEnter}
                  />
                  <button 
                    type='button' className='btn btn-primary' 
                    onClick={this.handleButtonLoginSubmit} 
                    ref={button => {this.loginButton = button}}
                  >
                    Login
                  </button>
                </div>
              </div>
          }
        </div>
      </div>
    );
  }
}

export default App;
