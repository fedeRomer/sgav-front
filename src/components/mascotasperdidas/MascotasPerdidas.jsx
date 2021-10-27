//https://github.com/FaztWeb/react-cards-bootstrap/blob/main/src/components/Cards.js
import React ,{useState, useEffect, Component, forwardRef } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Card from "./Card";
import image1 from '../../img/DOG1.jpg';
import image2 from "../../img/DOG2.jpg";
import image3 from "../../img/CAT1.jpg";

//https://www.youtube.com/watch?v=kXucJlW2GNM
const cards = [
  {
    id: 1,
    titulo: "Toby",
    image: image1,
    detalle: "Perro lindo y bueno",
    encontrado: false,
    idPropietario: 1
  },
  {
    id: 2,
    titulo: "Simba",
    image: image2,
    detalle: "Perro lindo y cariñoso",
    encontrado: false,
    idPropietario: 2
  },
  {
    id: 3,
    titulo: "Coco",
    image: image3,
    detalle: "Gato lindo y muy bonito",
    encontrado: false,
    idPropietario: 3
  },
];



function MascotasPerdidas(){ 

  const [listMascotas, setListMascotas] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/mascotasperdidas/getall")
      .then(response => response.json())
      .then(response => {
        console.log(response);
        setListMascotas(response)
      })
  }, [])
  

  return (
  <div className="container d-flex justify-content-center align-items-center h-100">
    <div className="row">
      {cards.map(({ titulo, detalle , image, encontrado,propietario, id }) => (
        <div className="col-md-4" key={id}>
          <Card imageSource={image} titulo={titulo} detalle={detalle} />
        </div>
      ))}
    </div>
  </div>
);
}

export default MascotasPerdidas;