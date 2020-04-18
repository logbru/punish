const router = require('express').Router()

router.use(require('./navRoutes.js'))
router.use('/api', require('./apiRoutes.js'))

module.exports = router
