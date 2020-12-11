import React, { Component } from 'react'

import AuthService from '../../../../service/auth.service'
import ProfileService from '../../../../service/profile.service'

import ProfileForm from '../Profile-form/Profile-form'

//import {Redirect} from 'react-router-dom'

import { Container, Row, Col } from 'react-bootstrap'

export default class GeneralUserForm extends Component {

    constructor() {
        super()

        this.state = {

            user: undefined,

        }

        this.authService = new AuthService()
        this.profileService = new ProfileService()
    }

    componentDidMount = () => this.refreshState()

    onSubmitCreate = (e, userData) => {

        e.preventDefault()
        console.log(userData)
        this.authService
            .signup(userData)
            .then(response => {
                console.log(response.data)
            })
            .catch(err => console.log(err))

    }

    onSubmitEdit= (e, userData) => {

        e.preventDefault()

        this.profileService
            .editProfile(this.props.match.params.user_id, userData)
            .then(response => {
                this.props.history.push(`/profile`)
                console.log(response.data)
            })
            .catch(err => console.log(err))

    }

    refreshState = () => {

        if (this.props.match.params) {

            this.profileService
                .getById(this.props.match.params.user_id)
                .then(response => this.setState({ user: response.data }))
                .catch(err => console.log(err))

        } else {

            this.setState({ user: undefined })

        }

    }




    render() {

        return (

            <div>

                <Container>
                    <Row>
                        <Col md={{ span: 6, offset: 3 }}>

                            

                            <ProfileForm loggedUser={ this.state.user} create={this.onSubmitCreate} edit={ this.onSubmitEdit}/>

                        </Col>
                    </Row>
                </Container>


            </div>

        )

    }

}