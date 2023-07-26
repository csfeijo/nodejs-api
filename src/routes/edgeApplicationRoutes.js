import axios from 'axios'

const baseURL = process.env.VARIABLES_BASE_URL
// const baseURL = 'https://api.azionapi.net'

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

  app.get('/edge-functions/:id', (req, res) => {    
    const { id } = req.params

    axios.get(`https://api.azionapi.net/edge_functions/${id}`, options)
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