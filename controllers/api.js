const Log = require('../models/Log');
const Card = require('../models/Card');

/**
 * Function for creating response objects
 */
const makeResponseObject = (lockName, canAccess) => {
  const data = {};
  data[lockName] = canAccess === true;
  return data;
};

/**
 * GET /api/v1/access
 * Access API.
 */
exports.index = (req, res, next) => {
  if (!req.query.lock) {
    const error = new Error('Missing required query parameter: "lock"');
    error.status = 400;
    return next(error);
  }

  if (!req.query.card) {
    const error = new Error('Missing required query parameter: "card"');
    error.status = 400;
    return next(error);
  }

  const lockId = req.query.lock;
  const cardId = req.query.card;

  Card.findOne({ uid: cardId })
    .populate('locks')
    .exec((err, card) => {
      if (err) { return next(err); }

      // If card is not in system, return false answer
      if (!card) {
        // Create log information
        const log = new Log({
          lock_id: lockId,
          card_id: cardId,
          success: false,
          new_card: true
        });

        // Save log information
        log.save(err => next(err));

        // Return false answer
        return res.json(makeResponseObject(lockId, false));
      }

      // Check if card can access requested lock
      const canAccess = !!card.locks.find(lock => lock.uid === lockId);

      // Create log information
      const log = new Log({
        lock_id: lockId,
        card_id: cardId,
        success: canAccess,
        new_card: false
      });

      // Save log information
      log.save(err => next(err));

      // Return answer
      res.json(makeResponseObject(lockId, canAccess));
    });
};
