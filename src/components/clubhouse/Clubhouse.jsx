import React, {useState, useEffect} from "react";
import MaterialTable from "material-table";
import CustomDatePicker from '../customdatepicker/CustomDatePicker';

export default function Clubhouse(){


    useEffect(() => {
        fetch("http://localhost:8080/api/calendarioclubhouse/getall")
        .then(response => {
          if(!response.ok){
            //alert('error')
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

      fetch("http://localhost:8080/api/calendarioclubhouse/getall")
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
        { title: "Propietario ID", field: "propietarioId",type: "numeric", validate: rowData => rowData.propietarioId > 0  },
        { title: "Fecha", field: "fecha",type:'datetime',validate: rowData => rowData.fecha > new Date(),filterComponent: (props) => <CustomDatePicker {...props} /> },
        { title: "Duracion hs", field: 'duracionhs',type: "numeric", validate: rowData => rowData.duracionhs > 0  },
        {
          title: 'Tipo',
          field: 'tipo',
          validate: rowData => rowData.tipo === '' ? { isValid: false, helperText: 'El Tipo no puede ser vacio' } : true,
          lookup: { 'Gimnasio': 'Gimnasio', 'Cancha de Futbol': 'Cancha de Futbol', 'Cancha de Tennis': 'Cancha de Tennis', 'Evento Especial': 'Evento Especial'},
        },
      ]
    
    
      return (
        <div className="ClubhouseVisitas">
          <MaterialTable
            title="Clubhouse Visitas"
            data={data}
            columns={columns}
            actions={[
              {
                icon: 'delete',
                tooltip: 'Eliminar',
                onClick: (event, rowData) => {
                  console.log(rowData)
                  if(window.confirm("¿Está seguro que quiere eliminar la visita al clubhouse?")){

                    fetch('http://localhost:8080/api/calendarioclubhouse/deletecalendarioclubhouse',{
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
                fetch('http://localhost:8080/api/calendarioclubhouse/addcalendarioclubhouse',{
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
                  fetch('http://localhost:8080/api/calendarioclubhouse/updatecalendarioclubhouse',{
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