import React, { useState } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";


export default function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);



  //https://serverless-stack.com/chapters/create-a-login-page.html

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

    const data = { username: username.value, password: password.value };

   fetch('http://localhost:8080/api/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      //Then with the data from the response in JSON...
      .then((data) => {
        if(!(data.status === 200)){
          alert('error de login')
        }else{
          console.log('Success:', data);
          setLoading(false);
          props.history.push('/home');
          alert('Inicio de sesión exitoso')
        }
      })
      //Then with the error genereted...
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false);
        setError(error);
          alert(error, 'error de login');
      });
    


  }
}