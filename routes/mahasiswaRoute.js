const express = require('express')
const router = express.Router()
const { getMahasiswa, getMahasiswaById, postMahasiswa, updateMahasiswa, deleteMahasiswa } = require('../controllers/mahasiswaController')

router.get('/', getMahasiswa)
router.get('/:id', getMahasiswaById)
router.post('/', postMahasiswa)
router.put('/:id', updateMahasiswa)
router.delete('/:id', deleteMahasiswa)

module.exports = router