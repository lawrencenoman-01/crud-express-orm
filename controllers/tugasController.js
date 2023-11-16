const { Tugas } = require('../models')
const handleServerError = require('../helpers/serverError')
const handleClientError = require('../helpers/clientError')
const Joi = require('joi')

// Get All Tugas
exports.getTugas = async (req, res) => {
  try {
    const tugas = await Tugas.findAll({
      include: 'tugasMahasiswa',
    })

    return res.status(200).json({
      data: tugas,
      message: 'Success',
    })
  } catch (err) {
    handleServerError(res)
  }
}

// Get Tugas By Id
exports.getTugasById = async (req, res) => {
  try {
    const { id } = req.params
    const tugas = await Tugas.findByPk(id, {
      include: 'tugasMahasiswa',
    })

    if (!tugas) {
      handleClientError(res, 404, 'Tugas with the spesific number does not exist')
    }

    return res.status(200).json({
      data: tugas,
      message: 'Success',
    })
  } catch (err) {
    handleServerError(res)
  }
}

// Create Tugas
exports.postTugas = async (req, res) => {
  try {
    const newData = req.body
    const deskripsi = req.body.deskripsi

    const tugasScheme = Joi.object({
      mahasiswaId: Joi.number().required(),
      deskripsi: Joi.string().min(10).required(),
      nilai: Joi.number().required(),
    })

    const { error } = tugasScheme.validate(newData)
    if (error) {
      return res.status(404).json({
        status: 'Validation Failed',
        message: error.details[0].message,
      })
    }

    const sameData = await Tugas.findOne({
      where: { deskripsi },
    })
    
    if (sameData) {
      return handleClientError(res, 404, 'Deskripsi Tugas does not same')
    }

    const createTugas = await Tugas.create(newData)

    return res.status(201).json({
      data: createTugas,
      message: 'Successfully Added Tugas'
    })

  } catch (err) {
    handleServerError(res)
  }
}

// Update Tugas
exports.updateTugas = async (req, res) => {
  try {
    const { id } = req.params
    const newData = req.body
    const deskripsi = req.body.deskripsi
    const findTugas = await Tugas.findByPk(id)

    if (!findTugas) {
      handleClientError(res, 404, `Tugas dengan id ${id} yang anda cari tidak ada.`)
    }

    const tugasUpdateScheme = Joi.object({
      deskripsi: Joi.string().min(10).required(),
      nilai: Joi.number().required(),
    })

    const { error } = tugasUpdateScheme.validate(newData)
    if (error) {
      return res.status(404).json({
        status: 'Validation Failed',
        message: error.details[0].message,
      })
    }

    const sameData = await Tugas.findOne({
      where: { deskripsi },
    })

    if (sameData) {
      return handleClientError(res, 404, 'Deskripsi Tugas does not same')
    }

    const updateData = await findTugas.update(newData)

    return res.status(200).json({
      data: updateData,
      message: 'Tugas updated Successfully'
    })

  } catch (err) {
    handleServerError(res)
  }
}

// Delete Tugas
exports.deleteTugas = async (req, res) => {
  try {
    const { id } = req.params
    const findTugas = await Tugas.findByPk(id)

    if (!findTugas) {
      handleClientError(res, 404, `Tugas dengan id ${id} yang anda cari tidak ada.`)
    }

    await findTugas.destroy()
    return res.status(200).json({
      message: `Tugas dengan id ${id} terhapus.`
    })

  } catch (err) {
    handleServerError(res)
  }
}
