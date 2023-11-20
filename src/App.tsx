// import * as React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout2Column from './components/Layout2Column'
import Home from 'views/Home'
import GlobalVContext from 'context/global-context'
import { iGlobalConfig } from 'types'
import './App.scss'

function App() {
  return (
    <>
      <GlobalVContext.Provider value={{} as iGlobalConfig}>
        <Routes>
          <Route element={<Layout2Column />}>
            <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />

            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </GlobalVContext.Provider>
    </>
  )
}

export default App
