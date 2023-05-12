import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import con  from './connection.js'


//const swaggerUI = require('swagger-ui-express')
import swaggerUI from 'swagger-ui-express'
//const swaggerJSDoc = require('swagger-jsdoc')
import swaggerJSDoc from 'swagger-jsdoc'
import axios from 'axios'

//const swaggerOptions = require('./swaggerOptions')
//import swaggerOptions from './swaggerOptions.js'

// Para gerar o arquivo de definitions para o Postman
//const swaggerDefinition = require('./swaggerDefinition.js')
//import swaggerDefinition from './swaggerDefinition.js'

//const swaggerAutogen = require('swagger-autogen')()
//import swaggerAutogen from 'swagger-autogen'
const outputFile = './swagger-output.json'
const endpointsFiles = ['./index.js']
//swaggerAutogen(outputFile, endpointsFiles, swaggerDefinition)

dotenv.config()
const app = express()
app.use(cors())

// Adicionamos o gerador de documentação em uma const
//const swaggerSpecs = swaggerJSDoc(swaggerOptions)


// Middleware para arquivos estáticos (CSS, IMG, JS, etc)
// passamos o nome do diretorio que será publico
app.use(express.static('public'))
// Configuramos o servidor para utilizar o middleware do body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
//app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs))

// Usa o 
//app.get('/collection', (req, res) => res.json(require(outputFile)))


app.get('/edge-functions', (req, res) => {
  const options = {
    headers: {
      'Accept': 'application/json; version=3',
      'Authorization': `Token ${process.env.PERSONAL_TOKEN}`
    }}

  axios.get('https://api.azionapi.net/edge_functions?page_size=200', options)
    .then(response => {
      const results = response.data.results

      const filter = results.map((fun) => {
        return {
          id: fun.id,
          name: fun.name
        }
      })


      res.json(filter)
      return
    })
    .catch(error => {
      res.status(500).send(`ERROR: ${error}`)
      console.error(error)
    })

  
})


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
app.get('/departamentos', async (req, res) => {
  try {
    const [rows] = await con.query('SELECT * FROM DEPARTAMENTOS ORDER BY nome')
    res.send(rows)
  } catch(e) {
    res.send(e)
  }
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
app.get('/departamentos/:idDepartamento', async (req, res) => {
  const { idDepartamento } = req.params
  
  try {
    const [rows] = await con.query(`SELECT * FROM DEPARTAMENTOS WHERE id_departamento = ${idDepartamento}`)
    res.status(200).json(rows)
  } catch (e) {
    res.status(500).json({ message: 'Erro ao listar registros.', exception: e})
  }
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
app.post('/departamentos', async (req, res) => {
  const { nome, sigla } = req.body

  if (!nome || !sigla) {
    res.status(400).json({ message: 'Um ou mais campos obrigatórios faltando.'})
  }

  try {
    const [result] = await con.query('INSERT INTO DEPARTAMENTOS (nome, sigla) VALUES (?, ?)', [nome, sigla])
    console.log(result)

    res.status(201).json({ message: 'Registro inserido com sucesso.', details: result})
  } catch(e) {
    res.status(500).json({ message: 'Erro ao inserir o registro.', exception: e})
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
app.put('/departamentos/:idDepartamento', async (req, res) => {
  const { idDepartamento } = req.params
  const { nome, sigla } = req.body

  if (!nome || !sigla || !idDepartamento) {
    res.status(400).json({ message: 'Um ou mais campos obrigatórios faltando.'})
  }

  try {
    const [result] = await con.query('UPDATE DEPARTAMENTOS SET nome = ?, sigla = ? WHERE id_departamento = ?', [nome, sigla, idDepartamento])
    console.log(result)

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Registro não encontrado.' })
    }

    res.status(201).json({ message: 'Registro inserido com sucesso.', details: result})
  } catch(e) {
    res.status(500).json({ message: 'Erro ao inserir o registro.', exception: e})
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
app.delete('/departamentos/:idDepartamento', async (req, res) => {
  const { idDepartamento } = req.params

  if (!idDepartamento) {
    res.status(400).json({ message: 'Um ou mais campos obrigatórios faltando.'})
  }
  try {
    const [result] = await con.query('DELETE FROM DEPARTAMENTOS WHERE id_departamento = ?', [idDepartamento])

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Registro não encontrado.' })
    }

    res.status(200).json({ message: 'Registro removido com sucesso.', details: result})

  } catch(e) {
    res.status(500).json({ message: 'Erro ao excluir o registro.', exception: e})
  }
})

app.get('/', (req, res) => {
  res.send('Welcome to API')
})


const port = 80
app.listen(port, () => {
  console.log('Example app listening at http://localhost:%s', port)
})
