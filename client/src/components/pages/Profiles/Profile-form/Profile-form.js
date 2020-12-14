import React, { Component } from 'react'
import UploaderService from './../../../../service/uploader.service'

import { Form, Button } from 'react-bootstrap'

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

        this.uploaderService = new UploaderService()
    }


    componentDidUpdate = (prevProps) => {

        if (this.props.loggedUser !== prevProps.loggedUser) {

            this.setState({ name: this.props.loggedUser.name, lastname: this.props.loggedUser.lastname, email: this.props.loggedUser.email, role: this.props.loggedUser.role })

        }
    }

    handleImageUpload = e => {

        const uploadData = new FormData()

        uploadData.append('image', e.target.files[0])

        this.uploaderService
            .uploadImage(uploadData)
            .then(response =>this.setState({ image: response.data.secure_url }))
            .catch(err => console.log('ERRORRR!', err))

    }

    onChangeHandler = e => this.setState({ [e.target.name]: e.target.value })


    render() {

        return (

            <div>

                <Form onSubmit={(e) => e.target[6].name === 'button-edit' ? this.props.edit(e, this.state) : this.props.create(e, this.state)}>

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
                        <Form.Label>Elige el tipo de perfil</Form.Label>
                        <Form.Control as="select" name="role" value={this.state.role} onChange={this.onChangeHandler}>
                            <option>Seleccionar</option>
                            {this.props.adminUser && this.props.adminUser.role === 'ADMIN' && <option value={"ADMIN"}>Admin</option>}
                            <option value={"GIVER"}>Donante</option>
                            <option value={"RECEIVER"}>Soñador/a</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="image">
                        <Form.Label>Imagen</Form.Label>
                        <Form.Control name="image" type="file" onChange={this.handleImageUpload} />
                    </Form.Group>

                    <Button variant="dark" block name={this.props.path.includes('edit') ? "button-edit" : "button-sign"} type="submit">
                        {this.props.path.includes('edit') ? 'Editar perfil' : 'Registrar usuario'}
                    </Button>

                </Form>

            </div>

        )

    }

}