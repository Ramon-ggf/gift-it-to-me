import React, { Component } from 'react'
import CenterService from '../../../../service/center.service'

import CentersForm from './../../Centers/Center-form/Centers-form'

import {Redirect} from 'react-router-dom'

import { Container, Row, Col } from 'react-bootstrap'

export default class GeneralCenterForm extends Component {

    constructor() {
        super()

        this.state = {

            center: undefined,

        }

        this.centerService = new CenterService()
    }

    componentDidMount = () => this.refreshState()

    onSubmitCreate = (e, data) => {

        e.preventDefault()

        this.centerService
            .createNew(data)
            .then(response => {
                this.props.history.push("/centers")
                console.log(response.data)
            })
            .catch(err => console.log(err))

    }

    onSubmitEdit= (e, data) => {

        e.preventDefault()

        this.centerService
            .editCenter(this.props.match.params.center_id, data)
            .then(response => {
                this.props.history.push(`/centers/${response.data._id}`)
                console.log(response.data)
            })
            .catch(err => console.log(err))

    }

    refreshState = () => {

        if (this.props.match) {
            
            this.centerService
                .getById(this.props.match.params.center_id)
                .then(response => this.setState({center: response.data }))
                .catch(err => console.log(err))

        } else {
            
            this.setState({center: undefined })

        }
 
    }




    render() {

        return (

            <div>

                { this.props.user && this.props.user.role === 'ADMIN' ?
                    
                    <Container>
                        <Row>
                            <Col md={{ span: 6, offset: 3 }}>

                                <CentersForm center={this.state.center} edit={this.onSubmitEdit} create={this.onSubmitCreate} />

                            </Col>
                        </Row>
                    </Container>
                    : 

                    <Redirect to="/centers"/>

                }

            </div>

        )

    }

}