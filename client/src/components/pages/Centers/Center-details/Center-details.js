import { Component } from 'react'
import CenterService from './../../../../service/center.service'

import { Link } from 'react-router-dom'

import { Container, Row, Col, Card, ListGroup, ListGroupItem } from 'react-bootstrap'

export default class CenterDetails extends Component {
    constructor() {
        super()

        this.state = {

            center: undefined

        }

        this.centerService = new CenterService()

    }

    componentDidMount = () => {

        this.centerService
            .getById(this.props.match.params.center_id)
            .then(response => this.setState({ center: response.data }))
            .catch(err => console.log(err))

    }

    render() {

        return (
            <>
                <h1>Detalles del Centro</h1>

                { this.state.center ?

                    <Container>
                        <Row>
                            <Col md={{ span: 8, offset: 2 }}>

                                <Card>
                                    <Card.Img variant="top" src={this.state.center.image} style={{height: 250, width: '100%', objectFit: 'cover'}}/>
                                    <Card.Body>
                                        <Card.Title>{this.state.center.name}</Card.Title>
                                        <Card.Text>{this.state.center.address}</Card.Text>
                                    </Card.Body>
                                    <ListGroup className="list-group-flush">
                                        <ListGroupItem>{`Email: ${this.state.center.email}`}</ListGroupItem>
                                        <ListGroupItem>{`Teléfono: ${this.state.center.phone}`}</ListGroupItem>
                                        <ListGroupItem>{`Horarios: ${this.state.center.opening}`}</ListGroupItem>
                                    </ListGroup>

                                    {this.props.user && this.props.user.role === 'ADMIN' &&
                                        
                                        <Link to={`/center/edit/${this.state.center._id}`}>Editar centro</Link>
                                    }
                                </Card>
                            </Col>
                        </Row>
                    </Container>

                    : 'Loading...'}
            </>
        )
    }
}