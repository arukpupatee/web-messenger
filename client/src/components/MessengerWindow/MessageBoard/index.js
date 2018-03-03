import React from 'react';
import Moment from 'moment';

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
        var timestamp = Moment(data.timestamp).format('DD/MM/YYYY hh:mm:ss');
        if (data.type === 'message')
            return (<p key={index}>{timestamp} {data.user}: {data.message}</p>);
        else
            return (<p key={index}>{timestamp} {data.user} has {data.action}</p>);
    });
    return (
        <div>
            {line}
        </div>
    );
  }
}