const Log = require('../models/Log');

/**
 * GET /access-log
 * Access Log page.
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
