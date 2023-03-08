require('dotenv').config();
const config = module.exports = {};
//
config.NODE_ENV = process.env.NODE_ENV || 'production';
config.HOST = process.env.HOST || 'localhost';
config.PORT = process.env.PORT || '8001';
config.DOMAIN_SSL = process.env.DOMAIN_SSL || '';
config.API_URL = process.env.API_URL || 'htttp://121.0.0.1:9000';
config.MYSQL_DIALECT = process.env.MYSQL_ENGINE || 'mysql';
config.MYSQL_HOST = process.env.MYSQL_HOST || 'localhost';
config.MYSQL_PORT = process.env.MYSQL_PORT || '3306';
config.MYSQL_USER = process.env.MYSQL_USER || 'root';
config.MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || '';
config.MYSQL_DATABASE = process.env.MYSQL_DATABASE || '';
config.MYSQL_TIMEZONE = process.env.MYSQL_TIMEZONE || '-04:00';
config.TZ = process.env.TZ || 'America/Sao_Paulo';
//
// console.log("- Variaveis de ambente");
//console.log(config);