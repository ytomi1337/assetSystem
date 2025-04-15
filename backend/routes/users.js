var express = require('express');
var router = express.Router();
var Users = require('../models/users.js');
const { Sequelize, Op } = require('sequelize');
const { body, validationResult } = require('express-validator')


router.get('/users', function(req, res){
    const whereClause = {};

if (req.query.userName != undefined) { 
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

router.post('/users', async (req,res)=>{
    try{
       await Users.create({
        name: req.body.name,
        profession: req.body.profession,
        department: req.body.department
    }).then((user)=>{
            res.status(200).json({ message: "User added corectly: ", user})
        }).catch((error)=>{
            return res.status(500).json({message: "Errror while adding a user", error})
        })
    }catch(error){
        console.log('Error podczas dodawania Użytkownika: ', error);
    }
})

module.exports = router;