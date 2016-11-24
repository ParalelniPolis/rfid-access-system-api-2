const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const logSchema = new Schema({
  lock_id: String,
  card_id: String,
  success: Boolean,
  new_card: Boolean
}, { timestamps: true });

const Log = mongoose.model('Log', logSchema);

module.exports = Log;
