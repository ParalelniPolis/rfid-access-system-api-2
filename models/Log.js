const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * @typedef {Object} logSchema
 * @property {string} lock_id - ID of the lock
 * @property {string} card_id - ID of the card
 * @property {boolean} success - If a request was successful
 * @property {boolean} new_card - If it was a new card
 */

/**
 * Creates new logSchema
 * @class
 */
const logSchema = new Schema({
  lock_id: String,
  card_id: String,
  success: Boolean,
  new_card: Boolean
}, { timestamps: true });

const Log = mongoose.model('Log', logSchema);

module.exports = Log;
