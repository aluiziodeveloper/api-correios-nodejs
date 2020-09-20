const express = require('express')
const router = express.Router()
const ApiNodeCorreios = require('node-correios')

const correios = new ApiNodeCorreios()

router.post('/', (request, response) => {
  const { cep } = request.body

  correios.consultaCEP({ cep }).then(result => {

    return response.json(result)

  }).catch(error => {

    return response.json(error)

  })
})

module.exports = router
