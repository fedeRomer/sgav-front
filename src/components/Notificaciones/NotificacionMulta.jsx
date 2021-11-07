import React, {useState, useEffect, Component, forwardRef } from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import Cookies from 'js-cookie'
import MaterialTable from "material-table";

  
export default function NotificacionMulta() {
  

    useEffect(() => {
      fetch("http://localhost:8080/api/notificationmulta/getall")
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

    fetch("http://localhost:8080/api/notificationmulta/getall")
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
      { title: "Titulo", field: "titulo",initialEditValue:'', validate: rowData => rowData.titulo === '' ? { isValid: false, helperText: 'titulo no puede ser vacio' } : true,},
      { title: "Tipo", field: "tipo",initialEditValue:'', validate: rowData => rowData.tipo === '' ? { isValid: false, helperText: 'tipo no puede ser vacio' } : true,},
      { title: "Detalle", field: 'detalle' },
      { title: "Monto total", field: "montoTotal",type: "currency", validate: rowData => rowData.montoTotal >= 0   },
      { title: "Unidad Funcional", field: 'unidadFuncionalId', type: "numeric", validate: rowData => rowData.unidadFuncionalId > 0 },
      { title: "Propietario ID", field: 'propietarioId',type: "numeric", validate: rowData => rowData.propietarioId > 0  },
      { title: "Foto", field: 'foto' }
    ]
  
  
    return (
      <div className="NotificacionesMultas">
        <MaterialTable
          title="Notificaciones Multas"
          data={data}
          columns={columns}
          editable={{
            onRowAdd: (newRow) => new Promise((resolve, reject) => {
              setTimeout(() => {
              fetch('http://localhost:8080/api/notificationmulta/addnotification',{
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

                fetch('http://localhost:8080/api/notificationmulta/deletenotification',{
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
                fetch('http://localhost:8080/api/notificationmulta/updatenotification',{
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