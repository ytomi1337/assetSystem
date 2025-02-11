var express = require('express');
var router = express.Router();
var Status = require('../models/status.js');
const { Sequelize } = require('sequelize');
const { body, validationResult } = require('express-validator')


router.get('/status', function(req, res){
    Status.findAll({

    }).then((status) =>{
        res.send(status)
    }).catch((error)=>{
        res.send(error.msg)
        console.log(error)
    })
})

module.exports = router;