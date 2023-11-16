const express = require('express')
const router = express.Router()
const { getMatkul, getMatkulById, postMatkul, updateMatkul } = require('../controllers/matkulController')

router.get('/', getMatkul)
router.get('/:id', getMatkulById)
router.post('/', postMatkul)
router.put('/:id', updateMatkul)

module.exports = router