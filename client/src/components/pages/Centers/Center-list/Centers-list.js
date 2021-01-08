import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import Geocode from "react-geocode"

import CenterService from '../../../../service/center.service'
import CenterCard from '../Center-card/List-item'

Geocode.setApiKey(process.env.REACT_APP_API_KEY);

class CentersList extends Component {
    constructor() {
        super()

        this.state = {
            centers: undefined,
            coord: []
        }
        this.centerService = new CenterService()
    }

    componentDidMount = () => this.refreshCenters()

    refreshCenters = () => {

        const all = []

        this.centerService
            .getAll()
            .then(response => {

                this.setState({ centers: response.data })

                response.data.forEach(elm => {
                    Geocode
                        .fromAddress(elm.address)
                        .then(
                            response => {
                                const { lat, lng } = response.results[0].geometry.location
                                all.push([{ ...elm, lat, lng }])
                                this.setState({ coord: all })
                            },
                            error => {
                                console.error(error)
                            })
                })
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <Container style={{ padding: '50px' }} fluid>
                <>
                    <h1 style={{ marginBottom: '25px' }}>Lista de centros</h1>
                    <h2 style={{ marginBottom: '25px', fontSize: '20px' }}>Aquí puedes elegir alguno de nuestros centros colaboradores.</h2>
                </>
                <Row>
                    <Col md={4}>
                        { this.props.user?.role === 'ADMIN' &&
                            <Link className="btn btn-info" style={{ marginBottom: '25px' }} to="/centers/new">Crear nuevo centro</Link>
                        }
                        <ul>
                            {this.state.centers?.map(center => <CenterCard key={center._id} {...center} userLogged={this.props.user} />)}
                        </ul>
                    </Col>

                    <Col md={8}>
                        <Map google={this.props.google}
                            zoom={12} initialCenter={{ lat: 40.437075, lng: -3.694048 }}
                            loadingElement={<p>Cargando...</p>}
                            style={{ height: '500px', width: '750px', marginTop: '80px', marginLeft: '100px' }}>

                            {this.state.coord && this.state.coord.map((elm, idx) => <Marker key={idx} position={{ lat: elm[0].lat, lng: elm[0].lng }} title={elm[0].name} />)}
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