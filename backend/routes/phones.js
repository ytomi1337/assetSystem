var express = require('express');
var router = express.Router();
var Phones = require('../models/phones.js');
const { Sequelize, Op } = require('sequelize');


router.get('/phones', function(req, res){
    console.log('request to phones');
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 3

    const sortKey = req.query.sortKey || 'id'
    const sortValue = req.query.sortValue || 'asc'

    Promise.all([
        Phones.count(),
        Phones.findAll({
            offset: (page -1) * limit,
            limit: (limit),
            order: [ [sortKey, sortValue] ]
        })
    ]).then(([count, phones]) => {
        res.send({
            count: count,
            phones: phones
        })
    })
})

router.post('/phones/filter', function(req, res){
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const sortKey = req.query.sortKey || 'id'
    const sortValue = req.query.sortValue || 'asc'
    const filter = {}

    
    if (req.body.name){
        filter.name = {
            [Op.iLike]: `%${req.body.name}%`
        }
    }
    if (req.body.category && req.body.category.length){
        filter.category = {
            [Op.in]: req.body.category
        }
    }
    if (req.body.user && req.body.user.length){
        filter.user = {
            [Op.in]: req.body.user
        }
    }
    
    if (req.body.nr_tel){
        filter.nr_tel = {
            [Op.iLike]: `%${req.body.nr_tel}%`
        }
    }
    if (req.body.imei){
        filter.imei = {
            [Op.iLike]: `%${req.body.imei}%`
        }
    }
    if (req.body.puk){
        filter.puk = {
            [Op.iLike]: `%${req.body.puk}%`
        }
    }
    if (req.body.pin){
        filter.pin = {
            [Op.iLike]: `%${req.body.pin}%`
        }
    }
    if (req.body.status && req.body.status.length){
        filter.status = {
            [Op.in]: req.body.status
        }
    }

    // if (req.body.isWarranty){
    //     const actualyDate = new Date().toISOString().split('T')[0]
    //     if(req.body.isWarranty == 'Aktywna'){
    //         filter.warranty_date ={
    //             [Op.gt]: actualyDate
    //         }
    //     }else{
    //         filter.warranty_date ={
    //             [Op.lt]: actualyDate
    //         }
    //     }
    // }
    Promise.all([
        Phones.count({
            where: filter
        }),
        Phones.findAll({
            offset: (page -1) * limit,
            limit: (limit),
            order: [ [sortKey, sortValue] ],
            where: filter
        })
    ]).then(([count, phones]) => {
        res.send({
            count: count,
            phones: phones
        })
    })
})
module.exports = router;