const express = require('express')
const linkController = require('../controllers/linkController')

const router = express.Router()

//Create link 
router.post('/api/links',linkController.createLinkController)
//List all links
router.get('/api/links',linkController.allLinkController)

//Stats for one code
router.get('/api/links/:code',linkController.statsController)

// DELETE  Delete link
router.delete('/api/links/:code',linkController.deleteUrlController)



module.exports = router



