const express = require('express')
const router = express.Router()
const ApiNodeCorreios = require('node-correios')

const correios = new ApiNodeCorreios()

router.post('/', (request, response) => {
    const {
        nCdServico,
        sCepOrigem,
        sCepDestino,
        nVlPeso,
        nCdFormato,
        nVlComprimento,
        nVlAltura,
        nVlLargura,
        nVlDiametro, 
    } = request.body;

    correios.calcPrecoPrazo({
        nCdServico,
        sCepOrigem,
        sCepDestino,
        nVlPeso,
        nCdFormato,
        nVlComprimento,
        nVlAltura,
        nVlLargura,
        nVlDiametro, 
    }).then(result => {

        return response.json(result)

    }).catch(error => {

        return response.json(error)

    });
})

module.exports = router
