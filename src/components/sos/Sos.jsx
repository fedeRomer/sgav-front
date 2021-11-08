import React, { useState} from "react";
import { styles } from './styles'
import Button from 'react-bootstrap/Button'

import { getUser, getUserType } from "../../utils/Common";

import Modal from 'react-bootstrap/Modal'


export default function Sos() {
  const [hovered, setHovered] = useState(false)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  if(getUserType() !== 'propietario'){
    //setShow(false);
  }
  function Tas (param){
    //llamado api s.o.s
    var jsonAlerta = new Object();
    jsonAlerta.tipo = param;
    jsonAlerta.usuario = getUser();
    jsonAlerta.isactive = true;

    console.log(jsonAlerta)

    fetch('http://localhost:8080//api/alerta/addalerta',{
      method:"POST",
      headers:{
        'Content-type':"application/json"
      },
      body:JSON.stringify(jsonAlerta)
    }).then(response => {
      //manejar el handleclose correctamente
      if(response.ok){
        alert('Alerta enviada exitosamente!')
        handleClose()
      }else{
        alert('error')
        handleClose()
      }
    })
    .then(response => {
      console.log(response)
    })

  }
  return (
//if usuario = tipo = propietario -> show esto
//else == datatable alertas?
    
    <>
    <div>sos</div>
      <Button variant="primary" onClick={handleShow} style={{ ...styles.button, ...{border: hovered ? '1px solid #FF0000' : '4px solid #FF0000'}}}></Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Modal.Header closeButton >
          <Modal.Title >S.O.S</Modal.Title>
        </Modal.Header>
        <Modal.Body 
              style={{ display: "flex", justifyContent: "center" }}>
          Seleccionar emergencia
        </Modal.Body>
        <Modal.Footer 
              style={{ display: "flex", justifyContent: "center" }}>
          <Button variant="danger" onClick={() => Tas('robo')}>
            Robo
          </Button>
          <Button variant="warning" onClick={() => Tas('incendio')}>
            Incendio
          </Button>
          <Button variant="info" onClick={() => Tas('ambulancia')}>
            Ambulancia
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
    
