'use strict';
// https://stackoverflow.com/questions/39489229/pass-variable-to-html-template-in-nodemailer
// https://javascript.plainenglish.io/nodemailer-custom-dynamic-email-templates-with-html-css-and-handlebars-9b72283575d9
const express = require('express');
require('express-async-errors');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const path = require('path');
const config = require('./config.global');
const { logger } = require('./utils/logger');
const http = require('http').Server(app);
const https = require('https');
const axios = require('axios');
const request = require('request-promise');
const superagent = require('superagent');
const agent = new https.Agent({
	rejectUnauthorized: false
});
//
const {
	yo
} = require('yoo-hoo');
//
yo('Api Routes', {
	color: 'rainbow',
	spacing: 1,
});
//
// ------------------------------------------------------------------------------------------------//
//
try {
	//
	// Body Parser
	app.use(cors());
	app.use(bodyParser.json({
		limit: '50mb',
		type: 'application/json'
	}));
	//
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	//
	// Express Parser
	app.use(express.json({
		limit: '50mb',
		extended: true
	}));
	//
	app.use(express.urlencoded({
		limit: '50mb',
		extended: true,
		parameterLimit: 50000
	}));
	//
	app.use((err, req, res, next) => {
		//
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		res.header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');
		//
		if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
			//
			if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
				//
				//console.error(err);
				res.setHeader('Content-Type', 'application/json');
				return res.status(404).json({
					"Status": {
						"error": true,
						"status": 404,
						"message": "Json gerado de forma incorreta, efetue a correção e tente novamente"
					}
				});
			}
			//
		}
		//
		next();
	});
	// Rotas
	app.get('/', function (req, res) {
		res.sendFile(path.join(__dirname, '/view.html'));
	});
	//
	app.post('/receberformulario', async (req, res, next) => {
		//

		//
	});
	//
	app.post('/enviawhatsapp', async (req, res, next) => {
		//
		let originalUrl = req?.originalUrl;
		let requestBody = req?.body;
		let apiUrlBase = `${originalUrl}`;
		let apiUrl = `${config.API_URL}/${requestBody?.SessionName}`;
		let apiUrlRequest = `${config.API_URL}/${requestBody?.SessionName}${apiUrlBase}`;
		//
		logger?.info(`- SessionName: ${requestBody?.SessionName}`);
		logger?.info(`- Request Url: ${apiUrl}`);
		logger?.info(`- Request Base: ${apiUrlBase}`);
		logger?.info(`- Request: ${apiUrlRequest}`);
		//
		/*
		await axios.post(`${apiUrlRequest}`, requestBody, {
			httpsAgent: agent,
			maxContentLength: 50000000 // 100 MB
		}).then(async (response) => {
			//
			logger?.info(response);
			//res.setHeader('Content-Type', 'application/json');
			//res.status(response.status).json(response.data);
			//
		}).catch(async (error) => {
			//
			logger?.error(error);
			//res.setHeader('Content-Type', 'application/json');
			//res.status(error.response.status).json(error.response.data);
			//
		});
		//
		let options = {
			'method': 'POST',
			"rejectUnauthorized": false,
			'json': true,
			'url': `${apiUrlRequest}`,
			'timeout': 120000, // 10 seconds
			'headers': {
				'Content-Type': 'application/json',
				'Content-Length': 100
			},
			body: requestBody
		};
		request(options).then(async (response) => {
			//
			logger?.info(response);
			//let statusCode = response.statusCode;
			//res.setHeader('Content-Type', 'application/json');
			//res.status(statusCode).json(body);
			//
		}).catch(async (error) => {
			//
			logger?.error(error);
			//let statusCode = error.statusCode;
			//res.setHeader('Content-Type', 'application/json');
			//res.status(statusCode).json(error.response.body);
			//
		});
		*/
		//
		logger?.info('=====================================================================================================');
		//
		superagent.post(apiUrlRequest)
			.send(requestBody)
			.set('Content-Type', 'application/json')
			.end(async (error, response) => {
				if (error) {
					logger?.error(error.message);
				}
				//
				res.setHeader('Content-Type', 'application/json');
				res.status(response.statusCode).json(response.body);
				//
			});
		//
	});
	//
	http.listen(config.PORT, config.HOST, async function (err) {
		if (err) {
			logger?.error(err);
		} else {
			const host = http.address().address;
			const port = http.address().port;
			if (config.DOMAIN_SSL) {
				logger?.info(`- HTTP Server running on`);
				logger?.info(`- To start: https://${config.DOMAIN_SSL}/Start`);
				logger?.info(`- To doc: https://${config.DOMAIN_SSL}/api-doc`);
			} else {
				logger?.info(`- HTTP Server running on`);
				logger?.info(`- To start: http://${config.HOST}:${config.PORT}/Start`);
				logger?.info(`- To doc: http://${config.HOST}:${config.PORT}/api-doc`);
			}

		}
		//
		logger?.info('=====================================================================================================');
		//
	});
	//
	//
} catch (erro) {
	logger?.error('- Não foi fossivel iniciar o sistema');
	logger?.error(erro);
	process.exit(1);
}
//
process.stdin.resume(); //so the program will not close instantly
//
async function exitHandler(options, exitCode) {

	if (options.cleanup) {
		logger?.info("- Cleanup");
	}

	if (exitCode || exitCode === 0) {
		logger?.info(exitCode);
	}
	//
	if (options.exit) {
		process.exit();
	}
} //exitHandler
//
// ------------------------------------------------------------------------------------------------//
//
//
//do something when sistema is closing
process.on('exit', exitHandler.bind(null, {
	cleanup: true
}));
//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {
	exit: true
}));
// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null, {
	exit: true
}));
process.on('SIGUSR2', exitHandler.bind(null, {
	exit: true
}));
//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {
	exit: true
}));
//
// ------------------------------------------------------------------------------------------------//
//