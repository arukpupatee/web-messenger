import React from 'react';
import Moment from 'moment';

import './index.css';

export class MessageBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        messageList: []
    };

    const socket = props.socket;
    socket.emit('fetch history');
    socket.on('fetch history', history => {
        this.setState({messageList: history})
        this.board.scrollTop = this.board.scrollHeight;
    });
    socket.on('new message', data => {
        if (this.state.messageList.length > 100) this.state.messageList.shift();
        this.state.messageList.push(data);
        this.setState({messageList: this.state.messageList});
        this.board.scrollTop = this.board.scrollHeight;
    });
  }

  render() {
    var { messageList } = this.state;
    var line = messageList.map((data, index) => {
        var timestamp = Moment(data.timestamp).format('DD/MM/YYYY hh:mm:ss');
        if (data.type === 'message')
            return (
                <div className='row' key={index}>
                    <div className='col-md-2 timestamp'>
                        {timestamp}
                    </div>
                    <div className='col-sm-10'>
                        <span className='username'>{data.user}</span>: {data.message}
                    </div>
                </div>
            );
        else
            return (
                <div className='row info' key={index}>
                    <div className='col-md-2 timestamp'>
                        {timestamp}
                    </div>
                    <div className='col-md-10'>
                        <span className={data.action}>{data.user} has {data.action}</span>
                    </div>
                </div>
            );
    });
    return (
        <div
            className='jumbotron jumbotron-fluid boardScroll' 
            ref={div => { this.board = div }} 
        >
            {line}
        </div>
    );
  }
}