import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import AuthService from '../../../../service/auth.service'
import ProfileService from '../../../../service/profile.service'
import ProfileForm from '../Profile-form/Profile-form'
import Alert from './../../../shared/Alert/Alert'

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
            .catch(() => this.handleToast(true, 'Registro fallido, comprueba que todos los campos están rellenos.'))
    }

    onSubmitEdit = (e, userData) => {

        e.preventDefault()

        this.profileService
            .editProfile(this.props.match.params.user_id, userData)
            .then(response => {

                if (this.props.user._id === this.state.user._id) {

                    this.authService
                        .isLoggedIn()
                        .then(response => {
                            this.props.storeUser(response.data)
                            this.props.history.push("/profile")
                        })
                        .catch(() => this.props.storeUser(undefined))

                } else {

                    this.props.history.push("/users")

                }

            })
            .catch(() => this.handleToast(true, 'Error: no se ha podido editar el perfil.'))

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
                <Container style={{ marginTop: "50px", marginBottom: "50px" }}>
                    <Row>
                        <Col md={{ span: 6, offset: 3 }}>
                            <h1 style={{ marginBottom: '25px', textAlign: 'center' }}>{this.props.match.path.includes('edit') ? 'Editar perfil' : 'Registro de usuario'}</h1>
                            <ProfileForm adminUser={this.props.user} loggedUser={this.state.user} create={this.onSubmitCreate} edit={this.onSubmitEdit} path={this.props.match.path} />
                        </Col>
                    </Row>
                </Container>
                <Alert show={this.state.showToast} handleToast={this.handleToast} toastText={this.state.toastText} />
            </div>
        )
    }
}