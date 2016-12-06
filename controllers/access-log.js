const Log = require('../models/Log');

/**
 * Log module.
 * @module controllers/access-log
 */

/**
 * GET /access-log - Access Log page.
 * @param  {Object} req - Express Request Object
 * @param  {Object} res - Express Response Object
 * @param  {Function} next - Express Middleware Function
 */
exports.index = (req, res, next) => {
  Log.find((err, logs) => {
    if (err) { return next(err); }

    // Reverse access log
    logs.reverse();

    if (logs.length === 0) logs = null;

    res.render('access-log', {
      title: 'Access Log',
      logs
    });
  });
};
