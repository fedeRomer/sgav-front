import React ,{ useState, useEffect} from 'react';
import { removeUserCookie } from '../../../utils/Common';
import Cookies from 'js-cookie';
import MaterialTable from "material-table";
 
export default function Dashboard(props) {
  
  const handleLogout = () => {
    removeUserCookie()
  }

  const user = Cookies.get("user");

  
  useEffect(() => {
    fetch("http://localhost:8080/api/usuario/getall")
      .then(response => response.json())
      .then(response => {
        console.log(response);
        setData(response)
      })
  }, [])

  function refreshTable() {

    fetch("http://localhost:8080/api/usuario/getall")
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
    {
      title: 'Rol',
      field: 'rolId',
      validate: rowData => rowData.rolId > 0,
      lookup: { 1: 'PROPIETARIO', 2: 'ADMINISTRACIÓN', 3: 'GUARDIA', 4: 'CLUBHOUSE' },
    },
    {
      title: 'Sexo',
      field: 'sexo',
      validate: rowData => rowData.sexo === '' ? { isValid: false, helperText: 'Sexo no puede ser vacio' } : true,
      lookup: { 'M': 'Masculino', 'F': 'Femenino'},
    },
    //{ title: "Sexo", field: "sexo",initialEditValue:'', validate: rowData => rowData.sexo === '' ? { isValid: false, helperText: 'sexo no puede ser vacio' } : true,},
    { title: "DNI", field: 'dni',type: "numeric", validate: rowData => rowData.dni > 0 },
    { title: "Telefono", field: 'telefono',type: "numeric", validate: rowData => rowData.telefono > 1000000 },
    { title: "Activado", field: 'enabled',type: "boolean" }
  ]


  return (
    
  <div className="PanelUsuario">
  Bienvenido {user}!<br /><br />
  <input type="button" onClick={handleLogout} value="Logout" />
<MaterialTable
  title="Panel de Usuario"
  data={data}
  columns={columns}
  editable={{
    onRowAdd: (newRow) => new Promise((resolve, reject) => {
      setTimeout(() => {
      fetch('http://localhost:8080/api/usuario/addusuario',{
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
        refreshTable()
      })
      resolve()
    }, 500)}),
    onRowDelete: selectedRow => new Promise((resolve, reject) => {
      setTimeout(() => {

        fetch('http://localhost:8080/api/usuario/deleteusuario',{
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
          refreshTable()
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
        fetch('http://localhost:8080/api/usuario/updateusuario',{
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
          refreshTable()
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