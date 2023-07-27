import axios from 'axios'

const baseURL = process.env.VARIABLES_BASE_URL

const edgeApplicationRoutes = (app) => {

  const options = {
    headers: {
      'Accept': 'application/json; version=3',
      'Authorization': `Token ${process.env.PERSONAL_TOKEN}`
    }
  }

  app.get('/api/edge_applications', (req, res) => {
    axios.get(`${baseURL}/edge_applications`, options)
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

  app.get('/api/edge_applications/:id', (req, res) => {    
    const { id } = req.params

    axios.get(`${baseURL}/edge_applications/${id}`, options)
      .then(response => {
        
        res.json(response.data)
        return
      })
      .catch(error => {
        res.status(500).send(`ERROR: ${error}`)
        console.error(error)
      })
  })

  app.delete('/api/edge_applications/:id', (req, res) => {    
    const { id } = req.params
    
    axios.delete(`${baseURL}/edge_applications/${id}`, options)
      .then(response => {
        
        res.json(response.data)
        return
      })
      .catch(error => {
        res.status(500).send(`ERROR: ${error}`)
        console.error(error)
      })
  })

}
export default edgeApplicationRoutes