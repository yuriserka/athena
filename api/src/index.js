const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

const PORT = process.env.PORT || 8083

const vue_dist = path.join(__dirname + '/../', '../', 'front/', 'dist/')

app.use('/', express.static(vue_dist))
app.use('/api/news', require('./routes/news'))

app.listen(PORT, () => { console.log(`Server started on http://localhost:${PORT}/`) })