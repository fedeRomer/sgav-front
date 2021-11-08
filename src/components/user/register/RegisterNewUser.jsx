import React, { useState, useEffect } from 'react';
import MaterialTable from "material-table";
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default function AltaUser(props) {


  const [modalShow, setModalShow] = React.useState(false);

  function MyVerticallyCenteredModal(props) {

    const [values, setValues] = useState(
      {
      email: '',
      username: '',
      password: '',
      usuarioId:'',
      loggedIn: false
      }
  )
  
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log(values)    
  
      fetch('http://localhost:8080/api/login/registration',{
        method:"PUT",
        headers:{
          'Content-type':"application/json"
        },
        body: JSON.stringify(values)
      }).then(response=>response.json())
      .then(response=>{
        alert(response.response)
        console.log(response)
        refreshTable()
      }).catch((error) =>{
        console.log(error);
      })
  
  
      
      refreshTable()
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
            Añadir Nuevo Login (ID usuario requerido, verificar en Panel de Usuario)
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="titulo.ControlInput1">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Email" name="email" required 
                 value={values.email}
                 onChange={handleChange}
                 />
            </Form.Group>
            <Form.Group className="mb-3" controlId="detalle.ControlInput1">
              <Form.Label>Usuario</Form.Label>
              <Form.Control type="text" rows={3} placeholder="Usuario" name="username" minlength="6" required 
                             value={values.username}
                             onChange={handleChange}
                             />
            </Form.Group>
            <Form.Group className="mb-3" controlId="username.ControlInput1">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" rows={3} placeholder="Contraseña" minLength="8" maxLength="20" name="password" required 
                             value={values.password}
                             onChange={handleChange}
                             />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password.ControlInput1">
              <Form.Label>ID usuario (Panel Usuario)</Form.Label>
              <Form.Control type="number" min="1"max="999999" rows={3} placeholder="ID usuario (Panel Usuario)" name="usuarioId" required 
                             value={values.usuarioId}
                             onChange={handleChange}
                             />
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
  
  

  useEffect(() => {
    fetch("http://localhost:8080/api/login/getalllogin",{
      method: "POST"
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        setData(response)
      })
  }, [])

  function refreshTable() {

    fetch("http://localhost:8080/api/login/getalllogin",{
      method: "POST"
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        setData(response)
      })

  }


  const [data, setData] = useState([])

  const columns = [
    { title: "ID login", field: "id", editable: false },
    {
      title: "Email", field: "email",initialEditValue:'', validate: rowData => {
        if (rowData.email === undefined || rowData.email === null ||rowData.email === "") {
          return "Email requerido"
        } else if (!rowData.email.includes('@' && '.')) {
          return "Email invalido"
        }
        return true
      }
    },
    { title: "Usuario", field: "username",initialEditValue:'', validate: rowData => rowData.username.length < 6 ? { isValid: false, helperText: 'El usuario debe tener mas de 6 caracteres' } : true, },
    { title: "Contraseña", field: 'password',initialEditValue:'', validate: rowData => rowData.password.length < 8 ? { isValid: false, helperText: 'La contraseña debe tener mas de 8 caracteres' } : true, },
    { title: "ID de usuario", field: 'usuarioId.id', type: "numeric",validate: rowData => rowData.usuarioId.id > 0  },
    { title: "Sesión Iniciada", field: 'loggedIn',type: "boolean" }

  ]


  return (

    <div className="PanelUsuarioABM">
      <div className="container d-flex justify-content-center align-items-center h-100">
    <Button variant="primary" onClick={() => setModalShow(true)}>
        Añadir Nuevo Usuario (login)
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      </div>
      <MaterialTable
        title="Panel Login ABM"
        data={data}
        columns={columns}
        actions={[
          {
            icon: 'delete',
            tooltip: 'Eliminar usuario',
            onClick: (event, rowData) => {
              console.log(rowData)
              if(window.confirm("¿Está seguro que quiere eliminar el usuario : " + rowData.username)){

                fetch('http://localhost:8080/api/login/deletelogin',{
                  method:"DELETE",
                  headers:{
                    'Content-type':"application/json"
                  },
                  body:JSON.stringify(rowData)
                }).then(response=>response.json())
                .then(response=>{
                  alert(response.response)
                  console.log(response)
                  refreshTable()
                }).catch((error) =>{
                  console.log(error);
                  refreshTable()
                })

              }
                
            }
          }
        ]}
        editable={{
          // onRowAdd: (newRow) => new Promise((resolve, reject) => {
          //   setTimeout(() => {
          //     fetch('http://localhost:8080/api/login/addusuario', {
          //       method: "PUT",
          //       headers: {
          //         'Content-type': "application/json"
          //       },
          //       body: JSON.stringify(newRow)
          //     }).then(response => response.json())
          //       .then(response => {
          //         alert(response.response)
          //         console.log(response)
          //       }).catch((error) => {
          //         alert('Error no controlado')
          //         console.log(error);
          //       })
          //     resolve()
          //   }, 500)
          // }),
          onRowUpdate: (updatedRow, oldRow) => new Promise((resolve, reject) => {
            const index = oldRow.tableData.id;
            const updatedRows = [...data]
            updatedRows[index] = updatedRow
            setTimeout(() => {

              console.log(updatedRows);
              fetch('http://localhost:8080/api/login/updatelogin', {
                method: "POST",
                headers: {
                  'Content-type': "application/json"
                },
                body: JSON.stringify(updatedRow)
              }).then(response => response.json())
                .then(response => {
                  alert(response.response)
                  console.log(response)
                  refreshTable()
                }).catch((error) => {
                  console.log(error);
                  refreshTable()
                })
              resolve()
            }, 500)
          })

        }}
        options={{
          actionsColumnIndex: -1, addRowPosition: "first",
          exportButton: true
        }}
        localization={{
          pagination: {
            labelDisplayedRows: '{from}-{to} of {count}'
          },
          pagination: {
            labelRowsSelect: 'Filas'
          },
          toolbar: {
            nRowsSelected: '{0} fila(s) seleccionadas',
            searchPlaceholder: 'Buscar',
            exportTitle: 'Exportar',
            exportName: 'Exportar como',
            exportAriaLabel: 'Exportar como'
          },
          header: {
            actions: 'Acciones'
          },
          body: {
            emptyDataSourceMessage: 'No hay registros para mostrar',
            filterRow: {
              filterTooltip: 'Filtrar'
            },
            editRow: {
              deleteText: '¿Está seguro de eliminar este registro?'
            },
            addTooltip: 'Añadir'
          }
        }}
      />
    </div>




  );
}