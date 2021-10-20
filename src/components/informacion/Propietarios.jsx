import React, { Component, forwardRef, useState } from "react";
import ReactDOM from "react-dom";
import MaterialTable from "material-table";
  
    //https://material-table.com/#/docs/install
    //https://github.com/mbrn/material-table#readme

    //TODO: pasar hardcoded -> to -> api backend
  
    const empList = [
        { id: 1, name: "Federico Romero", email: 'federico.romerobarrios@usal.edu.ar', phone: 1122334455, city: "Pilar" },
        { id: 2, name: "Fede", email: 'fede@usal.edu.ar', phone: 9812345678, city: "Del Viso" },
        { id: 3, name: "Romero", email: 'romero@usal.edu.ar', phone: 7896536289, city: "Villa Rosa" },
        { id: 4, name: "Barrios", email: 'barrios@gmail.com', phone: 9087654321, city: "Derqui" },
      ]
      
      function Propietarios() {
      
        const [data, setData] = useState(empList)
        const columns = [
          { title: "ID", field: "id", editable: false },
          { title: "Nombre", field: "name" },
          { title: "Email", field: "email" },
          { title: "Teléfono", field: 'phone', },
          { title: "Ciudad", field: "city", }
        ]
      
      
        return (
          <div className="Propietarios">
            <MaterialTable
              title="Propietarios"
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
      
export default Propietarios;