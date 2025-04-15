var express = require('express');
var router = express.Router();
var Localization = require('../models/localization.js');
const { Sequelize, where } = require('sequelize');
const { body, validationResult } = require('express-validator')


router.get('/localizations', function(req, res){
    Localization.findAll({
        order: [['name', 'asc']]
    }).then((localizations) =>{
        res.send(localizations)
    })
})

router.post('/localizations/:name', function(req, res){
    const { name } = req.params;
    console.log(object);
     Localization.create({
        name
    }).then((localization)=>{
        res.status(200).json({ message: "Localization added corectly: ", localization})
    }).catch((error)=>{
        return res.status(500).json({message: "Wystapił błąd podczas dodawania Lokalizacji", error})
    })
})

router.delete('/localizations/:name',  function(req, res){
    const { name } = req.params;
    Localization.destroy({
        where: { name }
    }).then((localization)=>{
        res.status(200).json({ message: "Localization added corectly: ", localization})
    }).catch((error)=>{
        return res.status(500).json({message: "Wystapił błąd podczas dodawania Lokalizacji", error})
    })
})

module.exports = router;