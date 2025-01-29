var express = require('express');
var router = express.Router();
var Asset = require('../models/assets.js');
const { Sequelize } = require('sequelize');
const { body, validationResult } = require('express-validator')


router.get('/assets', function(req, res){
    console.log('request to assets');
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
        }).catch((error) =>{
            res.status(500).send({ error: 'Not found asset in database', details: error.message });
        })
})

router.post('/assets', [ 
    body('serialnum').isInt().withMessage('SN must be integer'),
    body('it_num').isLength({min: 10, max: 10}).withMessage('IT_Num must be 10 characters long')

    ], function(req, res){

    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
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
    }).catch(()=>{
        return res.status(400).json({ errors: [{ field: 'it_num', msg: 'It_num must be uniqe' }] })
    })
})

router.delete('/assets/:id', function(req, res){

    Asset.destroy({
        where:{
            id: req.params.id
        },
        force: true,
    }).then(()=>{
        res.send('success')
    })
})

router.patch('/assets/:id', async(req, res) => {
    const  id  = req.params.id
    const  changes  = req.body

    try{
        const asset = await Asset.findByPk(id)

        if(!asset){
            return res.status(400).json({ message: "Asset not found"})
        }

        await asset.update(changes)

        res.status(200).json({ message: "Asset updated correctly", asset });
    }catch(error){
        console.log("Update Error:", error);
        res.status(500).json({message: "Wystapił błąd podczas aktualizacji", error})
    }
})


module.exports = router;