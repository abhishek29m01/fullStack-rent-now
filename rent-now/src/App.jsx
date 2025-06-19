
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import AddNewPg from './pages/AddNewPg'
import Login from './pages/Login';
import SignUp from './pages/SignUp'
import PgFilterByCity from './pages/PgFilterByCity'
import FAQPage from './pages/FAQPage'


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
            <Route path="/frequently-ask-question" element={<FAQPage/>} />
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
