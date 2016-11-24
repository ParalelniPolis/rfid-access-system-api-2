const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const lockSchema = new Schema({
  uid: { type: String, unique: true },
  name: String,
  description: String
}, { timestamps: true });

const Lock = mongoose.model('Lock', lockSchema);

module.exports = Lock;
