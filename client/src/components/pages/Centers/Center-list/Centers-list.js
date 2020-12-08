import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'


import CenterService from '../../../../service/center.service'
import CenterCard from './../../Centers/Center-card/Center-card'

export default class CentersList extends Component {
    constructor() {
        super()

        this.state = {

            centers: []

        }

        this.centerService = new CenterService()

    }

    componentDidMount = () => this.refreshCenters()

    refreshCenters = () => {

        this.centerService
            .getAll()
            .then(response => this.setState({ centers: response.data }))
            .catch(err => console.log(err))

    }

    render() {
        return (
            <Container>
                <h1>Lista de Centros</h1>
                <Row>
                    <Col md={4}>

                        <ul>

                            {this.state.centers.map(elm => <CenterCard key={elm._id} {...elm} />)}
                            
                        </ul>

                    </Col>
                </Row>
            </Container>
        )
    }
}