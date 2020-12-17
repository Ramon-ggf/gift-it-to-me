import React, { Component } from 'react'
import UploaderService from './../../../../service/uploader.service'

import { Form, Button } from 'react-bootstrap'

export default class PetitionForm extends Component {

    constructor(props) {
        super(props)

        this.state = {

            title: undefined,
            description: undefined,
            age: undefined,
            sex: undefined,
            image: undefined,
            owner: this.props.petition ? this.props.petition.owner : this.props.user._id,
            center: undefined,
            status: undefined,
            sent: undefined

        }

        this.uploaderService = new UploaderService()

    }

    componentDidUpdate = (prevProps) => {

        if (this.props.petition !== prevProps.petition) {

            this.setState({ title: this.props.petition.title, description: this.props.petition.description, age: this.props.petition.age, sex: this.props.petition.sex, owner: this.props.user._id, center: this.props.petition.center })

        }
    }

    handleImageUpload = e => {

        const uploadData = new FormData()

        uploadData.append('image', e.target.files[0])

        this.uploaderService
            .uploadImage(uploadData)
            .then(response => this.setState({ image: response.data.secure_url }))
            .catch(err => console.log('ERRORRR!', err))

    }

    onChangeHandler = e => this.setState({ [e.target.name]: e.target.value })

    render() {

        return (

            <div>

                <>

                    <Form onSubmit={(e) => this.props.petition ? this.props.edit(e, this.state) : this.props.create(e, this.state)}>

                        <Form.Group controlId="title">
                            <Form.Label>Título</Form.Label>
                            <Form.Control name="title" type="text" value={this.state.title} onChange={this.onChangeHandler} placeholder="Título del regalo" minLength="10" required />
                        </Form.Group>
                        <Form.Group controlId="description">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control name="description" type="text" value={this.state.description} onChange={this.onChangeHandler} placeholder="Descripción" minLength="10" required />
                        </Form.Group>
                        <Form.Group controlId="age">
                            <Form.Label>Edad del soñador/a</Form.Label>
                            <Form.Control name="age" type="number" value={this.state.age} onChange={this.onChangeHandler} placeholder="Edad del soñador" required />
                        </Form.Group>
                        <Form.Group controlId="sex">
                            <Form.Label>Sexo del soñador/a</Form.Label>
                            <Form.Control as="select" name="sex" value={this.state.sex} onChange={this.onChangeHandler}>
                                <option>Seleccionar</option>
                                <option value={"masculino"}>Masculino</option>
                                <option value={"femenino"}>Femenino</option>
                                <option value={"no definido"}>No definido</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="center">
                            <Form.Label>Centro de recogida</Form.Label>
                            <Form.Control as="select" name="center" value={this.state.center} onChange={this.onChangeHandler}>
                                <option>Seleccionar</option>
                                {this.props.centers && this.props.centers.map(elm => <option key={elm._id} value={elm._id}>{elm.name}</option>)}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="image">
                            <Form.Label>Imagen</Form.Label>
                            <Form.Control name="image" type="file" onChange={this.handleImageUpload} />
                        </Form.Group>

                        <Button className="btn btn-info edit-btn" block type="submit">{this.props.petition ? 'Editar regalo' : 'Crear regalo'}</Button>

                    </Form >

                </>


            </div>

        )
    }


}