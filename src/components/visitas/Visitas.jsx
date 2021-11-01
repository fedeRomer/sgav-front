import React, {useState, useEffect, Component, forwardRef } from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import Cookies from 'js-cookie'
import MaterialTable from "material-table";
import CustomDatePicker from '../customdatepicker/CustomDatePicker';

export default function Visitas(){


    useEffect(() => {
        fetch("http://localhost:8080/api/visitante/getall")
        .then(response => {
          if(!response.ok){
            alert('error')
          }else{
            return response.json()
          }
        })
        .then(response => {
          console.log(response)
          setData(response)
        })
    }, [])
    
    function refreshTable() {

      fetch("http://localhost:8080/api/visitante/getall")
        .then(response => {
          if(!response.ok){
            alert('error')
          }else{
            return response.json()
          }
        })
        .then(response => {
          console.log(response)
          setData(response)
        })

    
  }

  
      const [data, setData] = useState([])
      const columns = [
        { title: "ID", field: "id", editable: false },
        { title: "Nombre", field: "nombre",initialEditValue:'', validate: rowData => rowData.nombre === '' ? { isValid: false, helperText: 'nombre no puede ser vacio' } : true,},
        { title: "Apellido", field: "apellido",initialEditValue:'', validate: rowData => rowData.apellido === '' ? { isValid: false, helperText: 'apellido no puede ser vacio' } : true,},
        { title: "Fecha de entrada", field: 'fechaEntrada',type:'datetime',validate: rowData => rowData.fechaEntrada > new Date(),filterComponent: (props) => <CustomDatePicker {...props} /> },
        { title: "Fecha de salida", field: "fechaSalida",type:'datetime',validate: rowData => rowData.fechaSalida > rowData.fechaEntrada,filterComponent: (props) => <CustomDatePicker {...props} /> },
        { title: "DNI", field: 'dni',type: "numeric",initialEditValue: 0, validate: rowData => rowData.dni.length < 6 ? { isValid: false, helperText: 'DNI 9 digitos' } : true,},
        { title: "UF ID", field: 'unidadFuncionalId',type:'numeric', validate: rowData => rowData.unidadFuncionalId > 0  },
        { title: "Tipo", field: 'tipo' },
        { title: "Vehiculo ID", field: 'vehiculoId',type: "numeric"},
        { title: "Foto", field: 'foto' }
      ]
    
    
      return (
        <div className="Visitas">
          <MaterialTable
            title="Visitas"
            data={data}
            columns={columns}
            editable={{
              onRowAdd: (newRow) => new Promise((resolve, reject) => {
                setTimeout(() => {
                fetch('http://localhost:8080/api/visitante/addvisitante',{
                  method:"PUT",
                  headers:{
                    'Content-type':"application/json"
                  },
                  body:JSON.stringify(newRow)
                }).then(response=>response.json())
                .then(response=>{
                  alert(response.response)
                  console.log(response)
                  refreshTable()
                }).catch((error) =>{
                  alert('Error no controlado')
                  console.log(error);
                })
                resolve()
              }, 500)}),
              onRowDelete: selectedRow => new Promise((resolve, reject) => {
                setTimeout(() => {
  
                  fetch('http://localhost:8080/api/visitante/deletevisitante',{
                    method:"DELETE",
                    headers:{
                      'Content-type':"application/json"
                    },
                    body:JSON.stringify(selectedRow)
                  }).then(response=>response.json())
                  .then(response=>{
                    alert(response.response)
                    console.log(response)
                    refreshTable()
                  }).catch((error) =>{
                    alert('Error no controlado')
                    console.log(error);
                  })
                  resolve()
                }, 500)
              }),
              onRowUpdate:(updatedRow,oldRow)=>new Promise((resolve,reject)=>{
                const index=oldRow.tableData.id;
                const updatedRows=[...data]
                updatedRows[index]=updatedRow
                setTimeout(() => {
  
                  console.log(updatedRows);
                  fetch('http://localhost:8080/api/visitante/updatevisitante',{
                    method:"POST",
                    headers:{
                      'Content-type':"application/json"
                    },
                    body:JSON.stringify(updatedRow)
                  }).then(response=>response.json())
                  .then(response=>{
                    alert(response.response)
                    console.log(response)
                    refreshTable()
                  }).catch((error) =>{
                    alert('Error no controlado')
                    console.log(error);
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