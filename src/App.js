import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import LandingPage from './screens/LandingPage/LandingPage';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import MyNotes from './screens/MyNotes/MyNotes';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen';
function App(){
  return (
    <BrowserRouter>
  <Header/>
  <main > 
    <Routes>
    <Route path='/' Component={LandingPage} exact/>
    <Route path='/login' Component={LoginScreen} exact/>
    <Route path='/register' Component={RegisterScreen} exact/>
    <Route path='/mynotes' Component={MyNotes}/>
    </Routes>
  </main>
  <Footer/>
    </BrowserRouter>
  )
}

export default App;
