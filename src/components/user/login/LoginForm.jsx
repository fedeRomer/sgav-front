import React, { useState } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import "./Login.css";


export default function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  function handleSubmit(event) {
    event.preventDefault();
    setError(null);
    setLoading(true);


    // https://github.com/cluemediator/login-app-reactjs/blob/master/src/Login.js

    //TODO: pasar de fetch to axios para evitar error cors

    axios.post('http://localhost:8080/api/login', 
    { username: username, password: password },
    {headers: {'Content-Type': 'application/json'}}
    ).then(response => {
      
      if(response.status === 200){
        alert('ok');
      }else{
        alert('error');
      }
      props.history.push('/home');
    }).catch(error => {
      if (error.response.status === 400) {
        alert(error.response.data)}
      else {
        setError("Algo salió mal. Por favor, inténtelo de nuevo más tarde.")
      };
    });
  }

  }