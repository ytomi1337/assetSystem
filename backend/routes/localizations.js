var express = require('express');
var router = express.Router();
var Localization = require('../models/localization.js');
const { Sequelize } = require('sequelize');
const { body, validationResult } = require('express-validator')


router.get('/localizations', function(req, res){
    Localization.findAll({
        order: [['name', 'asc']]
    }).then((localizations) =>{
        res.send(localizations)
    })
})

module.exports = router;