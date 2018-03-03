import React from 'react';
import socketIOClient from 'socket.io-client';

export class MessageBoard extends React.Component {
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
        <div>
            { message
                ? <p> { message } </p>
                : <p> Loading </p>
            }
        </div>
    );
  }
}