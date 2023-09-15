const router = require('express').Router();
const userRoutes = require('./userRoutes');
const scoreRoutes = require('./scoreRoutes')

router.use('/users', userRoutes);
router.use('/scores', scoreRoutes)

module.exports = router;
