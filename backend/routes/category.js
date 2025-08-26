var express = require('express');
var router = express.Router();
const db = require('../models');
const Category = db.reminders; 
const Asset = db.Asset; 
const Phone = db.Phone; 
const { Sequelize } = require('sequelize');


router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.findAll({ order: [['name', 'asc']] });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Błąd podczas pobierania kategorii', error: error.message });
  }
});


router.get('/categories/count', async (req, res) => {
  try {
    const [assetResults, phoneResults] = await Promise.all([
      Asset.findAll({
        attributes: ['category', [Sequelize.fn('COUNT', Sequelize.col('category')), 'count']],
        group: ['category']
      }),
      Phone.findAll({
        attributes: ['category', [Sequelize.fn('COUNT', Sequelize.col('category')), 'count']],
        group: ['category']
      })
    ]);

    const assetsData = assetResults.map(r => r.get({ plain: true }));
    const phonesData = phoneResults.map(r => r.get({ plain: true }));

    res.json({ assets: assetsData, phones: phonesData });
  } catch (error) {
    return res.status(500).json({ message: 'Błąd podczas pobierania danych', error: error.message });
  }
});


router.post('/categories/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const category = await Category.create({ name });
    res.status(201).json({ message: 'Kategoria dodana poprawnie', category });
  } catch (error) {
    return res.status(500).json({ message: 'Wystąpił błąd podczas dodawania kategorii', error: error.message });
  }
});


router.delete('/categories/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const deleted = await Category.destroy({ where: { name } });
    if (!deleted) {
      return res.status(404).json({ message: 'Nie znaleziono takiej kategorii' });
    }
    return res.status(200).json({ message: 'Kategoria usunięta', deleted });
  } catch (error) {
    return res.status(500).json({ message: 'Wystąpił błąd podczas usuwania kategorii', error: error.message });
  }
});

module.exports = router;
