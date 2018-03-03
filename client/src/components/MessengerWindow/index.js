import React from 'react';

import { MessageBoard } from './MessageBoard'
import { MessageInput } from './MessageInput'

export class MessengerWindow extends React.Component {
  render() {
    const { socket } = this.props;
    return (
        <div>
            <MessageBoard socket={socket} />
            <MessageInput socket={socket} />
        </div>
    );
  }
}