import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'
import DetailPost from './pages/DetailPost'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes >
        <Route path='/' element={<Home />}/>
        <Route path='/create' element={<CreatePost />} />
        <Route path='/detail/:id' element={<DetailPost />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
