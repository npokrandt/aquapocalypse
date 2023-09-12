const User = require('./User');
const Score = require('./Scores')

//associations, if any
User.hasMany(Score, {foreignKey: 'user_id'})

Score.belongsTo(User, {foreignKey: 'user_id'})

module.exports = { User, Score };
