import React, { Component } from 'react'


import { Container, Row, Col, Form, Button } from 'react-bootstrap'

export default class UserForm extends Component {

    constructor(props) {
        super(props)

        this.state = {

            name: this.props.loggedUser ? this.props.loggedUser.name : '',
            lastname: this.props.loggedUser ? this.props.loggedUser.lastname : '',
            password: undefined,
            email: this.props.loggedUser ? this.props.loggedUser.email : '',
            role: this.props.loggedUser ? this.props.loggedUser.name : '',
            image: undefined,
            status: true

        }

    }

    
    componentDidUpdate = (prevProps) => {

        console.log(this.props, prevProps)

        if (this.props.loggedUser !== prevProps.loggedUser) {

            this.setState({ name: this.props.loggedUser.name, lastname: this.props.loggedUser.lastname, email: this.props.loggedUser.email, role: this.props.loggedUser.role})

        } 
    }


    onChangeHandler = e => this.setState({ [e.target.name]: e.target.value })


    render() {

        return (

            <div>

                <Form onSubmit={(e) =>  this.props.loggedUser ? this.props.edit(e, this.state) : this.props.create(e, this.state)}>
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
                    <Button variant="dark" block type="submit">{this.props.loggedUser ? 'Editar perfil' : 'Registro'}</Button>
                    <Button variant="dark" block type="submit">Registrarse como 'receiver'</Button>
                </Form>

            </div>

        )

    }

}