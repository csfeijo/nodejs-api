import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import edgeFunctionsRoutes from './src/routes/edgeFunctionsRoutes.js'
import envVariablesRouters from './src/routes/envVariablesRoutes.js'
import edgeApplicationRoutes from './src/routes/edgeApplicationRoutes.js'
import departamentosRoutes from './src/routes/departamentosRoutes.js'
dotenv.config()
const app = express()
app.use(cors())


// Middleware para arquivos estáticos (CSS, IMG, JS, etc)
// passamos o nome do diretorio que será publico
app.use(express.static('public'))

// Configuramos o servidor para utilizar o middleware do body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

edgeApplicationRoutes(app)
edgeFunctionsRoutes(app)
envVariablesRouters(app)
departamentosRoutes(app)

const port = 80
app.listen(port, () => {
  console.log('Example app listening at http://localhost:%s', port)
})

app.get('/', (req, res) => {
  res.send('Welcome to API')
})


