import React from 'react';

import { MessageBoard } from './MessageBoard'
import { MessageInput } from './MessageInput'

export class MessengerWindow extends React.Component {
  render() {
    const { socket } = this.props;
    const { user } = this.props;
    return (
        <div>
            <MessageBoard socket={socket} />
            <MessageInput socket={socket} user={user} />
        </div>
    );
  }
}