const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cardSchema = new Schema({
  uid: { type: String, unique: true },
  name: String,
  description: String,
  locks: [{ type: Schema.Types.ObjectId, ref: 'Lock' }]
}, { timestamps: true });

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
