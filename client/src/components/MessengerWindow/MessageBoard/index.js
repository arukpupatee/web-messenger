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
        messageList.push(data);
        this.setState({messageList: messageList});
    });
  }

  render() {
    var { messageList } = this.state;
    var line = messageList.map((data, index) => {
        return (<p key={index}>{data.user}: {data.message}</p>);
    });
    return (
        <div>
            {line}
        </div>
    );
  }
}