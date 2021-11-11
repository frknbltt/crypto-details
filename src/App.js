import React from 'react'
import Dashboard from './components/Dashboard'
import { Trades } from './components/Trades'
import ContextProvider from './context/Context.js'

 const App = () => {
  return (
    <div className="app">
      <ContextProvider>
         <Dashboard/>
        <Trades/>
      </ContextProvider>
     
    </div>
  )
}
export default App