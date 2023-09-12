const sequelize = require('../config/connection');
const { User, Score } = require('../models');


const userData = require('./userData.json');
const scoresData = require('./scoresData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  let users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
    raw: true,
  });
  users = users.map(user => user.dataValues)
  console.log(users)
  for (const score of scoresData) {
    const randomIndex = Math.floor(Math.random()*users.length)
    const randomUserID = users[randomIndex].id
    await Score.create({...score, user_id: randomUserID})
  }
  process.exit(0);
};

seedDatabase();
