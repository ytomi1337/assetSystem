var express = require('express');
var router = express.Router();
var Category = require('../models/category.js');
const { Sequelize } = require('sequelize');
const { body, validationResult } = require('express-validator')


router.get('/localizations', function(req, res){
    Category.findAll({
    }).then((localizations) =>{
        res.send(localizations)
    })
})

module.exports = router;