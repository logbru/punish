const router = require('express').Router()
const db = require('../config')

// GET all items
router.get('/', (req, res) => {
  res.render('home')
})
router.get('/faq', (req, res) => {
  res.render('faq')
})
router.get('/contact', (req, res) => {
  res.render('contact')
})

module.exports = router
