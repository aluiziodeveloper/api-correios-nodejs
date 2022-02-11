<p align="center">
  <a href="https://aluiziodeveloper.com.br/">
    <img alt="Aluizio Developer" src="https://aluiziodeveloper.com.br/assets/img/icon.png" width="200" />
  </a>
</p>
<h2 align="center">
Informação sobre tecnologia, dicas, tutoriais, mini-cursos e muito mais.
</h2>

## Conhecendo uma Biblioteca Gratuita Node.js para Consulta de CEP e Cálculo de Frete na API dos Correios 

Neste post vamos aprender a utilizar a API dos correios para consulta de CEP, cálculo de frete e prazo, a partir de uma biblioteca gratuita implementada com o Node.js e disponível no Github.

## Implementação do Exemplo

1. Criar o diretório do projeto e proceder com a instalação dos pacotes através do `npm`:

```shell
mkdir api-correios

cd api-correios

npm init -y

npm install --save express node-correios
```

2. Conteúdo do arquivo principal desse exemplo, `server.js`:

```js
const express = require('express')
const app = express()

app.use(express.json());

require('./src')(app)

app.listen(3000, () => {
  console.log('Server started on port 3000!')
})
```

3. Conteúdo do arquivo que chama as rotas da aplicação, `src/index.js`:

```js
module.exports = (app) => {
  app.use('/cep', require('./routes/cep'))
  app.use('/frete', require('./routes/frete'))
}
```

4. Conteúdo do arquivo com a rota para consulta de cep, `src/routes/cep.js`:

```js
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

  });
})

module.exports = router
```

5. Conteúdo do arquivo com a rota para cálculo de frete, `src/routes/frete.js`:

```js
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

    correios.calcPreco({
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
```

6. Exemplo do campo Body na requisição POST no Insomnia:

```json
{
  "nCdServico": "40010",
  "sCepOrigem": "22270010",
  "sCepDestino": "89010000",
  "nVlPeso": 1,
  "nCdFormato": 1,
  "nVlComprimento": 27,
  "nVlAltura": 8,
  "nVlLargura": 10,
  "nVlDiametro": 18
}
```

7. Rodar o projeto:

```shell
node server.js
```

## Redes Sociais

[Site Aluizio Developer](https://aluiziodeveloper.com.br)

[YouTube](https://www.youtube.com/jorgealuizio)

[Servidor no Discord](https://discord.gg/3J87BMz5fD)

[LinkedIn](https://www.linkedin.com/in/jorgealuizio/)

## Referências

[Github API Consulta CEP dos Correios](https://github.com/vitorleal/node-correios)

[PDF - Manual Técnico de Integração com a API dos Correios](http://www.correios.com.br/enviar-e-receber/ferramentas/calculador-remoto-de-precos-e-prazos/pdf/manual-de-implementacao-do-calculo-remoto-de-precos-e-prazos)
