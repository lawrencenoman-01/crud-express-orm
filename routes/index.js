const express = require('express')
const mahasiswaRoute = require('./mahasiswaRoute')
const tugasRoute = require('./tugasRoute')
const matkulRoute = require('./matkulRoutes')
const router = express.Router()

router.use('/mahasiswa', mahasiswaRoute)
router.use('/tugas', tugasRoute)
router.use('/matkul', matkulRoute)

module.exports = router