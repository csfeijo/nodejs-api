import axios from 'axios'

const edgeFunctionsRoutes = (app) => {

  const options = {
    headers: {
      'Accept': 'application/json; version=3',
      'Authorization': `Token ${process.env.PERSONAL_TOKEN}`
    }
  }

  app.get('/edge-functions', (req, res) => {
    
    axios.get('https://api.azionapi.net/edge_functions?page_size=200', options)
      .then(response => {

        const results = response.data.results
        const filter = results.map((fun) => {
          return {
            id: fun.id,
            name: fun.name,
            reference_count: fun.reference_count,
            active: fun.active,
            version: fun.version || '-',
            last_editor: fun.last_editor,
            language: fun.language,
            initiator_type: fun.initiator_type,
            last_modified: fun.modified,
            
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
export default edgeFunctionsRoutes