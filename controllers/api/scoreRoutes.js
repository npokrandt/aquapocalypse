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
        const user_id = req.session.user_id

        const fullObject = {...req.body, user_id}
        const newScore = await Score.create(fullObject)
        res.status(201).json(newScore)
    } catch(err) {
        console.log(err)
        res.status(500).json()   
    }
})
//add a post route for high scores
module.exports = router