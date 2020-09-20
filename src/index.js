module.exports = (app) => {
  app.use('/cep', require('./routes/cep'))
  app.use('/frete', require('./routes/frete'))
}
