import React, { Component } from 'react'
import CenterService from '../../../../service/center.service'

import { Container, Row, Col, Form, Button } from 'react-bootstrap'

export default class CenterEdit extends Component {

    constructor() {
        super()

        this.state = {

            name: '',
            email: '',
            phone: '',
            address: '',
            opening: '',
            image: undefined


        }

        this.centerService = new CenterService()
    }


    componentDidMount = () => this.refreshState()

    refreshState = () => {

        this.centerService
            .getById(this.props.match.params.center_id)
            .then(response => this.setState({ name: response.data.name, email: response.data.email, phone: response.data.phone, address: response.data.address, opening: response.data.opening, image: response.data.image }))
            .catch(err => console.log(err))
    }


    onChangeHandler = e => this.setState({ [e.target.name]: e.target.value })

    onSubmitHandler = e => {

        e.preventDefault()

        this.centerService
            .editCenter(this.props.match.params.center_id, this.state)
            .then(response => {

                this.props.history.push('/centers')
                console.log(response.data)
            })
            .catch(err => console.log(err))

    }


    render() {

        return (

            <div>

                { this.props.user && this.props.user.role === 'ADMIN' &&

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
                                    <Button variant="dark" block type="submit">Editar centro</Button>
                                </Form>

                            </Col>
                        </Row>
                    </Container>
                }

            </div>

        )

    }

}