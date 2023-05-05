const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const con = require('./connection.js')

const swaggerUI = require('swagger-ui-express')
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerOptions = require('./swaggerOptions')

// Para gerar o arquivo de definitions para o Postman
const swaggerDefinition = require('./swaggerDefinition.js')
const swaggerAutogen = require('swagger-autogen')()
const outputFile = './swagger-output.json'
const endpointsFiles = ['./index.js']
swaggerAutogen(outputFile, endpointsFiles, swaggerDefinition)

const app = express()
app.use(cors())

// Adicionamos o gerador de documentação em uma const
const swaggerSpecs = swaggerJSDoc(swaggerOptions)


// Middleware para arquivos estáticos (CSS, IMG, JS, etc)
// passamos o nome do diretorio que será publico
app.use(express.static('public'))
// Configuramos o servidor para utilizar o middleware do body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs))

// Usa o 
app.get('/collection', (req, res) => res.json(require(outputFile)))


/**
 * @swagger
 * /departamentos:
 *   get:
 *     description: Lista todos departamentos
 *     produces:
 *       - text/html
 *     responses:
 *       200:
 *         description: Exibe todos departamentos em um vetor
 */
app.get('/departamentos', (req, res) => {
  con.query('SELECT * FROM DEPARTAMENTOS ORDER BY nome', (err, result) => {
    if (err) {
      res.send(err)
    }
    res.send(result)
  })
})

/**
 * @swagger
 *
 * /departamentos/:id:
 *   get:
 *     description: Listaum departamentos específico pelo ID
 *     produces:
 *       - text/html
 *     responses:
 *       200:
 *         description: Exibe todos departamentos em um vetor
 */
app.get('/departamentos/:idDepartamento', (req, res) => {
  const { idDepartamento } = req.params

  con.query(`SELECT * FROM DEPARTAMENTOS WHERE id_departamento = ${idDepartamento}`, (err, result) => {
    res.send(result)
  })
})

/**
 * @swagger
 *
 * /departamentos:
 *   post:
 *     description: Insere departamento
 *     produces:
 *       - text/json
 *     parameters:
 *       - name: nome
 *         description: nome do departamento.
 *         required: true
 *         type: string
 *       - name: sigla
 *         description: sigla do departamento.
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Insere um depto. no banco
 */
app.post('/departamentos', (req, res) => {
  const { nome, sigla } = req.body
  if (nome != undefined && sigla != undefined) {
    con.query(`INSERT INTO DEPARTAMENTOS (nome, sigla) VALUES ('${nome}', '${sigla}')`, (err, result) => {
      res.send(result)
    })
  } else {
    res.send({
      'message': 'Nome ou Sigla não foram enviados'
    })
  }
})


/**
 * @swagger
 *
 * /departamentos/:id:
 *   post:
 *     description: Altera os dados de um departamento
 *     produces:
 *       - text/json
 *     parameters:
 *       - name: nome
 *         description: nome do departamento.
 *         required: true
 *         type: string
 *       - name: sigla
 *         description: sigla do departamento.
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Insere um depto. no banco
 */
app.put('/departamentos/:idDepartamento', (req, res) => {
  const { idDepartamento } = req.params
  const { nome, sigla } = req.body

  if (nome != undefined && sigla != undefined) {
    con.query(`UPDATE DEPARTAMENTOS SET nome = '${nome}', sigla = '${sigla}' WHERE id_departamento = ${idDepartamento}`, (err, result) => {
      res.send(result)
    })
  } else {
    res.send({
      'message': 'Nome ou Sigla não foram enviados'
    })
  }
})


/**
 * @swagger
 *
 * /departamento/:id:
 *   delete:
 *     description: Remove um departamento
 *     produces:
 *       - text/json
 *     parameters:
 *       - name: idDepartamento
 *         description: id do departamento.
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: Insere um depto. no banco
 */
app.delete('/departamentos/:idDepartamento', (req, res) => {
  const { idDepartamento } = req.params

  con.query(`DELETE FROM DEPARTAMENTOS WHERE id_departamento = ${idDepartamento}`, (err, result) => {
    res.send(result)
  })
})


const port = 80
app.listen(port, () => {
  console.log('Example app listening at http://localhost:%s', port)
})
