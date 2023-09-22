const User = require('./User');
const Score = require('./Scores')

//associations
User.hasMany(Score, {foreignKey: 'user_id'})

Score.belongsTo(User, {foreignKey: 'user_id'})

module.exports = { User, Score };
