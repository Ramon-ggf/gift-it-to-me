import React, { Component } from 'react'
import AuthService from './../../../service/auth.service'

import { Container, Row, Col, Form, Button } from 'react-bootstrap'

export default class SignupForm extends Component {

    constructor() {
        super()

        this.state = {

            name: '',
            lastname: '',
            password: '',
            email: '',
            role: '',
            image: '',
            status: true

        }

        this.authService = new AuthService()
    }


    onChangeHandler = e => this.setState({ [e.target.name]: e.target.value })

    onSubmitHandler = e => {

        e.preventDefault()

        this.authService
            .signup(this.state)
            .then(response => console.log(response.data))
            .catch(err => console.log(err))

    }


    render() {

        return (

            <div>

                <Container>
                    <Row>
                        <Col md={{ span: 6, offset: 3 }}>

                            <Form onSubmit={this.onSubmitHandler}>
                                <Form.Group controlId="name">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control name="name" type="text" value={this.state.name} onChange={this.onChangeHandler} />
                                </Form.Group>
                                <Form.Group controlId="lastname">
                                    <Form.Label>Apellidos</Form.Label>
                                    <Form.Control name="lastname" type="text" value={this.state.lastname} onChange={this.onChangeHandler} />
                                </Form.Group>
                                <Form.Group controlId="password">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control name="password" type="password" value={this.state.password} onChange={this.onChangeHandler} />
                                </Form.Group>
                                <Form.Group controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control name="email" type="email" value={this.state.email} onChange={this.onChangeHandler} />
                                </Form.Group>
                                <Form.Group controlId="role">
                                    <Form.Label>Rol</Form.Label>
                                    <Form.Control as="select" name="role" value={this.state.role} onChange={this.onChangeHandler}>
                                        <option>Seleccionar</option>
                                        <option value={"ADMIN"}>ADMIN</option>
                                        <option value={"GIVER"}>GIVER</option>
                                        <option value={"RECEIVER"}>RECEIVER</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="image">
                                    <Form.Label>Imagen</Form.Label>
                                    <Form.Control name="image" type="text" value={this.state.image} onChange={this.onChangeHandler} />
                                </Form.Group>
                                <Button variant="dark" block type="submit">Registrarse como 'giver'</Button>
                                <Button variant="dark" block type="submit">Registrarse como 'receiver'</Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>

            </div>

        )

    }

}