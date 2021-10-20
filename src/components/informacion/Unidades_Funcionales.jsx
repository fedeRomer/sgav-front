import React, { Component, forwardRef, useState } from "react";
import ReactDOM from "react-dom";
import MaterialTable from "material-table";
    //https://material-table.com/#/docs/install
    //https://github.com/mbrn/material-table#readme


const empList = [
    {
        "id": 1,
        "propietarioId": null,
        "numeroUf": 100,
        "direccion": "direccióngenerica1",
        "telefono": "11223344",
        "ubicacion": null
    },
    {
        "id": 2,
        "propietarioId": null,
        "numeroUf": 102,
        "direccion": "genericadireccion",
        "telefono": "22113344",
        "ubicacion": null
    },
    {
        "id": 3,
        "propietarioId": 1,
        "numeroUf": 109,
        "direccion": "asddsa",
        "telefono": "55512344",
        "ubicacion": null
    },
    {
        "id": 4,
        "propietarioId": null,
        "numeroUf": 100,
        "direccion": "direccióngenerica1",
        "telefono": "11223344",
        "ubicacion": null
    },
    {
        "id": 5,
        "propietarioId": null,
        "numeroUf": 102,
        "direccion": "genericadireccion",
        "telefono": "22113344",
        "ubicacion": null
    },
    {
        "id": 6,
        "propietarioId": 1,
        "numeroUf": 109,
        "direccion": "asddsa",
        "telefono": "55512344",
        "ubicacion": null
    },
    {
        "id": 7,
        "propietarioId": null,
        "numeroUf": 100,
        "direccion": "direccióngenerica1",
        "telefono": "11223344",
        "ubicacion": null
    },
    {
        "id": 8,
        "propietarioId": null,
        "numeroUf": 102,
        "direccion": "genericadireccion",
        "telefono": "22113344",
        "ubicacion": null
    },
    {
        "id": 9,
        "propietarioId": 1,
        "numeroUf": 109,
        "direccion": "asddsa",
        "telefono": "55512344",
        "ubicacion": null
    },
    {
        "id": 10,
        "propietarioId": null,
        "numeroUf": 100,
        "direccion": "direccióngenerica1",
        "telefono": "11223344",
        "ubicacion": null
    },
    {
        "id": 11,
        "propietarioId": null,
        "numeroUf": 102,
        "direccion": "genericadireccion",
        "telefono": "22113344",
        "ubicacion": null
    },
    {
        "id": 12,
        "propietarioId": 1,
        "numeroUf": 109,
        "direccion": "asddsa",
        "telefono": "55512344",
        "ubicacion": null
    }
]
  
  function Unidades_Funcionales() {
  
    const [data, setData] = useState(empList)
    const columns = [
      { title: "ID", field: "id", editable: false },
      { title: "Propietario ID", field: "propietarioId" },
      { title: "Numero Uf", field: "numeroUf" },
      { title: "Direccion", field: 'direccion', },
      { title: "Ubicacion", field: "ubicacion", }
    ]
  
  
    return (
      <div className="UnidadesFuncionales">
        <MaterialTable
          title="Unidades Funcionales"
          data={data}
          columns={columns}
          editable={{
            onRowAdd: (newRow) => new Promise((resolve, reject) => {
              const updatedRows = [...data, { id: Math.floor(Math.random() * 100), ...newRow }]
              setTimeout(() => {
                setData(updatedRows)
                resolve()
              }, 2000)
            }),
            onRowDelete: selectedRow => new Promise((resolve, reject) => {
              const index = selectedRow.tableData.id;
              const updatedRows = [...data]
              updatedRows.splice(index, 1)
              setTimeout(() => {
                setData(updatedRows)
                resolve()
              }, 2000)
            }),
            onRowUpdate:(updatedRow,oldRow)=>new Promise((resolve,reject)=>{
              const index=oldRow.tableData.id;
              const updatedRows=[...data]
              updatedRows[index]=updatedRow
              setTimeout(() => {
                setData(updatedRows)
                resolve()
              }, 2000)
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
                actions: 'Actions'
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
  
export default Unidades_Funcionales;