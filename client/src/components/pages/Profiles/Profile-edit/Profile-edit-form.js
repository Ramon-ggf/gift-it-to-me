import React, { Component } from 'react'
import ProfileService from './../../../../service/profile.service'

import { Container, Row, Col, Form, Button } from 'react-bootstrap'

export default class EditProfile extends Component {
    constructor() {
        super()

        this.state = {

            name: undefined,
            lastname: undefined,
            password: undefined,
            email: undefined,
            image: undefined

        }

        this.profileService = new ProfileService()
    }

    componentDidMount = () => this.refreshState()

    refreshState = () => {

        this.profileService
            .getById(this.props.match.params.user_id)
            .then(response => this.setState({ name: response.data.name, lastname: response.data.lastname, email: response.data.email, image: response.data.image }))
            .catch(err => console.log(err))
    }


    onChangeHandler = e => {

        this.setState({ [e.target.name]: e.target.value })

    }

    onSubmitHandler = e => {

        e.preventDefault()

        this.profileService
            .editProfile(this.props.match.params.user_id, this.state)
            .then(response => {

                if (this.props.match.params.user_id === this.props.user._id) {

                    this.props.storeUser(response.data)
                    this.props.history.push('/profile')
                    console.log(response.data)

                } else {

                    this.props.history.push('/users')

                }

            })
            .catch(err => console.log(err))


    }

    render() {

        console.log(this.props.user._id)

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
                                {this.props.user.role === 'ADMIN' &&
                                    <Form.Group controlId="role">
                                        <Form.Label>Rol</Form.Label>
                                        <Form.Control as="select" name="role" value={this.state.role} onChange={this.onChangeHandler}>
                                            <option>Seleccionar</option>
                                            <option value={"ADMIN"}>ADMIN</option>
                                            <option value={"GIVER"}>GIVER</option>
                                            <option value={"RECEIVER"}>RECEIVER</option>
                                        </Form.Control>
                                    </Form.Group>
                                }
                                <Form.Group controlId="image">
                                    <Form.Label>Imagen</Form.Label>
                                    <Form.Control name="image" type="text" value={this.state.image} onChange={this.onChangeHandler} />
                                </Form.Group>
                                <Button variant="dark" block type="submit">Editar</Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>

            </div>
        )
    }
}