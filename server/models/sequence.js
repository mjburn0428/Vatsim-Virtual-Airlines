const mongoose = require('mongoose');

const sequenceSchema = mongoose.Schema({
  _id: { type: String, required: true },
  maxContactId: { type: Number, default: 0 },
  maxMessageId: { type: Number, default: 0 },
  maxDocumentId: { type: Number, default: 0 }
});

module.exports = mongoose.model('Sequence', sequenceSchema);
