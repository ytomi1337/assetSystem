var express = require('express');
var router = express.Router();
var Logs = require('../models/activitylog');
const { Sequelize } = require('sequelize');
const { body, validationResult } = require('express-validator')


router.get('/logs', (req, res) =>{
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 20
    const sortKey = req.query.sortKey || 'id'
    const sortValue = req.query.sortValue || 'asc'

    try{
        Promise.all([
            Logs.count(),
            Logs.findAll({
                offset: (page -1) * limit,
                limit: (limit),
                order: [ [sortKey, sortValue] ]
            })
        ]).then(([count, logs]) => {
            res.send({
                count: count,
                logs: logs
            })
        })
    }catch(error){
        console.error("Błąd podczas pobierania logów: ", error);

        res.status(500).json({ message: 'Błąd podczas pobierania logów: ', error: error})
    }
    
})

module.exports = router;