//https://github.com/FaztWeb/react-cards-bootstrap/blob/main/src/components/Cards.js
import React ,{useState, useEffect} from 'react';
import Card from "./Card";
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import image1 from '../../img/DOG1.jpg';
import image2 from "../../img/DOG2.jpg";
import image3 from "../../img/CAT1.jpg";


//https://www.youtube.com/watch?v=kXucJlW2GNM




export default function MascotasPerdidas() { 


  const [titulo, setTitulo] = useState("");
  const [detalle, setDetalle] = useState("");
  const [foto, setFoto] = useState(null);



  const cards = [
    {
      id: 1,
      titulo: "Toby",
      foto: image1,
      detalle: "Perro lindo y bueno",
      encontrado: false,
      idPropietario: 1
    },
    {
      id: 2,
      titulo: "Simba",
      foto: image2,
      detalle: "Perro lindo y cariñoso",
      encontrado: false,
      idPropietario: 2
    },
    {
      id: 3,
      titulo: "Coco",
      foto: image3,
      detalle: "Gato lindo y muy bonito",
      encontrado: false,
      idPropietario: 3
    },
  ];

  

  const [listMascotas, setListMascotas] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);


  useEffect(() => {
    fetch("http://localhost:8080/api/mascotasperdidas/getall")
    .then(response => {
      if(!response.ok){
        alert('error')
      }else{
        return response.json()
      }
    })
    .then(response => {
      console.log(response)
      setListMascotas(response)
    })
}, [])

function refreshMascotas(){

  fetch("http://localhost:8080/api/mascotasperdidas/getall")
  .then(response => {
    if(!response.ok){
      alert('error')
    }else{
      return response.json()
    }
  })
  .then(response => {
    console.log(response)
    setListMascotas(response)
  })

}
  



function MyVerticallyCenteredModal(props) {

  const [values, setValues] = useState({
    titulo: '',
    detalle: '',
    foto: null
})

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(values)    

    fetch('http://localhost:8080/api/mascotasperdidas/addmascotaperdida',{
      method:"PUT",
      headers:{
        'Content-type':"application/json"
      },
      body: JSON.stringify(values)
    }).then(response=>response.json())
    .then(response=>{
      alert(response.response)
      console.log(response)
      refreshMascotas()
    }).catch((error) =>{
      console.log(error);
    })


    
    refreshMascotas()
    setModalShow(false)
  }

  

  const handleChange = (event) => {
    // console.log(
    //    "handleChange -> " + event.target.name + " : " + event.target.value
    //  );
     
    setValues((values) => ({
       ...values,
       [event.target.name]: event.target.value,
     }));
   };

  
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Añadir Mascota Perdida
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="titulo.ControlInput1">
            <Form.Label>Titulo</Form.Label>
            <Form.Control type="textarea" placeholder="titulo" name="titulo" required 
               value={values.titulo}
               onChange={handleChange}
               />
          </Form.Group>
          <Form.Group className="mb-3" controlId="detalle.ControlTextarea1">
            <Form.Label>Detalle</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="detalle" name="detalle" required 
                           value={values.detalle}
                           onChange={handleChange}
                           />
          </Form.Group>
          <Form.Group controlId="formFileSm" className="mb-3">
            <Form.Label>Foto</Form.Label>
            <Form.Control type="file" size="sm" accept="image/*" name="foto" required 
                                       value={values.foto}
                                       onChange={handleChange}/>
          </Form.Group>
          <Button variant="danger" onClick={props.onHide}>Cancelar</Button>
          <Button variant="success" type="submit">Guardar</Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </Modal>
  );
}


  return (
  <div>

<br/>
    <div className="container d-flex justify-content-center align-items-center h-100">

    <Button variant="primary" onClick={() => setModalShow(true)}>
        Añadir Mascota Perdida
      </Button>
      <br/>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    <br/>
    </div>

    <div className="container d-flex justify-content-center align-items-center h-100"></div>

    <div className="row">

      {listMascotas.map(({ id, titulo, detalle , foto, encontrado,propietario  }) => (
        <div className="col-md-4" key={id}>
          <Card imageSource={image3} titulo={titulo} detalle={detalle} idd={id}/>
        </div>
      ))}
    </div>
  </div>
);
}
