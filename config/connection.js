const Sequelize = require('sequelize');
const CopyWebpackPlugin = require("copy-webpack-plugin");

require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}

module.exports = {sequelize,
  plugins:  
      new CopyWebpackPlugin({
        patterns: [
          { from: './src/assets/spritesheets', to : 'assets/spritesheets' }
        ]
      })}
