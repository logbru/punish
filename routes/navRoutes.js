const router = require('express').Router()
const db = require('../config')

// GET all items
router.get('/', (req, res) => {
  res.render('home')
})

module.exports = router
