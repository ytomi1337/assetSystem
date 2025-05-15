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

router.post('/status/:name', function(req, res){
    const { name } = req.params;
    Status.create({
        name
    }).then((status)=>{
        res.status(200).json({ message: "Status added correctly: ", status})
    }).catch((error)=>{
        return res.status(500).json({message: "Wystapił błąd podczas dodawania Lokalizacji", error})
    })
})

router.delete('/status/:name',  function(req, res){
    const { name } = req.params;
    Status.destroy({
        where: { name }
    }).then((status)=>{
        res.status(200).json({ message: "Status added correctly: ", status})
    }).catch((error)=>{
        return res.status(500).json({message: "Wystapił błąd podczas dodawania Lokalizacji", error})
    })
})

module.exports = router;