const router = require('express').Router();
const { Score } = require('../../models');

//get route for testing purposes
router.get('/', async (req, res) => {
    try {
        console.log(req.session.user)
        const scores = await Score.findAll({raw: true})

        res.json(scores)
    } catch(err) {
        console.log(err)
        res.status(500).json()   
    }
})

router.post('/add-score', async (req, res) => {
    try {
        console.log(req.body)

        const newScore = await Score.create(req.body)
        res.status(201).json(newScore)
    } catch(err) {
        console.log(err)
        res.status(500).json()   
    }
})
//add a post route for high scores
module.exports = router