const express = require('express')
const router = express.Router()
const { getTugas, getTugasById, postTugas, deleteTugas, updateTugas } = require('../controllers/tugasController')

router.get('/', getTugas)
router.get('/:id', getTugasById)
router.post('/', postTugas)
router.put('/:id', updateTugas)
router.delete('/:id', deleteTugas)

module.exports = router