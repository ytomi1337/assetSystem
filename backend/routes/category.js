var express = require('express');
var router = express.Router();
var Category = require('../models/category.js');
var Asset = require('../models/assets.js');
var Phone = require('../models/phones.js');
const { Sequelize } = require('sequelize');
const { body, validationResult } = require('express-validator')


router.get('/categories', function(req, res){
    Category.findAll({
        order: [['name', 'asc']]
    }).then((categories) =>{
        res.send(categories)
    })
})

router.get('/categories/count', async(req, res)=>{
    try{
        const [assetResults, phoneResults] = await Promise.all([
            Asset.findAll({
                attributes:[
                    'category',
                    [Sequelize.fn('COUNT', Sequelize.col('category')), 'count']
                  ],
                group: ['category']
            }),
            Phone.findAll({
                attributes:[
                    'category',
                    [Sequelize.fn('COUNT', Sequelize.col('category')), 'count']
                  ],
                group: ['category']
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

module.exports = router;