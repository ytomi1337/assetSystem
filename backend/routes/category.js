var express = require('express');
var router = express.Router();
var Category = require('../models/category.js');
const { Sequelize } = require('sequelize');
const { body, validationResult } = require('express-validator')


router.get('/categories', function(req, res){
    Category.findAll({
    }).then((categories) =>{
        res.send(categories)
    })
})

module.exports = router;