var express = require('express');
var router = express.Router();
var Asset = require('../models/assets.js');
const { Sequelize } = require('sequelize');

router.get('/assets', function(req, res){
    Asset.findAll({}).then((asset) => {res.send(asset)})
})

router.get('/assets/:id', function(req, res){
    Asset.findByPk(Number(req.params.id)).then((asset) => {
        res.send(asset)
    })
})

module.exports = router;