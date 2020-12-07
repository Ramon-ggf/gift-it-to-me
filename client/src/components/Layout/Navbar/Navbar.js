import React, { Component } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

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
            <Navbar bg="dark" variant="dark" expand="md" style={{ marginBottom: '50px' }}>
                {/* <Link to="/">
                    <Navbar.Brand >
                        <img
                            alt="Logotipo"
                            src={logo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}PlanetCoaster_</Navbar.Brand>
                </Link> */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Link to="/">
                            <Nav.Link as="div">Inicio</Nav.Link>
                        </Link>
                        <Link to="/centers">
                            <Nav.Link as="div">Centros</Nav.Link>
                        </Link>
                        <Link to="/petitions">
                            <Nav.Link as="div">Regalos</Nav.Link>
                        </Link>
                        {
                            this.props.loggedUser
                                ?
                                <Nav.Link as="div" onClick={this.logOut}>Cerrar sesión</Nav.Link>
                                :
                                <>
                                    <Link to="/signup">
                                        <Nav.Link as="div">Registrarse</Nav.Link>
                                    </Link>
                                    <Link to="/login">
                                        <Nav.Link as="div">Iniciar sesión</Nav.Link>
                                    </Link>
                                </>

                        }
                        <Link to="/profile">
                            <Nav.Link as="div">Hola, {this.props.loggedUser ? this.props.loggedUser.username : 'invitado'}</Nav.Link>
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar >
        )
    }
}