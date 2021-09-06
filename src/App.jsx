import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap'
import axios from 'axios';
import Cookies from 'js-cookie'

import LoginForm from './components/user/login/LoginForm';
import Dashboard from './components/user/dashboard/Dashboard';
import Home from './components/home/Home';

import PrivateRoute from './utils/PrivateRoute';
import PublicRoute from './utils/PublicRoute';


function App() {
    //https://www.youtube.com/watch?v=YPgMnugXBJo
    const readCookie = () =>{
      const user = Cookies.get("user");
      const status = Cookies.get("logged_in")
      if (status){
        alert("welcome "+user);
      }
    }
    React.useEffect(() => {
      readCookie();
    })

  return (
    <Router>
      <div>
        <Navbar bg="dark" variant={"dark"} expand="lg">
          <Navbar.Brand href="/home">SGAV</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="mr-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link as={Link} to="/home">Inicio</Nav.Link>
              <Nav.Link as={Link} to="/login">Login</Nav.Link><small style={{ color: 'red' }}>(Acceso sin token)</small>
              <Nav.Link activeclassname="active" as={Link} to="/dashboard">Panel Usuario</Nav.Link><small style={{ color: 'red' }}>(Acceso con token unicamente)</small>

            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
      <div>
        <Switch>
          <Route exact path="/home" component={Home} />
          <PublicRoute path="/login" component={LoginForm} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
        </Switch>
      </div>

    </Router>

);
}



function checkLoginStatus(){
  //check si usuario esta loggeado
  
  //if(){
    //si cookie es valida -> pegarle a api
  //}else{
    //si la cookie esta vencida, redirect a login
  //}
  axios.get('http://localhost:8080/api/login/checkloginstatus',
  {withCredentials: true},
  //{user: user},
  {headers: {'Content-Type': 'application/json'}}
  ).then(response => {

    if(response.status === 200){
      //logged in
      alert('ok');
    }else{
      //error
      alert('error');
    }
  })
} 






export default App;