import React, {Component} from 'react';
import { Carousel} from 'react-bootstrap';
import "./Home.css"
import pilar1 from '../../img/pilar-del-este-grales-7-1030x687.jpg'
import pilar2 from '../../img/pilar-del-este-grales-2.jpg'
import pilar3 from '../../img/063a0fbd-7ef8-4beb-b3d3-5d52fbee5d71_u_large.jpg'


function Home() {



  return (
    <div>

<Carousel className="carousel">
  <Carousel.Item >
    <img
      className="d-block w-100"
      src={pilar1} rounded
      alt="First slide"
    />
    <Carousel.Caption>
      <h3></h3>
      <p></p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={pilar2} rounded
      alt="Second slide"
    />

    <Carousel.Caption>
      <h3></h3>
      <p></p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={pilar3} rounded
      alt="Third slide"
    />

    <Carousel.Caption>
      <h3></h3>
      <p></p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>

<div></div>

    </div>
    
  );

  }


export default Home;