import { Component } from 'react'
import ProfileService from './../../../service/profile.service'

import { Link, Redirect } from 'react-router-dom'

import { Container, Row, Col, Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap'

export default class UserDetails extends Component {
    constructor() {
        super()

        this.state = {

            user: undefined

        }

        this.profileService = new ProfileService()

    }

    componentDidMount = () => this.refreshUser()

    changeStatus = e => {

        this.profileService
            .editProfile(e.target.value, { status: false })
            .then(() => this.props.history.push('/users'))
            .catch(err => console.log(err))

    }

    refreshUser = () => {

        this.profileService
            .getById(this.props.match.params.user_id)
            .then(response => this.setState({ user: response.data }))
            .catch(err => console.log(err))
    }

    render() {

        return (

            <>
                {this.state.user ?

                    <>

                        <Container style={{ padding: '50px' }} fluid>

                            <h1 style={{ marginBottom: '50px' }}>Detalles de {this.state.user.name}</h1>

                            <Row>

                                <Col md={{ span: 4, offset: 4 }}>

                                    {this.props.user && this.props.user.role === 'ADMIN' ?

                                        <Card>
                                            <Card.Img variant="top" src={this.state.user.image} style={{  height: 250, width: '100%', objectFit: 'cover'  }}/>
                                            <Card.Body>
                                                <Card.Title>{this.state.user.name}{' '}{this.state.user.lastname}</Card.Title>

                                            </Card.Body>
                                            <ListGroup className="list-group-flush">
                                                <ListGroupItem>{`Email: ${this.state.user.email}`}</ListGroupItem>
                                                <ListGroupItem>{`Rol: ${this.state.user.role}`}</ListGroupItem>
                                                <ListGroupItem className="card-btn">
                                                    <Link className="btn btn-info edit-btn" to={`/profile/edit/${this.state.user._id}`}>Editar</Link>
                                                    <Button className="btn btn-info delete-btn" onClick={this.changeStatus} value={this.state.user._id}>Eliminar</Button>
                                                </ListGroupItem>
                                            </ListGroup>

                                        </Card>

                                        : <Redirect to="/" />}
                                </Col>

                            </Row>
                            
                        </Container>

                    </>

                    : 'Loading...'}
            </>

        )
    }
}