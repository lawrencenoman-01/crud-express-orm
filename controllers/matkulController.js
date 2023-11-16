const { MataKuliah, Mahasiswa } = require('../models')
const handleServerError = require('../helpers/serverError')
const handleClientError = require('../helpers/clientError')
const Joi = require('joi')

// Get All Mata Kuliah
exports.getMatkul = async (req, res) => {
  try {
    const matkul = await MataKuliah.findAll({
      include: Mahasiswa
    })

    return res.status(200).json({
      data: matkul,
      message: 'Success',
    })

  } catch (err) {
    handleServerError(res)
  }
}

// Get Mata Kuliah By Id
exports.getMatkulById = async (req, res) => {
  try {
    const { id } = req.params
    const matkul = await MataKuliah.findByPk(id, {
      include: Mahasiswa
    })

    if (!matkul) {
      handleClientError(res, 404, 'Mata Kuliah with the specified ID does not exists')
    }

    return res.status(200).json({
      data: matkul,
      message: 'Success'
    })
    
  } catch (err) {
    handleServerError(res)
  }
}

// Create Mata Kuliah
exports.postMatkul = async (req, res) => {
  try {
    const newData = req.body
    const name = req.body.name

    const matkulScheme = Joi.object({
      name: Joi.string().min(5).required(),
      sks: Joi.number().min(1).required(),
      description: Joi.string().min(10).required()
    })

    const { error } = matkulScheme.validate(newData)
    if (error) {
      return res.status(404).json({
        status: 'Validation Failed',
        message: error.details[0].message,
      })
    }

    const sameData = await MataKuliah.findOne({
      where: { name },
    })
    if (sameData) {
      return handleClientError(res, 404, 'Nama mata Kuliah does not same')
    }

    const createMatkul = await MataKuliah.create(newData)

    return res.status(201).json({
      data: createMatkul,
      message: 'Successfully Added Mata Kuliah'
    })

  } catch (err) {
    handleServerError(res)
  }
}

// Update Mata Kuliah
exports.updateMatkul = async (req, res) => {
  try {
    const { id } = req.params
    const newData = req.body
    const name = req.body.name
    const findMatkul = await MataKuliah.findByPk(id)

    if (!findMatkul) {
      handleClientError(res, 404, `Mata Kuliah dengan id ${id} yang anda cari tidak ada.`)
    }

    const matkulUpdateScheme = Joi.object({
      name: Joi.string().min(5).required(),
      sks: Joi.number().min(1).required(),
      description: Joi.string().min(10).required()
    })

    const { error } = matkulUpdateScheme.validate(newData)
    if (error) {
      return res.status(404).json({
        status: 'Validation Failed',
        message: error.details[0].message,
      })
    }

    const sameData = await MataKuliah.findOne({
      where: { name },
    })

    if (sameData) {
      return handleClientError(res, 404, 'Nama Mata Kuliah does not same')
    }

    const updateData = await findMatkul.update(newData)

    return res.status(200).json({
      data: updateData,
      message: 'Mata Kuliah updated Successfully'
    })

  } catch (err) {
    console.log(err);
    handleServerError(res)
  }
}