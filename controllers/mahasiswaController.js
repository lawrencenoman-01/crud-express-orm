const { Mahasiswa, Tugas, DaftarMatkul } = require('../models')
const handleServerError = require('../helpers/serverError')
const handleClientError = require('../helpers/clientError')
const Joi = require('joi')

// Get All Mahasiswa
exports.getMahasiswa = async (req, res) => {
  try {
    const mahasiswa = await Mahasiswa.findAll({
      include: 'tugasMahasiswa',
    })

    return res.status(200).json({
      data: mahasiswa,
      message: 'Success',
    })

  } catch (err) {
    handleServerError(res)
  }
}

// Get Mahasiswa By Id
exports.getMahasiswaById = async (req, res) => {
  try {
    const { id } = req.params
    const mahasiswa = await Mahasiswa.findByPk(id, {
      include: 'tugasMahasiswa'
    })

    if (!mahasiswa) {
      handleClientError(res, 404, 'Mahasiswa with the specified ID does not exists')
    }

    return res.status(200).json({
      data: mahasiswa,
      message: 'Success',
    })
    
  } catch (err) {
    handleServerError(res)
  }
}

// Create Mahasiswa
exports.postMahasiswa = async (req, res) => {
  try {
    const newData = req.body
    const name = req.body.name
    const matkulIds = req.body.matkulIds

    const mahasiswaScheme = Joi.object({
      name: Joi.string().min(5).required(),
      address: Joi.string().required(),
      email: Joi.string().required(),
      matkulIds: Joi.array().min(1).required(),
    })

    const { error } = mahasiswaScheme.validate(newData)
    if (error) {
      return res.status(404).json({
        status: 'Validation Failed',
        message: error.details[0].message,
      })
    }

    const sameName = await Mahasiswa.findOne({
      where: { name },
    })
    if (sameName) {
      return handleClientError(res, 404, 'Nama Mahasiswa does not same')
    }

    const createMahasiswa = await Mahasiswa.create(newData)
    const newMahasiswaId = createMahasiswa.id

    for(const matkulId of matkulIds) {
      const matkulMahasiswa = {
        mahasiswaId: newMahasiswaId,
        matkulId: matkulId
      }
      await DaftarMatkul.create(matkulMahasiswa)
    }

    return res.status(201).json({
      message: 'Successfully Added Mahasiswa'
    })

  } catch (err) {
    console.log(err);
    handleServerError(res)
  }
}

// Update Mahasiswa
exports.updateMahasiswa = async (req, res) => {
  try {
    const { id } = req.params
    const newData = req.body
    const name = req.body.name
    const findMahasiswa = await Mahasiswa.findByPk(id)

    if (!findMahasiswa) {
      handleClientError(res, 404, `Mahasiswa dengan id ${id} tidak terdaftar.`)
    }

    const mahasiswaUpdateScheme = Joi.object({
      name: Joi.string().min(5).required(),
      address: Joi.string().required(),
      email: Joi.string().required(),
    })

    const { error } = mahasiswaUpdateScheme.validate(newData)
    if (error) {
      return res.status(404).json({
        status: 'Validation Failed',
        message: error.details[0].message,
      })
    }

    const sameData = await Mahasiswa.findOne({
      where: { name },
    })

    if (sameData) {
      return handleClientError(res, 404, 'Nama Mahasiswa does not same')
    }

    const updateData = await findMahasiswa.update(newData)

    return res.status(200).json({
      data: updateData,
      message: 'Mahasiswa updated Successfully'
    })

  } catch (err) {
    handleServerError(res)
  }
}

// Delete Mahasiswa
exports.deleteMahasiswa = async (req, res) => {
  try {
    const { id } = req.params
    const findMahasiswa = await Mahasiswa.findByPk(id)

    if (!findMahasiswa) {
      handleClientError(res, 404, `Mahasiswa dengan id ${id} tidak terdaftar.`)
    }

    await Tugas.destroy({
      where: { mahasiswaId: id }
    })

    await DaftarMatkul.destroy({
      where: { mahasiswaId: id }
    })

    await findMahasiswa.destroy()
    // console.log(findMahasiswa);
    return res.status(200).json({
      message: `Mahasiswa dengan id ${id} terhapus`
    })

  } catch (err) {
    console.log(err);
    handleServerError(res)
  }
}
