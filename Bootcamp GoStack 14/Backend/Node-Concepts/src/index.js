const express  = require('express')
const cors = require('cors')
const {uuid, isUuid} = require('uuidv4')
const app = express()
app.use(cors())
app.use(express.json())

const projects = []

function logRequests(request, response, next){  

  const { method, url } = request  //Recebe o metodo passado e a url que esta recebendo esse metodo
  
  const logLabel = `[${method.toUpperCase()}] ${url} ` // Recebe uma string com o metodo e o deixa em letras maiusculas e a url
  
  console.log(logLabel) // imprime a função anterior
  
  return(next) //Libera passagem para o proximo Middleware
}

function validateProjectId(request, response, next){
  const {id} = request.params

  if(!isUuid(id)){
    return response.status(400).json({error:'Invalid project ID.'})
  }
}

app.get('/projects', (request, response)=>{
  const {title} = request.query

  const results = title 
    ? projects.filter(project => project.title.includes(title))
    : projects
  return response.json(results)
})
app.post('/projects', (request, response)=>{
  const {title, owner} = request.body
  // console.log(title, owner)

  const project = { id: uuid(), title, owner}
  projects.push(project)

  return response.json(project)
})
app.put('/projects/:id', validateProjectId, (request, response)=>{
  const {id} = request.params
  const {title, owner} = request.body

  const projectIndex = projects.findIndex(project => project.id === id)

  if(projectIndex < 0){
    return response.status(400).json({error:`The project with id ${id} does not exists`})
  }

  const project = {
    id,
    title,
    owner,
  }

  projects[projectIndex] = project

  return response.json(project)
})
app.delete('/projects/:id', validateProjectId, (request, response)=>{
  const {id} = request.params

  const projectIndex = projects.findIndex(project => project.id === id)

  if(projectIndex < 0){
    return response.status(400).json({error:`The project with id ${id} does not exists`})
  }
  projects.splice(projectIndex, 1)

  return response.send()
})

app.listen(3333, ()=>{
  console.log('server is running')
})