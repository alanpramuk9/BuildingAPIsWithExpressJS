const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes');
const path = require('path');
//const client = require('../client');

let app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false })); //JSONs XML content-type
app.use(express.static(path.join(__dirname, '../client'))); //goes to client folder

app.use('/api', apiRoutes);





app.listen(3000);