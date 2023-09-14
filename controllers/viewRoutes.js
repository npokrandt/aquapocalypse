const router = require('express').Router();
const { User, Score } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],
    });

    const users = userData.map((project) => project.get({ plain: true }));

    res.render('homepage', {
      users,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/game', (req, res) => {
  res.render('game')
})

router.get('/high-scores', async (req, res) => {
  const scoreData = await Score.findAll({
    include: User,
    order: [['score', 'DESC']]
  })
  const scores = scoreData.map(score => score.get({ plain: true }))
  console.log(scores)
  res.render('high-scores', { scores })
})

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
