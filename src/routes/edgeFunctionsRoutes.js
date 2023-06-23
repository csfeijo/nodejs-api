import axios from 'axios'

const edgeFunctionsRoutes = (app) => {

  app.get('/edge-functions', (req, res) => {
    const options = {
      headers: {
        'Accept': 'application/json; version=3',
        'Authorization': `Token ${process.env.PERSONAL_TOKEN}`
      }}

    axios.get('https://api.azionapi.net/edge_functions?page_size=200', options)
      .then(response => {

        //console.log(response.data)

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
        console.log(filter)
        res.json(filter)
        return
      })
      .catch(error => {
        res.status(500).send(`ERROR: ${error}`)
        console.error(error)
      })
  })
}
export default edgeFunctionsRoutes