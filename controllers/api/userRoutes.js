const router = require('express').Router();
const { User } = require('../../models');
//const scoresData = require('../../seeds/scoresData.json')

router.post('/login', async (req, res) => { 
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.post('/create-account', async (req, res) => {
  console.log("Inside POST /api/create-account")
  const { email, username, password } = req.body
  
  if (!email || !username || !password) { 
    return res.status(400).json('you need an email, username, and password to create an account')
  }

  try {
    const userData = await User.create({
      email,
      name: username,
      password,
    })
    //console.log('User created:', userData)
    res.status(201).json('User created!')
  } catch (err) {
    console.error("Error while creating account:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
})

module.exports = router;
