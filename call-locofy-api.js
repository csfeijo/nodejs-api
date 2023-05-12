{
fetch('https://nodejs-api-beige.vercel.app/departamentos')
  .then(response => response.json())
  .then(data => {
    //console.log(JSON.stringify(data))
    document.getElementById('result').innerHTML = JSON.stringify(data)
  })
  .catch(error => console.error(error));
}