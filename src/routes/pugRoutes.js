import pug from 'pug'

const departamentos = [
  {
    id_departamento: 1,
    sigla: 'RH',
    nome: 'Recursos Humanos'
  },
  {
    id_departamento: 2,
    sigla: 'TI',
    nome: 'Tecnologia da Informação'
  },
  {
    id_departamento: 3,
    sigla: 'FINANC',
    nome: 'Financeiro'
  },
  {
    id_departamento: 4,
    sigla: 'SRE',
    nome: 'Site Reliability Engineering'
  }
]


const pugRoutes = (app) => {
  app.get('/pug', (req, res) => {

    const currentFileUrl = import.meta.url
    const filePath = new URL('../templates/home.pug', currentFileUrl).pathname

    const renderedPug = pug.renderFile(filePath, { departamentos })

    res.send(renderedPug)
  })
}

export default pugRoutes
