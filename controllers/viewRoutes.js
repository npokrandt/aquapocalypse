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
  res.render('game', {
    logged_in: req.session.logged_in,
  })
})

router.get('/high-scores', async (req, res) => {
  const scoreData = await Score.findAll({
    include: User,
    order: [['score', 'DESC']]
  })
  //console.log(scoreData)
  const scores = scoreData.map(score => score.get({ plain: true }))

  for (score in scores){
    
    const rank = parseInt(score) + 1
    console.log(rank)

    scores[score].rank = rank

    if (rank < 11){
      scores[score].top_score = true
    } else {
      scores[score].top_score = false
    }
  }

  console.log(scores)
  res.render('high-scores', { 
    scores,
    logged_in: req.session.logged_in,
   })
})

router.get('/create-account', (req, res) => {
  res.render('create-account')
})

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
