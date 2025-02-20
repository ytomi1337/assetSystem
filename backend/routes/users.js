var express = require('express');
var router = express.Router();
var Users = require('../models/users.js');
const { Sequelize, Op } = require('sequelize');
const { body, validationResult } = require('express-validator')


router.get('/users', function(req, res){
    const whereClause = {}; // Tworzymy pusty obiekt warunków

if (req.query.userName != undefined) { // Sprawdzamy, czy userName jest podane
    whereClause.name = {
        [Op.iLike]: req.query.userName + '%'
    };
}
    Users.findAll({
        where: whereClause
    }).then((users) =>{
        res.send(users)
    }).catch((error)=>{
        res.send(error.msg)
        console.log(error)
    })
})

module.exports = router;