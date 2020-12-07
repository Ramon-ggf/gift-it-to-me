import React, { Component } from 'react'
import CenterService from '../../../../service/center.service'

import { Container, Row, Col, Form, Button } from 'react-bootstrap'

export default class CenterForm extends Component {

    constructor() {
        super()

        this.state = {

            name: '',
            email: '',
            phone: '',
            address: '',
            opening: '',
            image: undefined,
            status: undefined
            
        }

        this.centerService = new CenterService()
    }


    onChangeHandler = e => this.setState({ [e.target.name]: e.target.value })

    onSubmitHandler = e => {

        e.preventDefault()
      console.log(this.state)
        this.centerService
            .createNew(this.state)
            .then(response => console.log(response))
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
                                    <Form.Label>Nombre del centro</Form.Label>
                                    <Form.Control name="name" type="text" value={this.state.name} onChange={this.onChangeHandler} />
                                </Form.Group>
                                <Form.Group controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control name="email" type="email" value={this.state.email} onChange={this.onChangeHandler} />
                                </Form.Group>
                                <Form.Group controlId="phone">
                                    <Form.Label>Teléfono</Form.Label>
                                    <Form.Control name="phone" type="number" value={this.state.phone} onChange={this.onChangeHandler} />
                                </Form.Group>
                                <Form.Group controlId="address">
                                    <Form.Label>Dirección</Form.Label>
                                    <Form.Control name="address" type="text" value={this.state.address} onChange={this.onChangeHandler} />
                                </Form.Group>                               
                                <Form.Group controlId="opening">
                                    <Form.Label>Horarios</Form.Label>
                                    <Form.Control name="opening" type="text" value={this.state.opening} onChange={this.onChangeHandler} />
                                </Form.Group>
                                <Form.Group controlId="image">
                                    <Form.Label>Imagen</Form.Label>
                                    <Form.Control name="image" type="text" value={this.state.image} onChange={this.onChangeHandler} />
                                </Form.Group>
                                <Button variant="dark" block type="submit">Crear nuevo centro</Button>
                            </Form>

                        </Col>
                    </Row>
                </Container>

            </div>

        )

    }

}