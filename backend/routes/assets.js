var express = require('express');
var router = express.Router();
var Asset = require('../models/assets.js');
var Category = require('../models/category.js');
var Localization = require('../models/localization.js');
var Status = require('../models/status.js');
const { Sequelize, where, Op } = require('sequelize');
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
            order: [ [sortKey, sortValue] ],
            include: [
                {
                    model: Category,
                    attributes: ['name'],
                },
                {
                    model: Localization,
                    attributes: ['name'],
                },
                {
                    model: Status,
                    attributes: ['name'],
                }
            ]
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
    // body('it_num').isLength({min: 10, max: 10}).withMessage('Nr Działu IT musi zawierac 10 znaków!'),
    // body('serialnum').isLength({max: 30}).withMessage('Nr Seryjny musi zawierac  mniej niż 30 znaków!'),
    ], async(req, res) =>{
    
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    
    try {

        const category = req.body.category ? await Category.findOne({ where: { name: req.body.category } }) : null;
        const localization = req.body.localization ? await Localization.findOne({ where: { name: req.body.localization } }) : null;
        const status = req.body.status ? await Status.findOne({ where: { name: req.body.status } }) : null;


        // 2️⃣ Tworzymy nowy asset używając znalezionych ID
        const asset = await Asset.create({
            name: req.body.name,
            it_num: req.body.it_num,
            serialnum: req.body.serialnum,
            user_new: req.body.user_new,
            localizationId: localization ? localization.id : null,
            categoryId: category ? category.id : null,
            statusId: status ? status.id : null,
            recipt_date: req.body.recipt_date ? new Date(req.body.recipt_date) : null,
            warranty_date: req.body.warranty_date ? new Date(req.body.warranty_date) : null
        });

        res.status(201).json(asset);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Błąd serwera' });
    }
   
})

router.post('/assets/filter', function(req, res){
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
    if (req.body.it_num){
        filter.it_num = {
            [Op.iLike]: `%${req.body.it_num}%`
        }
    }
    if (req.body.serialnum){
        filter.serialnum = req.body.serialnum
    }
    if (req.body.user_new && req.body.user_new.length){
        filter.user_new = {
            [Op.in]: req.body.user_new
        }
    }
    if (req.body.localization && req.body.localization.length){
        filter.localization = {
            [Op.in]: req.body.localization
        }
    }
    if (req.body.category && req.body.category.length){
        filter.category = {
            [Op.in]: req.body.category
        }

    }
    if (req.body.status && req.body.status.length){
        filter.status = {
            [Op.in]: req.body.status
        }
    }

    if (req.body.isWarranty){
        const actualyDate = new Date().toISOString().split('T')[0]
        if(req.body.isWarranty == 'Aktywna'){
            filter.warranty_date ={
                [Op.gt]: actualyDate
            }
        }else{
            filter.warranty_date ={
                [Op.lt]: actualyDate
            }
        }
    }
    Promise.all([
        Asset.count({
            where: filter
        }),
        Asset.findAll({
            offset: (page -1) * limit,
            limit: (limit),
            order: [ [sortKey, sortValue] ],
            where: filter
        })
    ]).then(([count, assets]) => {
        res.send({
            count: count,
            assets: assets
        })
    })
})

router.post('/assets/user', function(req, res){
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 3

    console.log('backend: ',req.body.userName);
    Promise.all([
        Asset.count({
            where:{
                user_new: req.body.userName
            }
        }),
        Asset.findAll({
            offset: (page -1) * limit,
            limit: (limit),
            where:{
                user_new: req.body.userName
            }
        })
    ]).then(([count, assets]) => {
        res.send({
            count: count,
            assets: assets
        })
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

router.put('/assets/changeOwner', async(req, res) =>{
    const ids = req.body.recivedAssets.map(asset => asset.id)
    const user = req.body.user
    try{
        Asset.update(
            { user_new: user },
            { where: { id: ids}}
        )
        res.status(200).json({ message: "Asset updated correctly"})
    }catch(error){
        console.log("Update Error:", error);
        res.status(500).json({message: "Wystapił błąd podczas aktualizacji", error})
    }

})



module.exports = router;