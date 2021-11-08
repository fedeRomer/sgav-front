import React, {useState, useEffect, Component, forwardRef } from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import Cookies from 'js-cookie'
import MaterialTable from "material-table";
    //https://material-table.com/#/docs/install
    //https://github.com/mbrn/material-table#readme

    //TODO: manejar respuesta 200, 400, 500,



export default function UnidadesFuncionales (){
//https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
      useEffect(() => {
        fetch("http://localhost:8080/api/unidadfuncional/getall")
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

          fetch("http://localhost:8080/api/unidadfuncional/getall")
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
        { title: "Unidad Funcional", field: "numeroUf",type: "numeric", validate: rowData => rowData.numeroUf > 0 && rowData.numeroUf < 9999},
        { title: "Dirección", field: "direccion",initialEditValue:'', validate: rowData => rowData.direccion === '' ? { isValid: false, helperText: 'Direccion no puede ser vacio' } : true,},
        { title: "Telefono", field: 'telefono',type: "numeric", validate: rowData => rowData.telefono > 1000000 },
        { title: "Detalle", field: "ubicacion"}
      ]
    
    
      return (
        <div className="UnidadesFuncionales">
          <MaterialTable
            title="Unidades Funcionales"
            data={data}
            columns={columns}
            editable={{
              onRowAdd: (newRow) => new Promise((resolve, reject) => {
                setTimeout(() => {
                fetch('http://localhost:8080/api/unidadfuncional/addunidadfuncional',{
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
                  console.log(error);
                })
                resolve()
              }, 500)}),
              onRowDelete: selectedRow => new Promise((resolve, reject) => {
                setTimeout(() => {
  
                  fetch('http://localhost:8080/api/unidadfuncional/deleteunidadfuncional',{
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
                  fetch('http://localhost:8080/api/unidadfuncional/updateunidadfuncional',{
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
  