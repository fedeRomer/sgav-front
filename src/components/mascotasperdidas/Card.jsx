import React from "react";
import PropTypes from "prop-types";

import "./Card.css";

function Card({ imageSource, titulo, detalle }) {
  return (
    <div className="card text-center bg-dark animate__animated animate__fadeInUp">
      <div className="overflow">
        <img src={imageSource} alt="a wallpaper" className="card-img-top" />
      </div>
      <div className="card-body text-light">
        <h4 className="card-title">{titulo}</h4>
        <p className="card-text text-secondary">{detalle}</p>
      </div>
    </div>
  );
}

Card.propTypes = {
  titulo: PropTypes.string,
  detalle: PropTypes.string,
  imageSource: PropTypes.string,
  id: PropTypes.number,
  encontrado: PropTypes.bool,
  id_propietario: PropTypes.number

};

export default Card;