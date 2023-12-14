const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  question: String,
  answer: String,
  category: String,
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
