import React from 'react';
import Moment from 'moment';

export class MessageBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        messageList: []
    };

    const socket = props.socket;
    socket.emit('fetch history');
    socket.on('fetch history', history => this.setState({messageList: history}));
    socket.on('new message', data => {
        if (this.state.messageList.length > 100) this.state.messageList.shift();
        this.state.messageList.push(data);
        this.setState({messageList: this.state.messageList});
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