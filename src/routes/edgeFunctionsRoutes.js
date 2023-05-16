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
        const results = response.data.results

        const filter = results.map((fun) => {
          return {
            id: fun.id,
            name: fun.name
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
}
export default edgeFunctionsRoutes