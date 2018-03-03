import React from 'react';

export class MessageInput extends React.Component {
  handleTextInputEnter = e => {
    if (e.key === 'Enter') {
        e.preventDefault();
        var message = this.textInput.value;
        this.submitMessage(message);
        this.textInput.value = '';
    }
  }
  handleButtonSubmit = e => {
    e.preventDefault();
    var message = this.textInput.value;
    this.submitMessage(message);
    this.textInput.value = '';
  }
  submitMessage = message => {
    const { socket } = this.props;
    const { user } = this.props;
    const data = {
      type: 'message',
      user: user,
      message: message
    }
    socket.emit('new message', data);
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