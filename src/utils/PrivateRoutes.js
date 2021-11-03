import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import {  getUserType} from './Common';

//private route con api para privilegios
export default class PrivateRoutes extends Component {
    constructor(props) {
        super(props)

        this.state = {
            hasAccess: false,
            isLoading: true
        }
        this.hasAccess = this.hasAccess.bind(this)
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
                    isLoading: false
                })
            } else {
                this.setState({
                    hasAccess: false,
                    isLoading: false
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
            return (<div>Cargando...</div>)
        }
        return(
            <Route render={(props) => this.state.hasAccess && !this.state.isLoading ? (<Component {...this.props}/>) : (<Redirect to ='/login' />)} />
        )
            
    }
}