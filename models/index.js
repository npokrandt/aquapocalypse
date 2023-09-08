const User = require('./User');
const Player = require('./Player')
const Enemy = require('./Enemy')

//associations, if any
User.hasOne(Player, {foreignKey: 'user_id'})

Player.belongsTo(User, {foreignKey: 'user_id'})

module.exports = { User, Player, Enemy };
