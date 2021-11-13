//https://reactshowcase.com/black-dashboard-react

import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Sonnet from 'react-bootstrap/TabContent'
import Button from 'react-bootstrap/Button'
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker, DateTimePicker } from '@material-ui/pickers';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'




function ReportesYestadisticas() {
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [today, setToday] = useState(new Date());
    const [tipo, setTipo] = useState('');
    const [dataGeneric, setDataGeneric] = useState([])
    

    
    const columnsSos = [
        { title: "ID", field: "id", editable: false, hidden: true },
        { title: "Tipo", field: "tipo", editable: false },
        { title: "Unidad Funcional", field: "unidadFuncional",editable: false },
        { title: "Activa", field: "isactive",type: Boolean}
      ]

    const columnsExpensas = [
        { title: "ID", field: "id", editable: false },
        { title: "Titulo", field: "titulo",initialEditValue:'', validate: rowData => rowData.titulo === '' ? { isValid: false, helperText: 'titulo no puede ser vacio' } : true,},
        // { title: "Tipo", field: "tipo",initialEditValue:'', validate: rowData => rowData.tipo === '' ? { isValid: false, helperText: 'Tipo no puede ser vacio' } : true,},
        {
          title: 'Tipo',
          field: 'tipo',
          validate: rowData => rowData.tipo === '' ? { isValid: false, helperText: 'Tipo no puede ser vacio' } : true,
          lookup: { 'Vencimiento': 'Vencimiento', 'Nueva': 'Nueva', 'Info': 'Info'},
        },
        { title: "Detalle", field: 'detalle',initialEditValue:'', validate: rowData => rowData.detalle === '' ? { isValid: false, helperText: 'detalle no puede ser vacio' } : true,},
        { title: "Monto total", field: "montoTotal",type: "currency", validate: rowData => rowData.montoTotal >= 0   },
        { title: "Unidad Funcional", field: 'unidadFuncionalId', type: "numeric", validate: rowData => rowData.unidadFuncionalId > 0 },
        { title: "Propietario ID", field: 'propietarioId',type: "numeric", validate: rowData => rowData.propietarioId > 0  },
        { title: "Visto", field: 'visto',type:'boolean' }
      ]

    const columnsMulta = [
        { title: "ID", field: "id", editable: false },
        { title: "Titulo", field: "titulo",initialEditValue:'', validate: rowData => rowData.titulo === '' ? { isValid: false, helperText: 'titulo no puede ser vacio' } : true,},
        // { title: "Tipo", field: "tipo",initialEditValue:'', validate: rowData => rowData.tipo === '' ? { isValid: false, helperText: 'tipo no puede ser vacio' } : true,},
        {
          title: 'Tipo',
          field: 'tipo',
          validate: rowData => rowData.tipo === '' ? { isValid: false, helperText: 'Tipo no puede ser vacio' } : true,
          lookup: { 'Vencimiento': 'Vencimiento', 'Nueva': 'Nueva', 'Info': 'Info'},
        },
        { title: "Detalle", field: 'detalle' },
        { title: "Monto total", field: "montoTotal",type: "currency", validate: rowData => rowData.montoTotal >= 0   },
        { title: "Unidad Funcional", field: 'unidadFuncionalId', type: "numeric", validate: rowData => rowData.unidadFuncionalId > 0 },
        { title: "Propietario ID", field: 'propietarioId',type: "numeric", validate: rowData => rowData.propietarioId > 0  }      
      ]

    const columnsVisitas = [
        { title: "ID", field: "id", editable: false },
        { title: "Nombre", field: "nombre"},
        { title: "Apellido", field: "apellido"},
        { title: "Fecha de entrada", field: 'fechaEntrada',type:'datetime'},
        { title: "Fecha de salida", field: "fechaSalida",type:'datetime'},
        { title: "DNI", field: 'dni',type: "numeric"},
        { title: "UF ID", field: 'unidadFuncionalId',type:'numeric'},
        { title: 'Tipo', field: 'tipo'}
        
        //{ title: "Foto", field: 'foto' }
      ]

      
      const columnsVehiculoVisitas = [
        { title: "ID", field: "id", editable: false },
        { title: "Patente", field: "patente",initialEditValue:''},
        { title: "Fecha Vencimiento Poliza", field: "fechaVencimientoPoliza",type:'datetime'},
        { title: "DNI", field: 'dniVisitanteOwner',type: "numeric"},
        { title: "ID Visitante", field: 'fkVisitanteOwner',type: "numeric"}
      ]

    function handleCleanDateFilter() {
        setFromDate(null)
        setToDate(null)
    }

    function getData(type){

        var reporteDTO = new Object();
        if(fromDate != null){
            reporteDTO.fromDate = fromDate.setHours(0,0,0);
        }
        
        if(toDate != null){
            reporteDTO.toDate = toDate.setHours(23,59,59);
        }
        
        reporteDTO.typeOfReport = type;
        
        fetch("http://localhost:8080/api/reportes",{
            method:"POST",
            headers:{
              'Content-type':"application/json"
            },
            body:JSON.stringify(reporteDTO)
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
          setDataGeneric(response)
        })


        
    }

    function handleSelect(key) {
        if (key === 1)
        setTipo('VISITAS')
    }

    
    return (
        <div >
            <h1>Reportes</h1>

            <Row className="justify-content-md-center" md="auto">
                <h2>Filtrar por Fecha</h2>
                <Col md="auto">

                    <div>

                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                variant="inline"
                                label="Fecha de Entrada"
                                clearable='true'
                                disableFuture='true'
                                autoOk
                                maxDate={toDate}
                                format="dd/MM/yyyy"
                                value={fromDate}
                                onChange={(event) => {
                                    setFromDate(event);
                                    console.log('fecha entrada: ' + event)
                                }}

                            />
                        </MuiPickersUtilsProvider>
                    </div>



                </Col>
                <Col md="auto">
                    <div>

                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                variant="inline"
                                label="Fecha de Salida"
                                clearable
                                minDate={fromDate}
                                autoOk
                                format="dd/MM/yyyy"
                                value={toDate}
                                onChange={setFromDate}
                                onChange={(event) => {
                                    setToDate(event);
                                    console.log('fecha salida: ' + event)
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </div>
                </Col>
                <div>

                    <Button variant="primary" onClick={() => handleCleanDateFilter()}>Limpiar Fechas</Button>
                </div>
            </Row>



            <div>
                <br>
                </br>
                <br>
                </br>
                <br>
                </br>
            </div>
            {/* <Button variant="primary"  onClick={() => getData()}> Buscar</Button>     */}
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="container d-flex justify-content-center align-items-center h-100"  onClick={() => setDataGeneric([])}> 
                
                               
                <Tab eventKey='VISITAS' title="Visitas" >

                    <Button variant="primary" className="container d-flex justify-content-center align-items-center" onClick={() => getData('VISITAS')}> Buscar</Button>    
                    <br/>
                    <MaterialTable
                    
                        title="Tabla de datos"
                        columns={columnsVisitas}
                        data={dataGeneric}
                        options={{
                            exportButton: true,
                            selection: true
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
                    <Sonnet />
                </Tab>
                <Tab eventKey={2} title="Visitas Vehiculos">

                    <Button variant="primary" className="container d-flex justify-content-center align-items-center" onClick={() => getData('VISITASVEHICULO')}> Buscar</Button>
                    <MaterialTable

                        title="Tabla de datos"
                        columns={columnsVehiculoVisitas}
                        data={dataGeneric}
                        options={{
                            exportButton: true,
                            selection: true
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
                    <Sonnet />
                </Tab>
                <Tab eventKey="multas" title="Multas">
                <Button variant="primary" className="container d-flex justify-content-center align-items-center" onClick={() => getData('MULTAS')}> Buscar</Button>  
                    <MaterialTable

                        title="Tabla de datos"
                        columns={columnsMulta}
                        data={dataGeneric}
                        options={{
                            exportButton: true,
                            selection: true
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
                    <Sonnet />
                </Tab>
                <Tab eventKey="expensas" title="Expensas">
                <Button variant="primary" className="container d-flex justify-content-center align-items-center " onClick={() => getData('EXPENSAS')}> Buscar</Button>  
                    <MaterialTable

                        title="Tabla de datos"
                        columns={columnsExpensas}
                        data={dataGeneric}
                        options={{
                            exportButton: true,
                            selection: true
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
                    <Sonnet />
                </Tab>
                <Tab eventKey="sos" title="Emergencias">
                <Button variant="primary" className="container d-flex justify-content-center align-items-center " onClick={() => getData('SOS')}> Buscar</Button> 
                    <MaterialTable

                        title="Tabla de datos"
                        columns={columnsSos}
                        data={dataGeneric}
                        options={{
                            exportButton: true,
                            selection: true
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
                                exportName: 'Exportar como CSV',
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
                    <Sonnet />
                </Tab>
            </Tabs>


        </div>
    );
}

export default ReportesYestadisticas;