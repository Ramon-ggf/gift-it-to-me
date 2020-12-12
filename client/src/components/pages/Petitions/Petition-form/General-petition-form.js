import React, { Component } from 'react'
import PetitionService from '../../../../service/petitions.service'

import { Container, Row, Col } from 'react-bootstrap'

import { Redirect } from 'react-router-dom'

import PetitionForm from '../Petition-form/Petition-form'

export default class GeneralPetitionForm extends Component {

    constructor() {
        super()

        this.state = {

            petition: undefined

        }

        this.petitionService = new PetitionService()
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

        if (this.props.match.params.petition_id) {

            this.petitionService
                .getById(this.props.match.params.petition_id)
                .then(response => {
                    this.setState({ petition: response.data })
                })
                .catch(err => console.log(err))

        } else {

            this.setState({ petition: undefined })

        }

    }


    render() {

        return (

            <div>

                {
                    this.state.petition ?

                        this.state.petition.owner === this.props.user._id || this.props.user.role === 'ADMIN' ?

                            <Container>
                                <Row>
                                    <Col md={{ span: 6, offset: 3 }}>

                                        <PetitionForm petition={this.state.petition} create={this.onSubmitCreate} edit={this.onSubmitEdit} user={this.props.user} />

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

                                        <PetitionForm create={this.onSubmitCreate} edit={this.onSubmitEdit} user={this.props.user} />

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