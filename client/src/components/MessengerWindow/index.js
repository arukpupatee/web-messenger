import React from 'react';

import { MessageBoard } from './MessageBoard'
import { MessageInput } from './MessageInput'

export class MessengerWindow extends React.Component {
  /*
  props = {
    socket: object, // for use socket
    user: String,
    messageHistory: [ message ] // array of message history
  }
  */
  render() {
    const { socket } = this.props;
    const { user } = this.props;
    const { messageHistory } = this.props;
    return (
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-lg-12'>
              <div className='jumbotron'>
                <h1 className='display-4'>Web Messenger</h1>
                <p>Login as {user}</p>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-lg-12'>
              <MessageBoard socket={socket} messageHistory={messageHistory} />
            </div>
          </div>
          <div className='row'>
            <div className='col-lg-12'>
              <MessageInput socket={socket} user={user} />
            </div>
          </div>
          <br />
        </div>
    );
  }
}