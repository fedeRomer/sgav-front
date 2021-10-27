import React, {useState, useEffect, Component, forwardRef } from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import Cookies from 'js-cookie'
import MaterialTable from "material-table";

  export default function Propietarios() {
  

    useEffect(() => {
      fetch("http://localhost:8080/api/propietario/getall")
        .then(response => response.json())
        .then(response => {
          console.log(response);
          setData(response)
        })
    }, [])
  


    const [data, setData] = useState([])
    const columns = [
      { title: "ID", field: "id", editable: false },
      { title: "unidadFuncionalId", field: "unidadFuncionalId",type: "numeric", validate: rowData => rowData.unidadFuncionalId > 0  },
      { title: "usuarioId", field: "usuarioId",type: "numeric" }
    ]
  
  
    return (
      <div className="Propietarios">
        <MaterialTable
          title="Propietarios"
          data={data}
          columns={columns}
          editable={{
            onRowAdd: (newRow) => new Promise((resolve, reject) => {
              setTimeout(() => {
              fetch('http://localhost:8080/api/propietario/addpropietario',{
                method:"PUT",
                headers:{
                  'Content-type':"application/json"
                },
                body:JSON.stringify(newRow)
              }).then(response=>response.json())
              .then(response=>console.log(response))
              resolve()
            }, 500)}),
            onRowDelete: selectedRow => new Promise((resolve, reject) => {
              setTimeout(() => {

                fetch('http://localhost:8080/api/propietario/deletepropietario',{
                  method:"DELETE",
                  headers:{
                    'Content-type':"application/json"
                  },
                  body:JSON.stringify(selectedRow)
                }).then(response=>response.json())
                .then(response=>console.log(response))
                resolve()

              }, 500)
            }),
            onRowUpdate:(updatedRow,oldRow)=>new Promise((resolve,reject)=>{
              const index=oldRow.tableData.id;
              const updatedRows=[...data]
              updatedRows[index]=updatedRow
              setTimeout(() => {

                console.log(updatedRows);
                fetch('http://localhost:8080/api/propietario/updatepropietario',{
                  method:"POST",
                  headers:{
                    'Content-type':"application/json"
                  },
                  body:JSON.stringify(updatedRow)
                }).then(response=>response.json())
                .then(response=>console.log(response))
                resolve()


                setData(updatedRows)
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
                emptyDataSourceMessage: 'No records to display',
                filterRow: {
                    filterTooltip: 'Filter'
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