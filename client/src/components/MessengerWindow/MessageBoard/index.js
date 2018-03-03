import React from 'react';

export class MessageBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        messageList: []
    };

    const socket = props.socket;
    var { messageList } = this.state
    socket.on('new message', data => {
        if (messageList.length > 100) messageList.shift();
        messageList.push(data.message);
        this.setState({messageList: messageList});
    });
  }

  render() {
    var { messageList } = this.state;
    var line = messageList.map((message, index) => {
        return (<p key={index}>{message}</p>);
    });
    return (
        <div>
            {line}
        </div>
    );
  }
}