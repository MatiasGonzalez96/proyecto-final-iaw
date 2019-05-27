const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const scraper = require('./scraper');

app.get('/', (req, res) => {
    res.json({
        message: 'BackEnd Funcionando!'
    });
});

app.get('/phones', (req, res) => {
    scraper
        .searchPhones()
        .then(phones => {
            res.json(phones);
        });
});

app.get('/phones/:id', (req, res) => {
    scraper
        .searchPhoneDetails(req.params.id)
        .then(phone => {
            res.json(phone);
        });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Listening on ${port}`);
});