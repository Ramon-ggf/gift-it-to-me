import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'


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

    changeStatus = e => {


  
        this.centerService
        .editCenter(e.target.value, {status: false})
        .then(response => this.refreshCenters())
        .catch(err => console.log(err))


    }

    render() {

        return (
            <Container>
                <h1>Lista de Centros</h1>
                <Row>
                    <Col md={4}>

                        <ul>

                            {this.state.centers.map(center => <CenterCard key={center._id} {...center} userLogged={this.props.user} delete={ this.changeStatus}/>)}

                        </ul>

                    </Col>
                </Row>
            </Container>
        )
    }
}