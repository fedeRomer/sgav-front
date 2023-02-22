import React, {useState, useEffect} from "react";
import MaterialTable from "material-table";

  export default function Propietarios() {
  

    useEffect(() => {
      fetch("http://localhost:8080/api/propietario/getall")
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

    fetch("http://localhost:8080/api/propietario/getall")
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
      { 
        title: "unidadFuncionalId", 
        field: "unidadFuncionalId.id",
        type: "numeric", 
        validate: rowData => rowData.unidadFuncionalId && rowData.unidadFuncionalId.id > 0 ? true : "ID debe ser mayor que 0"
      },
      { 
        title: "numeroUf", 
        field: "unidadFuncionalId.numeroUf",
        type: "numeric", 
        validate: rowData => rowData.unidadFuncionalId && rowData.unidadFuncionalId.numeroUf > 0 ? true : "Unidad funcional debe ser mayor que 0"
      },
      { 
        title: "usuarioId", 
        field: "usuarioId.id",
        type: "numeric", 
        validate: rowData => rowData.usuarioId && rowData.usuarioId.id > 0 ? true : "ID usuario debe ser mayor que 0"
      },
      {
        title: "Nombre",
        field: "usuarioId.nombre",
        validate: rowData => rowData.usuarioId && rowData.usuarioId.nombre ? true : "Nombre no puede ser vacio"
      },
      {
        title: "Apellido",
        field: "usuarioId.apellido",
        validate: rowData => rowData.usuarioId && rowData.usuarioId.apellido ? true : "Apellido no puede ser vacio"
      }    ]
  
  
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

                fetch('http://localhost:8080/api/propietario/deletepropietario',{
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
                fetch('http://localhost:8080/api/propietario/updatepropietario',{
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