import React from 'react';
import Moment from 'moment';

import './index.css';

export class MessageBoard extends React.Component {
  constructor(props) {
    /*
    props = {
        socket: object, // for use socket
        messageHistory: [ message ] // array of message history
    }
    */
    super(props);
    this.state = {
        messageList: props.messageHistory // initialize message in board to history
    };

    const socket = props.socket;
    
    socket.on('new message', data => {
        if (this.state.messageList.length > 100) this.state.messageList.shift(); // if message > 100 -> clear older
        this.state.messageList.push(data); // display new message
        this.setState({messageList: this.state.messageList}); // add message to messageList
        this.board.scrollTop = this.board.scrollHeight; // scroll to downsid of board
    });
  }

  render() {
    var { messageList } = this.state;
    /* loop to create each line of message */
    var line = messageList.map((data, index) => {
        let timestamp = Moment(data.timestamp).format('DD/MM/YYYY hh:mm:ss'); // convert timestamp
        if (data.type === 'message') // if message type is message
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
        else // if message type is notification
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