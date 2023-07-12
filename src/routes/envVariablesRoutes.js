import axios from 'axios'

const envVariablesRouters = (app) => {

  const options = {
    headers: {
      'Accept': 'application/json; version=3',
      'Authorization': `Token ${process.env.PERSONAL_TOKEN}`
    }
  }

  app.get('/variables', (req, res) => {
    
    axios.get('https://api.azion.net/variables', options)
      .then(response => {
        console.log('>>>', response)
        const results = response.data
        res.json(results)
        return
      })
      .catch(error => {
        res.status(500).send(`ERROR: ${error}`)
        console.error(error)
      })
  })

  app.get('/variables/:uuid', (req, res) => {
    
    const { uuid } = req.params

    axios.get(`https://api.azion.net/variables/${uuid}`, options)
      .then(response => {
        const results = response.data
        res.json(results)
        return
      })
      .catch(error => {
        res.status(500).send(`ERROR: ${error}`)
        console.error(error)
      })
  })

  app.post('/variables', (req, res) => {
    
    const { key, value, secret } = req.body

    axios.post('https://api.azion.net/variables', { key, value, secret }, options)
      .then(response => {

        const results = response.data
        res.json(results)
        return
      })
      .catch(error => {
        res.status(400).json({ code: error.code, message: error.message })
      })
  })

  app.put('/variables/:uuid', (req, res) => {
    const { uuid } = req.params
    const { key, value, secret } = req.body

    axios.put(`https://api.azion.net/variables/${uuid}`, { key, value, secret }, options)
      .then(response => {

        const results = response.data
        res.json(results)
        return
      })
      .catch(error => {
        res.status(400).json({ code: error.code, message: error.message })
      })
  })
  
}
export default envVariablesRouters