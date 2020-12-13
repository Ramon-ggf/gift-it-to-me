import React, { Component } from 'react'
import PetitionService from '../../../../service/petitions.service'
import CenterService from './../../../../service/center.service'

import { Container, Row, Col } from 'react-bootstrap'

import { Redirect } from 'react-router-dom'

import PetitionForm from '../Petition-form/Petition-form'

export default class GeneralPetitionForm extends Component {

    constructor() {
        super()

        this.state = {

            petition: undefined,
            centers: undefined

        }

        this.petitionService = new PetitionService()
        this.centerService = new CenterService()
    }

    componentDidMount = () => this.refreshState()


    onSubmitCreate = (e, petData) => {

        e.preventDefault()

        this.petitionService
            .createNew(petData)
            .then(response => {
                this.props.history.push("/petitions")
            })
            .catch(err => console.log(err))

    }

    onSubmitEdit = (e, petData) => {

        e.preventDefault()

        this.petitionService
            .editPetition(this.props.match.params.petition_id, petData)
            .then(response => {
                this.props.history.push(`/petitions/${response.data._id}`)
            })
            .catch(err => console.log(err))

    }

    refreshState = () => {

        let prueba

        if (this.props.match.params.petition_id) {

            const centersPromise = this.centerService.getAll()

            const petitionPromise = this.petitionService.getById(this.props.match.params.petition_id)

            Promise.all([centersPromise, petitionPromise])
                .then(response => {

                    this.setState({petition: response[1].data, centers: response[0].data})

                })
                .catch(err => console.log(err))


        } else {

            this.centerService
                .getAll()
                .then(response => this.setState({ petition: undefined, centers: response.data }))
                .catch(err => console.log(err))

            

        }

    }


    render() {

    console.log(this.state)

        return (

            <div>

                {
                    this.state.petition ?

                        this.state.petition.owner === this.props.user._id || this.props.user.role === 'ADMIN' ?

                            <Container>
                                <Row>
                                    <Col md={{ span: 6, offset: 3 }}>

                                        <PetitionForm centers={ this.state.centers} petition={this.state.petition} create={this.onSubmitCreate} edit={this.onSubmitEdit} user={this.props.user} />

                                    </Col>
                                </Row>
                            </Container>

                            :

                            <Redirect to="/petitions" />

                        :

                        this.props.user.role === 'RECEIVER' || this.props.user.role === 'ADMIN' ?

                            <Container>
                                <Row>
                                    <Col md={{ span: 6, offset: 3 }}>

                                        <PetitionForm centers={ this.state.centers} create={this.onSubmitCreate} edit={this.onSubmitEdit} user={this.props.user} />

                                    </Col>
                                </Row>
                            </Container>

                            :

                            <Redirect to="/petitions" />
                }

            </div>

        )

    }

}