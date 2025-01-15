var express = require('express');
var router = express.Router();
var Asset = require('../models/assets.js');
const { Sequelize } = require('sequelize');


router.get('/assets', function(req, res){
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 3
    const sortKey = req.query.sortKey || 'id'
    const sortValue = req.query.sortValue || 'asc'
    // Asset.findAll({}).then((asset) => {res.send(asset)})

    Promise.all([
        Asset.count(),
        Asset.findAll({
            offset: (page -1) * limit,
            limit: (limit),
            order: [ [sortKey, sortValue] ]
        })
    ])
    .then(([count, assets]) => {
        res.send({
            count: count,
            assets: assets
        })
    })
})

router.get('/assets/:id', function(req, res){
    Asset.findByPk(Number(req.params.id)).then((asset) => {
        res.send(asset)
    })
})
//
module.exports = router;