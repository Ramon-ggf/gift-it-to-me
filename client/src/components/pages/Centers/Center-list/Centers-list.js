import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import {Link} from 'react-router-dom'


import CenterService from '../../../../service/center.service'
import CenterCard from '../Center-card/List-item'

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

                        {this.props.user && this.props.user.role === 'ADMIN' &&

                            <Link to="/centers/new">Crear nuevo centro</Link>
                        }

                        <ul>

                            {this.state.centers.map(center => <CenterCard key={center._id} {...center} userLogged={this.props.user} />)}

                        </ul>

                    </Col>
                </Row>
            </Container>
        )
    }
}