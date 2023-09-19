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

    const loggedInUser = await User.findByPk(req.session.user_id, {
      raw: true
    })

    res.render('homepage', {
      users,
      loggedInUser,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/game', withAuth, (req, res) => {
  res.render('game', {
    logged_in: req.session.logged_in,
  })
})

//add data that will tell which page we on
router.get('/high-scores', withAuth, async (req, res) => {
  const scoreData = await Score.findAll({
    include: User,
    order: [['score', 'DESC']]
  })

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
    is_on_high_score_page: true,
   })
})

router.get('/create-account', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('create-account')
})

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login', {
    is_on_login_page: true
  });
});

module.exports = router;
