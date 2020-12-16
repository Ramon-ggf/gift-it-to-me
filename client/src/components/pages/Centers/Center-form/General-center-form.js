import React, { Component } from 'react'
import CenterService from '../../../../service/center.service'

import CentersForm from './../../Centers/Center-form/Centers-form'

import Alert from './../../../shared/Alert/Alert'

import { Redirect } from 'react-router-dom'

import { Container, Row, Col } from 'react-bootstrap'

export default class GeneralCenterForm extends Component {

    constructor() {
        super()

        this.state = {

            center: undefined,
            showToast: false,
            toastText: ''

        }

        this.centerService = new CenterService()
    }

    componentDidMount = () => this.refreshState()

    onSubmitCreate = (e, data) => {

        e.preventDefault()

        this.centerService
            .createNew(data)
            .then(() => this.props.history.push("/centers"))
            .catch(() => this.handleToast(true, 'Error: no se ha podido crear el centro.'))

    }

    onSubmitEdit = (e, data) => {

        e.preventDefault()

        this.centerService
            .editCenter(this.props.match.params.center_id, data)
            .then(response => this.props.history.push(`/centers/${response.data._id}`))
            .catch(() => this.handleToast(true, 'Error: no se ha podido editar el centro.'))

    }

    refreshState = () => {

        if (this.props.match.params) {

            this.centerService
                .getById(this.props.match.params.center_id)
                .then(response => this.setState({ center: response.data }))
                .catch(err => console.log(err))

        } else {

            this.setState({ center: undefined })

        }

    }


    handleToast = (visible, text) => this.setState({ showToast: visible, toastText: text })

    render() {

        return (

            <div>

                { this.props.user && this.props.user.role === 'ADMIN' ?

                    <Container style={{ padding: '50px' }} fluid>

                        <Row>
                            <Col md={{ span: 6, offset: 3 }}>

                                <CentersForm center={this.state.center} edit={this.onSubmitEdit} create={this.onSubmitCreate} />

                            </Col>
                        </Row>
                    </Container>
                    :
                    <Redirect to="/centers" />
                }

                <Alert show={this.state.showToast} handleToast={this.handleToast} toastText={this.state.toastText} />

            </div>

        )

    }

}