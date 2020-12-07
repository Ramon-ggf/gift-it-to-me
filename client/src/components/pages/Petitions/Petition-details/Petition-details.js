import { Component } from 'react'
import PetitionService from './../../../../service/petitions.service'

import { Container, Row, Col, Card, ListGroup, ListGroupItem } from 'react-bootstrap'

export default class PetitionDetails extends Component {
    constructor() {
        super()

        this.state = {

            petition: undefined

        }

        this.petitionService = new PetitionService()

    }

    componentDidMount = () => {

        this.petitionService
            .getById(this.props.match.params.petition_id)
            .then(response => this.setState({ petition: response.data }))
            .catch(err => console.log(err))

    }

    render() {

        return (
            <>
                <h1>Detalles</h1>

                { this.state.petition ?

                    <Container>
                        <Row>
                            <Col md={{ span: 8, offset: 2 }}>

                                <Card>
                                    <Card.Img variant="top" src={this.state.petition.image} />
                                    <Card.Body>
                                        <Card.Title>{this.state.petition.title}</Card.Title>
                                        <Card.Text>{this.state.petition.description}</Card.Text>
                                    </Card.Body>
                                    <ListGroup className="list-group-flush">
                                        <ListGroupItem>{`Edad: ${this.state.petition.age}`}</ListGroupItem>
                                        <ListGroupItem>{`Sexo: ${this.state.petition.sex}`}</ListGroupItem>
                                    </ListGroup>
                                    <Card.Body>
                                        {this.state.petition.center ?  <Card.Link href="#">Center:  {this.state.petition.center} </Card.Link> : 'NO HAYYYYY  '}
                                        {this.state.petition.owner ? <Card.Link href="#">Soñador/a:  {this.state.petition.owner} </Card.Link> : 'NO HAYYYYY'}
                                    </Card.Body>
                                </Card>

                            </Col>
                        </Row>
                    </Container>

                    : 'Loading...'}
            </>
        )
    }
}