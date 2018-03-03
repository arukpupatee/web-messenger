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

messagesSchema.statics.findLast = function (n) {
    var query = this.find({}).sort({timestamp: 'desc'}).limit(n).lean();
    return new Promise((resolve, reject) =>{
        query.exec((err, results) =>{
            if (err) reject(error);

            resolve(results.reverse());
        });
    });
}

const Messages = mongoose.model('Messages', messagesSchema, 'Messages');

module.exports = Messages;