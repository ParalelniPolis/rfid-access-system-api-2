const Card = require('../models/Card');
const Lock = require('../models/Lock');

/**
 * Private render function
 * Card detail
 */
const renderDetail = (res, card, locks) => {
  res.render('card', {
    title: `Card: ${card.name}`,
    card,
    locks
  });
};

/**
 * GET /cards
 * Cards page.
 */
exports.index = (req, res, next) => {
  if (!req.user) {
    return res.redirect('/login');
  }

  Card.find()
    .populate('locks')
    .exec((err, cards) => {
      if (err) return next(err);

      if (cards.length === 0) cards = null;

      res.render('cards', {
        title: 'Cards',
        cards
      });
    });
};

/**
 * GET /cards/:id
 * Card detail page.
 */
exports.showCard = (req, res, next) => {
  if (!req.user) {
    return res.redirect('/login');
  }

  Card.findOne({ uid: req.params.id })
    .populate('locks')
    .exec((err, card) => {
      if (err) return next(err);

      Lock.find((err, locks) => {
        if (!card) {
          const newCard = new Card({
            uid: req.params.id,
            name: '',
            description: '',
            locks: []
          });

          newCard.save((err, card) => {
            if (err) return next(err);

            req.flash('success', { msg: 'Card created successfully.' });

            renderDetail(res, card, locks);
          });
        } else {
          // Create new Array of locks which can be modified
          let allLocks;
          let locksWithAssigned = locks;
          if (card.locks) {
            allLocks = locks.map(lock => Object.assign({}, lock._doc));
            locksWithAssigned = allLocks.map((lock) => {
              lock.assigned = !!card.locks.find(cardLock => cardLock.uid === lock.uid);
              return lock;
            });
          }

          renderDetail(res, card, locksWithAssigned);
        }
      });
    });
};

/**
 * POST /cards/:id
 * Card detail update.
 */
exports.updateCard = (req, res, next) => {
  if (!req.user) {
    return res.redirect('/login');
  }

  req.assert('name').notEmpty();

  Card.findOneAndUpdate({ uid: req.params.id }, {
    $set: {
      name: req.body.name,
      description: req.body.description,
      locks: req.body.locks || []
    }
  }, (err) => {
    if (err) return next(err);

    req.flash('success', { msg: 'Card updated successfully.' });

    res.redirect('/cards/');
  });
};

/**
 * GET /cards/delete/:id
 * Delete card
 */
exports.deleteCard = (req, res, next) => {
  if (!req.user) {
    return res.redirect('/login');
  }

  Card.findOneAndRemove({ uid: req.params.id }, (err) => {
    if (err) return next(err);

    req.flash('success', { msg: 'Card deleted successfully.' });

    res.redirect('/cards');
  });
};
