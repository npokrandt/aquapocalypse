const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Score extends Model {}

Score.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: false,
        underscored: true,
        modelName: 'score', 
    }
)

module.exports = Score

//1. limit number of high scores that con be saved (100)
//presumably can grab the lowest current score
//if user beats it, it gets replaced
//4. Set amounts of scores that can be viewed