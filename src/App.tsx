import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout2Column from './components/Layout2Column'
import Home from 'views/Home'
import './App.scss'

function App() {
  return (
    <>
    <Routes>
      <Route element={<Layout2Column />}>
        <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />

        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
    </>
  )
}

export default App
