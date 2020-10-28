import React,{useState, useEffect} from 'react';
import api from './services/api'

import Header from './components/Header'

function App(){
  const [projects, setProjects] = useState()

  useEffect(()=>{
    api.get('projects').then(response =>{
      setProjects(response.data)
    })
  },[projects])

  function handleProjects(){
    
    setProjects([...projects, 'Novo Valor'])
  }
  return(
    <>
    <Header title='firstApp' />
    <ul>
      {projects.map(project=><li key={project.id}>{project.title}</li>)}
    </ul>
    <button type="button" onClick={handleProjects}>Adicionar Projeto</button>
    </>

  )
}

export default App