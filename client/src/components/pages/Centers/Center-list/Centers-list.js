import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import { Link } from 'react-router-dom'

import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

import CenterService from '../../../../service/center.service'
import CenterCard from '../Center-card/List-item'

class CentersList extends Component {
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

                            <Link className="btn btn-info" to="/centers/new">Crear nuevo centro</Link>
                        }

                        <ul>

                            {this.state.centers.map(center => <CenterCard key={center._id} {...center} userLogged={this.props.user} />)}

                        </ul>

                    </Col>

                    <Col md={8}>
                        <Map google={this.props.google} zoom={14} initialCenter={{lat: 40.437075, lng: -3.694048}}>

                            <Marker onClick={this.onMarkerClick}
                                name={'Current location'} />

                            <InfoWindow onClose={this.onInfoWindowClose}>
                                <div>
                                    <h1>Mapa</h1>
                                </div>
                            </InfoWindow>
                        </Map>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: (process.env.REACT_APP_API_KEY)
  })(CentersList)