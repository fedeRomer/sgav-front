import React, { useState, useContext } from 'react';
import {Form, Button} from "react-bootstrap";
import axios from 'axios';
import Cookies from 'js-cookie'

import "./Login.css";

import { UserContext } from '../../../utils/UserContext';

export default function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [firstname, setFirtsName] = useState("");
  const [lastname, setLastName] = useState("");


  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
      </Form>
    </div>
  );


  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function handleChatSession(){

    var axios = require('axios');
    var dataobj = new Object();
    dataobj.username = Cookies.get("user");
    dataobj.secret= "secret";
    dataobj.email = Cookies.get("user");
    dataobj.first_name = firstname;
    dataobj.last_name = lastname;

    var config = {
      method: 'post',
      url: 'https://api.chatengine.io/users/',
      headers: {
        'PRIVATE-KEY': '{{8de30907-db90-41bf-82ca-d2eccdfbec63}}'
      },
      data: JSON.stringify(dataobj)
    };

    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
      }


  function handleSubmit(event) {
    event.preventDefault();
    setError(null);
    setLoading(true);


    axios.post('http://localhost:8080/api/login', 
    { username: username, password: password },
    {headers: {'Content-Type': 'application/json'}}
    ).then(response => {
      
      if(response.status === 200){
        //set cookie
        const user = Cookies.set("user",username)
        const status = Cookies.set("logged_in",true)

        
        if(response.data.usuarioId.rolId === 1){
          Cookies.set("rol", "propietario")
          setFirtsName(response.data.usuarioId.nombre);
          setLastName(response.data.usuarioId.apellido);
          handleChatSession();
        }
        if(response.data.usuarioId.rolId === 2){
          Cookies.set("rol", "administracion")
        }
        if(response.data.usuarioId.rolId === 3){
          Cookies.set("rol", "guardia")
        }
        if(response.data.usuarioId.rolId === 4){
          Cookies.set("rol", "clubhouse")
        }
        
        alert('ok');
      }else{
        alert('error');
      }
      props.history.push('/home');
    }).catch(error => {
      try{
        if (error.response.status === 400) {
          alert(error.response.data)}
        else {
          setError("Algo salió mal. Por favor, inténtelo de nuevo más tarde.")
        }
      }catch(error){
        setError("Algo salió mal. Por favor, inténtelo de nuevo más tarde.")
      }
     
    });
  }

  }