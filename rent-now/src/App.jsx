
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
            <Route path='/star-rating' element={<StartRatingInput/>} />
            <Route path='/comment-box' element={<CommentBox/>} />
            <Route path='/review-list' element={<ReviewList/>} />
            <Route path='review-section' element={<ReviewSection/>} />
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
