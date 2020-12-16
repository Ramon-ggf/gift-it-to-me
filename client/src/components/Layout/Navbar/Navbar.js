import React, { Component } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import Logo from './Logo2.png'

import AuthService from '../../../service/auth.service'


export default class Navigation extends Component {


    constructor() {
        super()
        this.authService = new AuthService()
    }

    logOut = () => {
        this.authService
            .logout()
            .then(res => this.props.storeUser(undefined))
            .catch(err => console.log(err))
    }

    render() {

        return (
            <Navbar expand="md" style={{ marginBottom: '0px', backgroundColor: '#00334e'}}>
                <Link to="/">
                    <Navbar.Brand >
                        <img
                            alt="Logotipo"
                            src={Logo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}<span style={{color: 'white'}}>Regala_</span><span style={{color: '#ee6f57'}}>me</span></Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Link to="/" style={{textDecoration: 'none'}}>
                            <Nav.Link as="div" style={{ color: '#F6F5F5' }}>Inicio</Nav.Link>
                        </Link>
                        <Link to="/centers" style={{textDecoration: 'none'}}>
                            <Nav.Link as="div" style={{ color: '#F6F5F5' }}>Centros</Nav.Link>
                        </Link>
                        <Link to="/petitions" style={{textDecoration: 'none'}}>
                            <Nav.Link as="div" style={{ color: '#F6F5F5' }}>Regalos</Nav.Link>
                        </Link>
                        {
                            this.props.loggedUser
                                ?
                                <Nav.Link style={{ color: '#F6F5F5', textDecoration: 'none' }} onClick={this.logOut}>Cerrar sesión</Nav.Link>
                                :
                                <>
                                    <Link to="/signup" style={{textDecoration: 'none'}}>
                                        <Nav.Link as="div" style={{ color: '#F6F5F5' }}>Registrarse</Nav.Link>
                                    </Link>
                                    <Link to="/login" style={{textDecoration: 'none'}}>
                                        <Nav.Link as="div" style={{ color: '#F6F5F5' }}>Iniciar sesión</Nav.Link>
                                    </Link>
                                </>

                        }
                        <Link to="/profile" style={{textDecoration: 'none'}}>
                            {this.props.loggedUser && <Nav.Link as="div" style={{ color: '#F6F5F5' }}>Mi perfil</Nav.Link> }
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar >
        )
    }
}