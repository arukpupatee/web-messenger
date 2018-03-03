import React from 'react';

export class MessageInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }
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
    socket.emit('new message', message);
  }

  render() {
    return (
        <div>
            <input 
                type="text" 
                ref={input => { this.textInput = input }} 
                onKeyPress={this.handleTextInputEnter}
            />
            <button type="button" onClick={this.handleButtonSubmit}>Send</button>
        </div>
    );
  }
}