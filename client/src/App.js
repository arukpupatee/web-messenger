import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';

//import './App.css';

import { AppNavbar } from './components/AppNavbar';
import { MessengerWindow } from './components/MessengerWindow';

class App extends Component {
  constructor() {
    super();

    const endpoint = 'http://localhost:5000';
    const socket = socketIOClient(endpoint); // connect to socket

    socket.on('login success', loginData => {
      /*
      loginData = {
        data: {
          type: String,
          user: String,
          action: String,
          timestamp: Date
        }
        user: String,
        messageHistory: [ json ] // array of message that format same loginData.data
      }
      */
      this.setState({messageHistory: loginData.messageHistory}); // save message to history
      this.setState({user: loginData.user}); // save user
      socket.emit('new message', loginData.data); // send user joined notification
    });

    this.state = {
      socket: socket,
      endpoint: endpoint,
      user: null,
      messageHistory: []
    };
  }
  /* event handler */
  handleTextInputLoginEnter = e => {
    if (e.key === 'Enter') { // if press Enter at text input
        e.preventDefault();
        var username = this.textInputLogin.value;
        this.login(username); // login request
        this.loginButton.disabled = true; // make user can't login again
    }
  }
  handleButtonLoginSubmit = e => {
    e.preventDefault();
    var username = this.textInputLogin.value;
    this.login(username); // login request
    this.loginButton.disabled = true; // make user can't login again
  }
  login = username => {
    /*
    username = String
    */
    const { socket } = this.state;
    socket.emit('login', username); // send login request
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
            /* if user login -> display MessageWindow */
            ? <MessengerWindow socket={socket} user={user} messageHistory={messageHistory} />
            /* if user doesn't login -> display Login Window */
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
