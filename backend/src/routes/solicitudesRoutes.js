const express = require('express')
const router = express.Router()
const solicitudesController = require('../controllers/solicitudesController')

router.get('/', solicitudesController.getSolicitudes)
router.post('/', solicitudesController.postSolicitud)
router.patch('/:id', solicitudesController.patchSolicitud)

module.exports = router