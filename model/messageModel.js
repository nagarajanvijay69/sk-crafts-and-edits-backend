const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
     message : String
});

const messageModel = mongoose.model('messageModel', messageSchema);

module.exports = messageModel;
