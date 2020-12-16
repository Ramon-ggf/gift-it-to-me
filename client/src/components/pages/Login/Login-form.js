import React, { Component } from 'react'
import AuthService from './../../../service/auth.service'

import Alert from './../../shared/Alert/Alert'

import { Container, Row, Col, Form, Button } from 'react-bootstrap'

export default class LoginForm extends Component {

    constructor() {
        super()

        this.state = {

            password: '',
            email: '',
            showToast: false,
            toastText: ''

        }

        this.authService = new AuthService()
    }


    onChangeHandler = e => this.setState({ [e.target.name]: e.target.value })

    onSubmitHandler = e => {

        e.preventDefault()

        this.authService
            .login(this.state)
            .then(response => {
                this.props.storeUser(response.data)
                this.props.history.push('/')
            })
            .catch(err => this.handleToast(true, err.message))

    }

    handleToast = (visible, text) => this.setState({ showToast: visible, toastText: text })

    render() {

        return (

            <div>
                <Container>
                    <Row>
                        <Col md={{ span: 6, offset: 3 }}>

                            <Form onSubmit={this.onSubmitHandler}>

                                <Form.Group controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control name="email" type="email" value={this.state.email} onChange={this.onChangeHandler} />
                                </Form.Group>
                                <Form.Group controlId="password">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control name="password" type="password" value={this.state.password} onChange={this.onChangeHandler} />
                                </Form.Group>

                                <Button variant="dark" block type="submit">Iniciar sesión</Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>

                <Alert show={this.state.showToast} handleToast={this.handleToast} toastText={this.state.toastText} />
            </div>

        )

    }

}