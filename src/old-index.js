import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import swagger from './swagger/swagger.js'
import edgeFunctionsRoutes from './routes/edgeFunctionsRoutes.js'
import departamentosRoutes from './routes/departamentosRoutes.js'

dotenv.config()
const app = express()
app.use(cors())

// Carregamos o middleware do Swagger
swagger(app)

// middleware de Edge Functions (personal project)
edgeFunctionsRoutes(app)
departamentosRoutes(app)

// Middleware para arquivos estáticos (CSS, IMG, JS, etc)
// passamos o nome do diretorio que será publico
app.use(express.static('public'))

// Configuramos o servidor para utilizar o middleware do body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


const port = 80
app.listen(port, () => {
  console.log('Example app listening at http://localhost:%s', port)
})

app.get('/', (req, res) => {
  res.send('Welcome to API')
})


