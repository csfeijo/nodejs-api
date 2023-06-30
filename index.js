import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import edgeFunctionsRoutes from './src/routes/edgeFunctionsRoutes.js'
import departamentosRoutes from './src/routes/departamentosRoutes.js'
import pugRoutes from './src/routes/pugRoutes.js'
dotenv.config()
const app = express()
app.use(cors())


// Middleware para arquivos estáticos (CSS, IMG, JS, etc)
// passamos o nome do diretorio que será publico
app.use(express.static('public'))

// Configuramos o servidor para utilizar o middleware do body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

edgeFunctionsRoutes(app)
departamentosRoutes(app)
pugRoutes(app)

const port = 80
app.listen(port, () => {
  console.log('Example app listening at http://localhost:%s', port)
})

app.get('/', (req, res) => {
  res.send('Welcome to API')
})


