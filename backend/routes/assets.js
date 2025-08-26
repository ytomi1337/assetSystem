var express = require('express');
var router = express.Router();

const db = require('../models');
const Asset = db.Asset; 

const { Op } = require('sequelize');
const { body, validationResult } = require('express-validator')
const isAuthenticated = require('../middlewares/isAuthenticated')


router.get('/assets', function(req, res){
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 20
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
    }).catch(err => {
        console.error(err);
        res.status(500).send({ error: 'Wystąpił błąd podczas pobierania danych' });
    })
})

router.get('/assets/lastNum', async (req, res) => {

    try{
        const lastAsset = await Asset.findOne({
            attributes: ['it_num'],
            order: [['it_num', 'DESC']]
        })

        res.json({
            asset: lastAsset
        })
    }catch(error){
        res.send('Błąd podczas pobierania ostatniego rekordu: ', error);
    }


})
router.get('/assets/it_numbers', async (req, res) => {
    try {
      const minQuery = req.query.min;
      const maxQuery = req.query.max;
  
 
      const assets = await Asset.findAll({
        attributes: ['it_num', 'name', 'serialnum']
      });
  
      const plainAssets = assets.map(asset => asset.get({ plain: true }));
  

      const getNumber = (itNum) => {
        const match = itNum.match(/ITBI_(\d+)/);
        return match ? parseInt(match[1], 10) : null;
      };
  
    
      const allNumbers = plainAssets.map(item => getNumber(item.it_num)).filter(n => n !== null);
      const globalMin = Math.min(...allNumbers);
      const globalMax = Math.max(...allNumbers);
  
      const formatItNum = (num) => `ITBI_${num.toString().padStart(5, '0')}`;
  
      let filteredAssets = plainAssets;

      if (minQuery && maxQuery) {
        const userMin = parseInt(minQuery, 10);
        const userMax = parseInt(maxQuery, 10);
  
        filteredAssets = plainAssets.filter(item => {
          const num = getNumber(item.it_num);
          return num !== null && num >= userMin && num <= userMax;
        });
      }
  
      const response = {
        assets: filteredAssets,
        min: formatItNum(globalMin),
        max: formatItNum(globalMax)
      };
  
      res.json(response);
    } catch (error) {
      res.status(500).json({
        message: "Wystąpił błąd podczas zczytywania numerów", error
      });
    }
  });
  

router.get('/assets/:id', function(req, res){
    
        Asset.findByPk(Number(req.params.id)).then((asset) => {
            res.send(asset)
        }).catch((error) =>{
            res.status(500).send({ error: 'Not found asset in database', details: error.message });
        })
})


router.post('/assets', [ 
    // body('serialnum').isInt().withMessage('SN must be integer'),
    body('it_num').isLength({min: 10, max: 10}).withMessage('Nr Działu IT musi zawierac 10 znaków!'),
    body('serialnum').isLength({max: 30}).withMessage('Nr Seryjny musi zawierac  mniej niż 30 znaków!'),
    body('user_new').isLength({max: 30}).withMessage('Pole użytkownik musi zawierac  mniej niż 30 znaków!'),
    body('localization').isLength({max: 30}).withMessage('Pole lokalizacja musi zawierac  mniej niż 30 znaków!'),
    body('category').isLength({max: 30}).withMessage('Pole Kategoria musi zawierac  mniej niż 30 znaków!'),
    body('status').isLength({max: 30}).withMessage('Pole Status musi zawierac  mniej niż 30 znaków!'),
    
  

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
        ActivityLog.create({
            action: 'AddedToDB',
            it_number: asset.it_num,
            deviceId: asset.id,
            user: 'admin',
            targetUser: asset.user_new,
            operationNumber: 'AAA-TEST',
            description: `Added: ${asset.name}`
        })
        res.send(asset)
    }).catch(()=>{
        return res.status(400).json({ errors: [{ field: 'it_num', msg: 'Nr działu IT musi byc unikalny!' }] })
    })
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

        ActivityLog.create({
            action: 'Edited',
            it_number: asset.it_num,
            deviceId: asset.id,
            user: asset.user_old || asset.user_new ,
            targetUser: asset.user_new,
            operationNumber: 'AAA-TEST',
            description: `Zmiany: ${JSON.stringify(changes)}`
        })
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

        if(user == 'IT Magazyn' ){
            for (let id of ids){
                const asset = await Asset.findByPk(id)
    
                await ActivityLog.create({
                    action: 'Transfer',
                    it_number: asset.it_num,
                    deviceId: asset.id,
                    user: asset.user_new,
                    targetUser: user,
                    operationNumber: 'AAA-TEST',
                    description: `Transfer od: ${asset.user_new} do: ${user}`
                })
    
                asset.update(
                    { 
                        user_new: user,
                        status: 'Magazyn',
                        localization: 'IT Magazyn'
                    }
                 )
            }
        }
        else
        {
            for (let id of ids){
                const asset = await Asset.findByPk(id)
    
                await ActivityLog.create({
                    action: 'Transfer',
                    it_number: asset.it_num,
                    deviceId: asset.id,
                    user: asset.user_new,
                    targetUser: user,
                    operationNumber: 'AAA-TEST',
                    description: `Transfer od: ${asset.user_new} do: ${user}`
                })
                
                if(asset.user_new == 'IT Magazyn'){
                    await asset.update(
                        { 
                            user_new: user,
                            status: 'Wydane'}
                     )
                }
                asset.update(
                    { user_new: user}
                 )
            }
        }
        
       
        
        res.status(200).json({ message: "Asset updated correctly"})
    }catch(error){
        console.log("Update Error:", error);
        res.status(500).json({message: "Wystapił błąd podczas aktualizacji", error})
    }

})



module.exports = router;