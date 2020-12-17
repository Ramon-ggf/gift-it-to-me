import React, { Component } from 'react'
import UploaderService from './../../../../service/uploader.service'

import { Form, Button } from 'react-bootstrap'

export default class CenterForm extends Component {

    constructor(props) {
        super(props)

        this.state = {

            name: this.props.center ? this.props.center.name : '',
            email: this.props.center ? this.props.center.email : '',
            phone: this.props.center ? this.props.center.phone : '',
            address: this.props.center ? this.props.center.address : '',
            opening: this.props.center ? this.props.center.opening : '',
            image: undefined,
            status: undefined

        }

        this.uploaderService = new UploaderService()
    }


    componentDidUpdate = (prevProps) => {

        if (this.props.center !== prevProps.center) {

            this.setState({ name: this.props.center.name, email: this.props.center.email, phone: this.props.center.phone, address: this.props.center.address, opening: this.props.center.opening })

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

            <Form onSubmit={(e) => this.props.center ? this.props.edit(e, this.state) : this.props.create(e, this.state)}>
                <Form.Group controlId="name">
                    <Form.Label>Nombre del centro</Form.Label>
                    <Form.Control name="name" type="text" value={this.state.name} onChange={this.onChangeHandler} placeholder="Nombre del centro" required/>
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control name="email" type="email" value={this.state.email} onChange={this.onChangeHandler} placeholder="Correo electrónico" required/>
                </Form.Group>
                <Form.Group controlId="phone">
                    <Form.Label>Teléfono</Form.Label>
                    <Form.Control name="phone" type="number" value={this.state.phone} onChange={this.onChangeHandler} placeholder="Número de teléfono" required/>
                </Form.Group>
                <Form.Group controlId="address">
                    <Form.Label>Dirección</Form.Label>
                    <Form.Control name="address" type="text" value={this.state.address} onChange={this.onChangeHandler} placeholder="Dirección" required/>
                </Form.Group>
                <Form.Group controlId="opening">
                    <Form.Label>Horarios</Form.Label>
                    <Form.Control name="opening" type="text" value={this.state.opening} onChange={this.onChangeHandler} placeholder="Horarios de atención" required/>
                </Form.Group>
                <Form.Group controlId="image">
                    <Form.Label>Imagen</Form.Label>
                    <Form.Control name="image" type="file" onChange={this.handleImageUpload} />
                </Form.Group>


                <Button className="btn btn-info edit-btn" block type="submit">{this.props.center ? 'Editar centro' : 'Crear nuevo centro'} </Button>
            </Form>

        )
    }
}