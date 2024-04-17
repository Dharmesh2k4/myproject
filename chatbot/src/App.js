import LoginForm from './components/LoginForm/LoginForm';
import Signup from './components/LoginForm/signup';
import ForgotPassword from './components/LoginForm/ForgotPassword';
import HomePage from './components/page';
import Chatbot from './Chatbot';
import {BrowserRouter,Routes,Route} from 'react-router-dom'

function App(){
  return(
     <BrowserRouter>
        <Routes>
        <Route path='/' element={<HomePage/>}></Route>
          <Route path='/login' element={<LoginForm/>}></Route>
          <Route path='/signup' element={<Signup />} />
          <Route path='/chatbot' element={<Chatbot/>}></Route>
          <Route path='/forgotpassword' element={<ForgotPassword/>}></Route>
        </Routes>
     </BrowserRouter>
        
     
  )
}
export default App;


