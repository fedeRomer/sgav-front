import React, {useState, useEffect} from "react";
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

        fetch("http://localhost:8080/api/visitantevehiculo/getall")
        .then(response => {
          if(!response.ok){
            alert('error')
          }else{
            return response.json()
          }
        })
        .then(response => {
          console.log(response)
          setDataVehiculo(response)
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


        fetch("http://localhost:8080/api/visitantevehiculo/getall")
        .then(response => {
          if(!response.ok){
            alert('error')
          }else{
            return response.json()
          }
        })
        .then(response => {
          console.log(response)
          setDataVehiculo(response)
        })


    
  }

  
      const [data, setData] = useState([])
      const columns = [
        { title: "ID", field: "id", editable: false },
        { title: "Nombre", field: "nombre",initialEditValue:'', validate: rowData => rowData.nombre === '' ? { isValid: false, helperText: 'nombre no puede ser vacio' } : true,},
        { title: "Apellido", field: "apellido",initialEditValue:'', validate: rowData => rowData.apellido === '' ? { isValid: false, helperText: 'apellido no puede ser vacio' } : true,},
        { title: "Fecha de entrada", field: 'fechaEntrada',type:'datetime',validate: rowData => rowData.fechaEntrada > new Date(),filterComponent: (props) => <CustomDatePicker {...props} /> },
        { title: "Fecha de salida", field: "fechaSalida",type:'datetime',validate: rowData => rowData.fechaSalida > rowData.fechaEntrada,filterComponent: (props) => <CustomDatePicker {...props} /> },
        { title: "DNI", field: 'dni',type: "numeric",validate: rowData =>  rowData.dni > 1000000},
        { title: "UF ID", field: 'unidadFuncionalId',type:'numeric', validate: rowData => rowData.unidadFuncionalId > 0  },
        { title: "Tipo", field: 'tipo' }
        //{ title: "Foto", field: 'foto' }
      ]

      const [datavehiculo, setDataVehiculo] = useState([])
      const columnsvehiculo = [
        { title: "ID", field: "id", editable: false },
        { title: "Patente", field: "patente",initialEditValue:'', validate: rowData => rowData.patente === '' ? { isValid: false, helperText: 'patente no puede ser vacio' } : true,},
        { title: "Fecha Vencimiento Poliza", field: "fechaVencimientoPoliza",type:'datetime',validate: rowData => rowData.fechaVencimientoPoliza > new Date(),helperText: 'No se pueden ingresar vehiculos con poliza vencida'  ,filterComponent: (props) => <CustomDatePicker {...props} />},
        { title: "DNI", field: 'dniVisitanteOwner',type: "numeric", validate: rowData => rowData.dniVisitanteOwner > 1000000  },
        { title: "ID Visitante", field: 'fkVisitanteOwner',type: "numeric", validate: rowData => rowData.fkVisitanteOwner > 0  }
      ]


    
    
      return (
        <div className="Visitas">
          <div>
          <MaterialTable
            title="Visitas"
            data={data}
            columns={columns}
            actions={[
              {
                icon: 'delete',
                tooltip: 'Eliminar visita',
                onClick: (event, rowData) => {
                  console.log(rowData)
                  if(window.confirm("¿Está seguro que quiere eliminar la visita : " + rowData.dni)){

                    fetch('http://localhost:8080/api/visitante/deletevisitante',{
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
                    })

                  }
                    
                }
              }
            ]}
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
                  console.log(error);
                })
                resolve()
              }, 500)}),
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

         <div>

          <MaterialTable
            title="Vehiculo Visitas (Dar de alta la visita previo al vehiculo)"
            data={datavehiculo}
            columns={columnsvehiculo}
            actions={[
              {
                icon: 'delete',
                tooltip: 'Eliminar vehiculo',
                onClick: (event, rowData) => {
                  console.log(rowData)
                  if(window.confirm("¿Está seguro que quiere eliminar el vehiculo con la patente: " + rowData.patente)){

                    fetch('http://localhost:8080/api/visitantevehiculo/deletevisitantevehiculo',{
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
                    })

                    alert('confirmado')
                  }else{

                    alert('no confirmado')
                  }
                    
                  
                  

                  
                }
              }
            ]}
            editable={{
              onRowAdd: (newRowVehiculo) => new Promise((resolve, reject) => {
                setTimeout(() => {
                fetch('http://localhost:8080/api/visitantevehiculo/addvisitantevehiculo',{
                  method:"PUT",
                  headers:{
                    'Content-type':"application/json"
                  },
                  body:JSON.stringify(newRowVehiculo)
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
              // onRowDelete: selectedRowDelete => new Promise((resolve, reject) => {
              //   setTimeout(() => {
  
              //     fetch('http://localhost:8080/api/visitantevehiculo/deletevisitantevehiculo',{
              //       method:"DELETE",
              //       headers:{
              //         'Content-type':"application/json"
              //       },
              //       body:JSON.stringify(selectedRowDelete)
              //     }).then(response=>response.json())
              //     .then(response=>{
              //       alert(response.response)
              //       console.log(response)
              //       refreshTable()
              //     }).catch((error) =>{
              //       alert('Error no controlado')
              //       console.log(error);
              //     })
              //     resolve()
              //   }, 500)
              // }),
              onRowUpdate:(updatedRowVehiculo,oldRowVehiculo)=>new Promise((resolve,reject)=>{
                const index=oldRowVehiculo.tableData.id;
                const updatedRows=[...data]
                updatedRows[index]=updatedRowVehiculo
                setTimeout(() => {
  
                  console.log(updatedRows);
                  fetch('http://localhost:8080/api/visitantevehiculo/updatevisitantevehiculo',{
                    method:"POST",
                    headers:{
                      'Content-type':"application/json"
                    },
                    body:JSON.stringify(updatedRowVehiculo)
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
          


        
        </div>
      );
    }