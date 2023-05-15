import swaggerUI from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerOptions from './swaggerOptions.js'
import swaggerDefinition from './swaggerDefinition.js'
import swaggerAutogen from 'swagger-autogen'
import fs from 'fs'

const outputFile = './src/swagger-output.json'
const endpointsFiles = ['./src/index.js', './src/routes/edgeFunctionsRoutes.js']
swaggerAutogen(outputFile, endpointsFiles, swaggerDefinition)

const swaggerSpecs = swaggerJSDoc(swaggerOptions)

const swagger = (app) => {
  // Configura o middlware do Swagger
  app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs))

  // Configura a Rota para usar no import do Postman
  app.get('/collection', (req, res) => {
    fs.readFile(outputFile, 'utf8', (error ,content) => {
      res.send(content)
    })  
  })
}

export default swagger