const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
const configDb = require('../config/database');
const { logger } = require("../utils/logger");
const config = require('../config.global');

const sequelize = new Sequelize(configDb);
const db = {};

const initApp = async () => {
  await sequelize.authenticate().then(async () => {
    logger.info('- Conexão estabelecida com sucesso!');
  }).catch(async (err) => {
    logger.error('- Não foi possível conectar ao banco de dados:', err);
	});
};
//
fs.readdirSync(__dirname)
	.filter(file => (file.indexOf('.') !== 0) && (file !== path.basename(__filename)) && (file.slice(-3) === '.js'))
	.forEach((file) => {
		const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
		db[model.name] = model;
	});
//
Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});
//
db.sequelize = sequelize;
db.Sequelize = Sequelize;

if (parseInt(config.VALIDATE_MYSQL) == true) {
	initApp();
}

module.exports = db;