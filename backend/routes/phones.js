var express = require('express');
var router = express.Router();
var Phones = require('../models/phones.js');
const { Sequelize, Op } = require('sequelize');


router.get('/phones', function(req, res){
    Phones.findAll(
    ).then((phones) =>{
        res.send(phones)
    })
})

module.exports = router;