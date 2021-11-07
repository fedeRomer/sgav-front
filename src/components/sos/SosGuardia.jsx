import React, { useState, useEffect, Component } from "react";
import { styles } from './styles'
import Button from 'react-bootstrap/Button'
import MaterialTable from "material-table";
import Icon from '@mui/material/Icon';

import { getUser, getUserType } from "../../utils/Common";

import Modal from 'react-bootstrap/Modal'


export default function SosDatatable() {
  

    useEffect(() => {
      fetch('http://localhost:8080/api/alerta/getallactivealerts',{
        method:"POST",
      })
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
  
    fetch('http://localhost:8080/api/alerta/getallactivealerts',{
      method:"POST",
    }).then(response => {
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

  function desactivarAlerta(rowData) {
      
    console.log(rowData)
    rowData.isactive = false;


    fetch('http://localhost:8080/api/alerta/updatealerta',{
        method:"PUT",
        headers:{
          'Content-type':"application/json"
        },
        body:JSON.stringify(rowData)
      })      .then(response => {
        if(!response.ok){
          alert('error')
        }else{
          alert('Alerta desactivada');
          refreshTable()
        }
      })
      .then(response => {
        console.log(response)
      })

    refreshTable()
  
  }
  
  
    const [data, setData] = useState([])
    const columns = [
      { title: "ID", field: "id", editable: false, hidden: true },
      { title: "Tipo", field: "tipo", editable: false },
      { title: "Unidad Funcional", field: "unidadFuncional",editable: false },
      { title: "Activa", field: "isactive",type: Boolean}
    ]
  
  
    return (
      <div className="NotificacionesMultas">
        <MaterialTable
          title="Alertas SOS"
          data={data}
          columns={columns}
          actions={[
            {
              icon: 'check',
              tooltip: 'Desactivar Alerta SOS',
              onClick: (event, rowData) => desactivarAlerta(rowData)
            }
          ]}

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
                actions: 'Desactivar Alerta SOS'
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