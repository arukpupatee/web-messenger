var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messagesSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    message: {
        type: String
    },
    action: {
        type: String
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const Messages = mongoose.model('Messages', messagesSchema, 'Messages');

module.exports = Messages;