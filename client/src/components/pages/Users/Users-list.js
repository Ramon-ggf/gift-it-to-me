import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import {Link} from 'react-router-dom'

import ProfileService from './../../../service/profile.service'
import UserItem from '../Centers/Center-card/List-item'

export default class UsersList extends Component {
    constructor() {
        super()

        this.state = {

            users: []

        }

        this.profileService = new ProfileService()

    }

    componentDidMount = () => this.refreshUsers()

    refreshUsers = () => {

        this.profileService
            .getAll()
            .then(response => this.setState({ users: response.data }))
            .catch(err => console.log(err))

    }

    render() {
        return (
            <>
                { this.props.user && this.props.user.role === 'ADMIN' &&
                    <Container style={{ padding: '50px' }} fluid>
                    
                    <h1 style={{ marginBottom: '50px' }}>Lista de usuarios</h1>
                    
                        <Row>
                        <Col md={4}>
                            
                        <Link className="btn btn-info" to="/users/new">Crear nuevo usuario</Link>

                                <ul>

                                {this.state.users.map(user => <UserItem key={user._id} {...user} delete={ this.changeStatus}/>)}

                                </ul>

                            </Col>
                        </Row>
                    </Container>
                }
            </>
        )
    }
}