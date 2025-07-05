
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import AddNewPg from './pages/AddNewPg'
import Login from './pages/Login';
import SignUp from './pages/SignUp'
import PgFilterByCity from './pages/PgFilterByCity'
import FAQPage from './pages/FAQPage'
import AddFAQ from './pages/AddFAQ';
import StartRatingInput from './components/StartRatingInput';
import CommentBox from './components/CommentBox';
import ReviewList from './components/ReviewList';
import ReviewSection from './components/ReviewSection';
import PGDetails from './pages/PGDetails';
import OwnerDashboard from './pages/OwnerDashboard';
import AuthOTP from './pages/AuthOTP';


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
            <Route path="/add-faq" element={<AddFAQ/>} />
            <Route path='/pg-details/:id' element={<PGDetails/>} />
            <Route path='/pg-owner-dashboard' element={<OwnerDashboard/>} />
            <Route path='/verify-otp' element={<AuthOTP/>} />
            <Route path='/pgEdit/update/:id' element={<AddNewPg isEdit={true} />} />
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
