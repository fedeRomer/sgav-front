import React ,{useState, useEffect, Component, forwardRef } from 'react';
import PropTypes from "prop-types";
import Button from 'react-bootstrap/Button'

import "./Card.css";




function Card({ imageSource, titulo, detalle, idd}) {



  const handleEncontrado = () => {

    var jsonMascota = new Object();
    jsonMascota.id = idd;
    jsonMascota.titulo = titulo;
    jsonMascota.detalle = detalle;
    jsonMascota.encontrado = true;
 
    //do call a metodo para persistir o persistir aca
    if(window.confirm('¿Está seguro que desea marcar esta mascota como encontrada?')){
      fetch('http://localhost:8080/api/mascotasperdidas/updatemascotaperdida',{
        method:"POST",
        headers:{
          'Content-type':"application/json"
        },
        body:JSON.stringify(jsonMascota)
      }).then(response=>response.json())
      .then(response=>{
        alert(response.response)
        console.log(response)
      }).catch((error) =>{
        console.log(error);
      })
      window.location.reload();
    }else{
      
      
    }
    
  }
  const handleDelete = () => {

    var jsonMascota = new Object();
    jsonMascota.id = idd;
    jsonMascota.titulo = titulo;
    jsonMascota.detalle= detalle;
 
    console.log(jsonMascota)
    //do call a metodo para persistir o persistir aca
    if(window.confirm('¿Está seguro que desea eliminar esta mascota?')){

      fetch('http://localhost:8080/api/mascotasperdidas/deletemascotaperdida',{
        method:"DELETE",
        headers:{
          'Content-type':"application/json"
        },
        body:JSON.stringify(jsonMascota)
      }).then(response=>response.json())
      .then(response=>{
        alert(response.response)
        console.log(response)
        window.location.reload();
      }).catch((error) =>{
        console.log(error);
      })

    }else{
      
      
    }
  }


  return (
    <div className="card text-center bg-dark animate__animated animate__fadeInUp">
      <div className="overflow">
        <img src={imageSource} alt="a wallpaper" className="card-img-top" />
      </div>
      <div className="card-body text-light">
        <h4 className="card-title">{titulo}</h4>
        <p className="card-text text-secondary">{detalle}</p>
      </div>
      <div> 
      <Button variant="danger" onClick={() => handleDelete()}
      >Eliminar</Button> {'--'}
      <Button variant="success" onClick={() => handleEncontrado()}
      >Marcar como Encontrado</Button>
      </div>
    </div>
  );


}

Card.propTypes = {
  idd: PropTypes.number,
  titulo: PropTypes.string,
  detalle: PropTypes.string,
  imageSource: PropTypes.string,
  id: PropTypes.number,
  encontrado: PropTypes.bool,
  id_propietario: PropTypes.number

};




export default Card;