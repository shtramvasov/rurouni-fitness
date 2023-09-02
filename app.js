const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const router = require('./routes/v1/index');
const pg = require('pg');
require('dotenv').config();

const API_PORT = process.env.API_PORT;
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan('short'));
pg.types.setTypeParser(1082, value => value)

// router
app.use('/api/v1', router);

app.listen(API_PORT, () => {
	console.log(`Sever is listering on port: ${API_PORT}`);
});
