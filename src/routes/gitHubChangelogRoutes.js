import axios from 'axios'

const gitHubChangelogRoutes = (app) => {


  app.get('/pk-changelog', (req, res) => {

    const options = {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': `Token ${process.env.GITHUB_TOKEN}`
      },
      params: {
        state: 'closed',
        'is:merged': true,
        per_page: 100
      },
    }
  

    const { startPeriod } = req.query
    const perPage = 100
    const deployLabel = 'DEPLOY'

    if (!startPeriod) {
      res.send('Date limit not defined')
      res.end()
      return
    }

    // const gitHubURL = 'https://api.github.com/repos/aziontech/azion-platform-kit/pulls'
    // let filter = `?state=closed&sort=merged&direction=desc&per_page=${perPage}`
    // filter += `?q=is%3Apr+is%3Amerged+merged>${startPeriod}+-label%3A${deployLabel}+`
    const gitHubURL = 'https://api.github.com/repos/aziontech/azion-platform-kit/pulls'
    

    axios.get(gitHubURL, options)
      .then(response => {

        const pullRequests = response.data
      
        const filtered = pullRequests
          .filter(pr => new Date(pr.merged_at) > new Date(startPeriod))
          .map((pr,index) => {

            return `${index} -> ${pr.merged_at}  - ${pr.title}` 
          })



        const htmlFiltered = filtered.join('<br/>')

        res.send(htmlFiltered)
        return
      })
      .catch(error => {
        res.status(500).send(`ERROR: ${error}`)
        console.error(error)
      })
  })


}
export default gitHubChangelogRoutes