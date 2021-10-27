import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import axios from 'axios';
import Cookies from 'js-cookie'

import LoginForm from './components/user/login/LoginForm';
import Dashboard from './components/user/dashboard/Dashboard';
import Home from './components/home/Home';
import MascotasPerdidas from './components/mascotasperdidas/MascotasPerdidas';
import Chat from './components/chat/Chat';
import Clubhouse from './components/clubhouse/Clubhouse';
import ReportesYestadisticas from './components/reportes&estadisticas/Reportes&estadisticas';
import NotificacionesMultas from './components/Notificaciones/NotificacionMulta';
import NotificacioneExpensas from './components/Notificaciones/NotificacionExpensa';
import Sos from './components/sos/Sos';
import Propietarios from './components/informacion/Propietarios';
import Unidades_Funcionales from './components/informacion/Unidades_Funcionales';
import Visitas from './components/visitas/Visitas';

import PrivateRoute from './utils/PrivateRoute';
import PublicRoute from './utils/PublicRoute';


function App() {
    //https://www.youtube.com/watch?v=YPgMnugXBJo
    const readCookie = () =>{
      const user = Cookies.get("user");
      const status = Cookies.get("logged_in")
      if (status){
        alert("Bienvenido "+user);
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
              <Nav.Link as={Link} to="/login">Login</Nav.Link> {/* <small style={{ color: 'red' }}>(Acceso sin token)</small> */}
              <Nav.Link activeclassname="active" as={Link} to="/sos" big style={{ color: 'red' }}>SOS</Nav.Link>
              <Nav.Link activeclassname="active" as={Link} to="/visitas">Visitas</Nav.Link>
              <Nav.Link activeclassname="active" as={Link} to="/dashboard">Panel Usuario</Nav.Link> {/* <small style={{ color: 'red' }}>(Acceso con token unicamente)</small> */}
              <Nav.Link activeclassname="active" as={Link} to="/mascotasperdidas">Mascotas Perdidas</Nav.Link>
              <Nav.Link activeclassname="active" as={Link} to="/chat">Chat</Nav.Link>
              <Nav.Link activeclassname="active" as={Link} to="/reportesyestadisticas">Reportes y Estadisticas</Nav.Link>
              <Nav.Link activeclassname="active" as={Link} to="/clubhouse">Clubhouse</Nav.Link>
              <NavDropdown title="Notificaciones" id="navbarScrollingDropdown">
              <Nav.Link activeclassname="active" as={Link} to="/notificacionmulta" small style={{ color: 'black' }}>Notificaciones Multas</Nav.Link>
              <Nav.Link activeclassname="active" as={Link} to="/notificacionexpensa" small style={{ color: 'black' }}>Notificaciones Expensas</Nav.Link>
              </NavDropdown>
              <NavDropdown title="Información (Seguridad)"  id="navbarScrollingDropdown"> 
              <Nav.Link activeclassname="active" as={Link} to="/propietarios" small style={{ color: 'black' }}>Propietarios</Nav.Link>
              <Nav.Link activeclassname="active" as={Link} to="/unidadesfuncionales" small style={{ color: 'black' }}>Unidades Funcionales</Nav.Link>
              </NavDropdown>
              
              

            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
      <div>
        <Switch>
          <Route exact path="/home" component={Home} />
          <PublicRoute path="/login" component={LoginForm} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/visitas" component={Visitas} />
          <PrivateRoute path="/mascotasperdidas" component={MascotasPerdidas} />
          <PrivateRoute path="/chat" component={Chat} />
          <PrivateRoute path="/clubhouse" component={Clubhouse} />
          <PrivateRoute path="/reportesyestadisticas" component={ReportesYestadisticas} />
          <PrivateRoute path="/notificacionmulta" component={NotificacionesMultas} />
          <PrivateRoute path="/notificacionexpensa" component={NotificacioneExpensas} />

          <PrivateRoute path="/propietarios" component={Propietarios} />
          <PrivateRoute path="/unidadesfuncionales" component={Unidades_Funcionales} />
          
          <PrivateRoute path="/SOS" component={Sos} />
        </Switch>
      </div>

    </Router>

);
}



function checkLoginStatus(){
  //check si usuario esta loggeado
  //TODO
  //if(){
    //si cookie es valida -> pegarle a api
  //}else{
    //si la cookie esta vencida, redirect a login
  //}
  axios.get('http://localhost:8080/api/login/checkloginstatus',
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