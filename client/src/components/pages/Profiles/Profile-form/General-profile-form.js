import React, { Component } from 'react'

import AuthService from '../../../../service/auth.service'
import ProfileService from '../../../../service/profile.service'

import ProfileForm from '../Profile-form/Profile-form'

import Alert from './../../../shared/Alert/Alert'

import { Container, Row, Col } from 'react-bootstrap'

export default class GeneralUserForm extends Component {

    constructor() {
        super()

        this.state = {

            user: undefined,
            showToast: false,
            toastText: ''

        }

        this.authService = new AuthService()
        this.profileService = new ProfileService()
    }

    componentDidMount = () => this.refreshState()

    onSubmitCreate = (e, userData) => {

        e.preventDefault()

        this.authService
            .signup(userData)
            .then(response => {

                this.props.user ?
                    this.props.history.push("/users")
                    :
                    this.props.storeUser(response.data.user)

            })
            .catch(err => this.handleToast(true, err.message))

    }

    onSubmitEdit = (e, userData) => {

        e.preventDefault()

        this.profileService
            .editProfile(this.props.match.params.user_id, userData)
            .then(response => 

                this.props.user._id === this.props.match.params.user_id ?
                    (this.props.storeUser(response.data.user),
                        this.props.history.push("/profile"))

                    :

                    this.props.history.push("/users")

            )
            .catch(err => this.handleToast(true, err.message))

    }

    refreshState = () => {

        if (this.props.match.params.user_id) {

            this.profileService
                .getById(this.props.match.params.user_id)
                .then(response => this.setState({ user: response.data }))
                .catch(err => console.log(err))

        } else {

            this.setState({ user: undefined })

        }

    }

    handleToast = (visible, text) => this.setState({ showToast: visible, toastText: text })


    render() {

        return (

            <div>

                <Container>
                    <Row>
                        <Col md={{ span: 6, offset: 3 }}>



                            <ProfileForm adminUser={this.props.user} loggedUser={this.state.user} create={this.onSubmitCreate} edit={this.onSubmitEdit} path={this.props.match.path} />

                        </Col>
                    </Row>
                </Container>

                <Alert show={this.state.showToast} handleToast={this.handleToast} toastText={this.state.toastText} />
            </div>

        )

    }

}