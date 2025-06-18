import { useState } from 'react'
import { BrowserRouter,Router,Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import CollegeCard from './components/CollegeCard'
import PGCard from './components/PGCard'
import SliderBanner from './components/SliderBanner'
import UserLocation from './components/UserLocation'
import PGMainContainer from './components/PGMainContainer'
import AddNewPg from './pages/AddNewPg'
import Login from './pages/Login';
import SignUp from './pages/SignUp'
import PgFilterByCity from './pages/PgFilterByCity'


function App() {
  
  return (
    <>
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/addnewpg' element={<AddNewPg/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/signup' element={<SignUp/>} />
            <Route path="/pg-filter" element={<PgFilterByCity />} />
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
