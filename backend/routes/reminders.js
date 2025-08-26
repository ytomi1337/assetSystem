var express = require('express');
var router = express.Router();

const db = require('../models');
const Reminders = db.reminders; 
const { Sequelize, Op, where } = require('sequelize');


router.get('/reminders', function(req, res){
    Reminders.findAll({

    }).then((reminder) =>{
        res.send(reminder)
    }).catch((error)=>{
        res.send(error.msg)
        console.log(error)
    })
})

router.post('/reminders', function(req, res){
    Reminders.create({
        title: req.body.title,
        author: req.body.author,
        content: req.body.content,
        expiryDate: req.body.expiryDate,
    }).then((reminder) =>{
        res.send(reminder)
    }).catch((error)=>{
        res.send(error.msg)
        console.log(error)
    })
})

router.delete('/reminders/:id', function(req, res) {
    Reminders.destroy({
        where: {
            id: Number(req.params.id)
        }
    })
    .then((response) => {
        res.send({ message: 'success', response });
    })
    .catch((error) => {
        res.status(500).send({ message: 'error', error });
    });
});


module.exports = router;