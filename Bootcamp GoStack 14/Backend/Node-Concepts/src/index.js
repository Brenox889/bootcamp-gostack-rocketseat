const express  = require('express')

const app = express()
app.use(express.json())

app.get('/projects', (request, response)=>{
  const query = request.query
  console.log(query)
  return response.json([
    'Projeto1',
    'Projeto2'
  ])
})
app.post('/projects', (request, response)=>{
  const {title, owner} = request.body
  console.log(title, owner)

  return response.json([
    'Projeto1',
    'Projeto2',
    'projeto3'
  ])
})
app.put('/projects/:id', (request, response)=>{
  const params = request.params
  console.log(params)
  return response.json([
    'Projeto4',
    'Projeto2',
    'projeto3'
  ])
})
app.delete('/projects/:id', (request, response)=>{
  return response.json([
    'Projeto2',
    'projeto3'
])
})

app.listen(3333, ()=>{
  console.log('server is running')
})