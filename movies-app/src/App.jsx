import './App.css'
import {  useSelector } from 'react-redux'
import Cookies from 'js-cookie'
/* Components */
import MovieCard from './components/MovieCard'
import Market from './components/Market'
import NavBar from './components/NavBar'
import Container from '@mui/material/Container'
import Login from './components/Login'
/* Router */
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"

//TODO: 2 Move these calls into a proper api layer
//TODO: 1 this is a really old class component refactor it into a modern functional component
const App = () => {
  const Localuser = JSON.parse(Cookies.get('user'))
  const user = useSelector(state => state.user)
  return (
    <Router>
      <Routes>
        <Route exact path='/login' element={<Login />} ></Route>  
        <Route exact path='/' element={
            user.auth || Cookies.get('token') ?           
            <Container maxWidth="lg" className="main__container">
              <NavBar/>
              <MovieCard user={ Localuser }/>  
            </Container>       
            : <Navigate to="/login" />
           } 
        />
        <Route exact path='/market' element={
            user.auth || Cookies.get('token') ?           
            <Container maxWidth="lg" className="main__container">
              <NavBar/>
              <Market exact path='/market'  user={ Localuser } />
            </Container>       
            : <Navigate to="/login" />
           } 
        /> 
      </Routes>
    </Router>
  )
}

export default App
