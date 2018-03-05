import React from 'react';

export class MessageInput extends React.Component {
  /*
  props = {
    socket: object, // for use socket
    user: String
  }
  */
  /* event handler */
  handleTextInputEnter = e => {
    if (e.key === 'Enter') { // if press Enter at text input
        e.preventDefault();
        var message = this.textInput.value;
        this.submitMessage(message); // send message
        this.textInput.value = ''; // clear message input
    }
  }
  handleButtonSubmit = e => {
    e.preventDefault();
    var message = this.textInput.value;
    this.submitMessage(message); // send message
    this.textInput.value = ''; // clear message input
  }
  submitMessage = message => {
    /*
    message = String
    */
    const { socket } = this.props;
    const { user } = this.props;
    const data = {
      type: 'message',
      user: user,
      message: message
    }
    socket.emit('new message', data); // send message to server
  }

  render() {
    return (
        <div className='input-group input-group-lg'>
          <input 
            className='form-control' aria-label='Username' aria-describedby='basic-addon1'
            type='text' 
            ref={input => { this.textInput = input }} 
            onKeyPress={this.handleTextInputEnter}
          />
          <button type='button' className='btn btn-primary' onClick={this.handleButtonSubmit}>Send</button>
        </div>
    );
  }
}