var express = require('express');
var router = express.Router();
var Asset = require('../models/assets.js');
const { Sequelize } = require('sequelize');


router.get('/assets', function(req, res){
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 3
    const sortKey = req.query.sortKey || 'id'
    const sortValue = req.query.sortValue || 'asc'

    Promise.all([
        Asset.count(),
        Asset.findAll({
            offset: (page -1) * limit,
            limit: (limit),
            order: [ [sortKey, sortValue] ]
        })
    ]).then(([count, assets]) => {
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

router.post('/assets', function(req, res){
    Asset.create({
        name: req.body.name,
        it_num: req.body.it_num,
        serialnum: req.body.serialnum,
        user_new: req.body.user_new,
        localization: req.body.localization,
        category: req.body.category,
        status: req.body.status,
        recipt_date: req.body.recipt_date?new Date(req.body.recipt_date):null,
        warranty_date: req.body.warranty_date?new Date(req.body.warranty_date):null
    }).then((asset)=>{
        res.send(asset)
    })
})

module.exports = router;