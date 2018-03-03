import React from 'react';

export class MessageBoard extends React.Component {
  constructor(props) {
    super(props);

    const socket = props.socket;
    socket.on('new message', data => {this.setState({ message: data.message})});
    
    this.state = {
        message: false,
    };
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