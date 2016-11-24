const Lock = require('../models/Lock');
const Card = require('../models/Card');

/**
 * GET /locks
 * Locks page.
 */
exports.index = (req, res, next) => {
  if (!req.user) {
    return res.redirect('/login');
  }

  Lock.find((err, locks) => {
    if (err) return next(err);

    if (locks.length === 0) locks = null;

    res.render('locks', {
      title: 'Locks',
      locks
    });
  });
};

/**
 * GET /cards/:id
 * Card detail page.
 */
exports.showLock = (req, res, next) => {
  if (!req.user) {
    return res.redirect('/login');
  }

  Lock.findOne({ uid: req.params.id }, (err, lock) => {
    if (err) return next(err);

    Card.find({ locks: lock._id }, (err, cards) => {
      if (err) return next(err);

      res.render('lock', {
        title: `Lock ${lock.name}`,
        lock,
        cards
      });
    });
  });
};

/**
 * POST /locks
 * Create new lock.
 */
exports.postLock = (req, res, next) => {
  if (!req.user) {
    return res.redirect('/login');
  }

  req.assert('uid').notEmpty();
  req.assert('name').notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/locks');
  }

  const lock = new Lock({
    uid: req.body.uid,
    name: req.body.name,
    description: req.body.description
  });

  Lock.findOne({ uid: req.body.uid }, (err, existingLock) => {
    if (err) { return next(err); }
    if (existingLock) {
      req.flash('errors', { msg: 'This lock already exists' });
      return res.redirect('/locks');
    }

    lock.save((err) => {
      if (err) { return next(err); }

      req.flash('success', { msg: 'Lock created successfully.' });

      res.redirect('/locks');
    });
  });
};

/**
 * GET /locks/delete/:id
 * Delete lock.
 */
exports.deleteLock = (req, res, next) => {
  if (!req.user) {
    return res.redirect('/login');
  }

  Lock.findOneAndRemove({ uid: req.params.id }, (err) => {
    if (err) { return next(err); }

    req.flash('success', { msg: 'Lock deleted successfully.' });

    res.redirect('/locks');
  });
};
