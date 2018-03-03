import React, { Component } from 'react';
import socketIOClient from "socket.io-client";
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      message: false,
      endpoint: "http://localhost:5000"
    };
  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("new message", data => this.setState({ message: data.message}));
  }
  render() {
    const { message } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Web Messenger</h1>
        </header>
        <p className="App-intro">
          Web Messenger for FireOneOne Interview
        </p>
        { message
          ? <p> { message } </p>
          : <p> Loading </p>
        }
      </div>
    );
  }
}

export default App;
