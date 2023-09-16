const router = require('express').Router();
const { Score } = require('../../models');
const { sequelize } = require('../../models/Scores');

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

router.get('/score-count', async (req, res) => {
    try {
        const scoreCount = await Score.findAll({
            attributes: [[sequelize.fn('COUNT', sequelize.col('score')), 'score_count']],
            raw: true
        })

        res.json(scoreCount)
    } catch(err) {
        console.log(err)
        res.status(500).json()   
    }
})

router.get('/lowest-score', async (req, res) => {
    try {
        const orderedScores = await Score.findAll({
            order: [['score', 'ASC']],
            raw: true
        })

        const lowestScoreObj = {
            score: orderedScores[0].score,
            id: orderedScores[0].id
        }
        res.json(lowestScoreObj)
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

router.put('/update-score/:id', async (req, res) => {
    try {
        const score_id = req.params.id
        const user_id = req.session.user_id
        const score = req.body.score

        const updatedScore = await Score.update({
            user_id,
            score
        },
        {
            where: {
                id: score_id
            }
        })
        res.status(200).json(updatedScore)
    } catch(err) {
        console.log(err)
        res.status(500).json()   
    }
})
//add a post route for high scores
module.exports = router