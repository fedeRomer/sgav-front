import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import {  getUserType} from './Common';
import Spinner from 'react-bootstrap/Spinner'
import Cookies from 'js-cookie'

//private route con api para privilegios
export default class PrivateRoutes extends Component {
    constructor(props) {
        super(props)
        //TODO: traer lista de /paths autorizados y matchear?

        //4 tipos de roles, cada rol tiene acceso a distintas pags
        
        this.state = {
            hasAccess: false,
            isLoading: true,
            checkedAcces:false
        }
        this.hasAccess = this.hasAccess.bind(this)
        this.hasAccess()
    }

    componentDidMount() {

        this.hasAccess()
    }

  

      
    hasAccess() {

        var checkAccessObj = new Object();
        checkAccessObj.typeOfUser = getUserType();
        checkAccessObj.moduleToAccess = this.props.path;
        fetch("http://localhost:8080/api/usuario/checkaccess",{
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(checkAccessObj)
        }).then(response => {
            if(response.ok){
                this.setState({
                    hasAccess: true,
                    isLoading: false,
                    checkedAcces: true
                })
            } else {
                this.setState({
                    hasAccess: false,
                    isLoading: false,
                    checkedAcces: true
                    
                })
                
            }
        })
        .catch((err) => {
            console.log('Error', err)
        })
    }
    render() {
        const Component = this.props.component
        if (this.state.isLoading === true) {
            
            return (<div>Cargando...<Spinner animation="border"  variant="primary" size="35"/></div>)
            
        }
        return(
            <Route render={
                (props) => this.state.hasAccess && !this.state.isLoading  ? 
                (<Component {...this.props}/>) : (<Redirect to ='/login' />)
            } />
            
        )
            
    }
}