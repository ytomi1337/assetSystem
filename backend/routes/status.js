var express = require('express');
var router = express.Router();
var Status = require('../models/status.js');
var Asset = require('../models/assets.js');
var Phone = require('../models/phones.js');
const { Sequelize } = require('sequelize');
const { body, validationResult } = require('express-validator')


router.get('/status', function(req, res){
    Status.findAll({

    }).then((status) =>{
        res.send(status)
    }).catch((error)=>{
        res.send(error.msg)
        console.log(error)
    })
})

router.get('/status/count', async(req, res)=>{
    try{
        const [assetResults, phoneResults] = await Promise.all([
            Asset.findAll({
                attributes:[
                    'status',
                    [Sequelize.fn('COUNT', Sequelize.col('status')), 'count']
                  ],
                group: ['status']
            }),
            Phone.findAll({
                attributes:[
                    'status',
                    [Sequelize.fn('COUNT', Sequelize.col('status')), 'count']
                  ],
                group: ['status']
            })
        ])
        

        const assetsData = assetResults.map(result => result.get({ plain: true }));
        const phonesData = phoneResults.map(result => result.get({ plain: true }));

        res.json({
            assets: assetsData,
            phones: phonesData
          });
    }catch (error) {
        res.send('Błąd podczas pobierania danych: ', error);
      }
})

router.post('/status/:name', function(req, res){
    const { name } = req.params;
    Status.create({
        name
    }).then((status)=>{
        res.status(200).json({ message: "Status added correctly: ", status})
    }).catch((error)=>{
        return res.status(500).json({message: "Wystapił błąd podczas dodawania Lokalizacji", error})
    })
})

router.delete('/status/:name',  function(req, res){
    const { name } = req.params;
    Status.destroy({
        where: { name }
    }).then((status)=>{
        res.status(200).json({ message: "Status added correctly: ", status})
    }).catch((error)=>{
        return res.status(500).json({message: "Wystapił błąd podczas dodawania Lokalizacji", error})
    })
})

module.exports = router;