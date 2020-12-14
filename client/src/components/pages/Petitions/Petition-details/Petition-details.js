import { Component } from 'react'
import PetitionService from './../../../../service/petitions.service'

import { Link } from 'react-router-dom'

import { Container, Row, Col, Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap'

export default class PetitionDetails extends Component {
    constructor() {
        super()

        this.state = {

            petition: undefined,
            changeButton: undefined

        }

        this.petitionService = new PetitionService()

    }

    componentDidMount = () => this.fetchPetition()

    componentDidUpdate = (prevProps, prevState) => {

        if (prevState.changeButton !== this.state.changeButton) {

            this.fetchPetition()
        }

    }

    changeStatus = e => {

        let updateInfo

        if (e.target.name === "delete" || e.target.name === "sent") {

            updateInfo = { sent: true }

        } else if (e.target.name === "match") {

            updateInfo = { status: false, giver: this.props.user._id }
     
        } else if (e.target.name === "unmatch") {

            updateInfo = { status: true, giver: null }

        }

        this.petitionService
            .editPetition(e.target.value, updateInfo)
            .then(() => {

                this.props.history.push('/petitions')

            })
            .catch(err => console.log(err))

    }

    fetchPetition = () => {

        this.petitionService
        .getById(this.props.match.params.petition_id)
        .then(response => {
            this.setState({ petition: response.data, changeButton: ( this.props.user && response.data.giver === this.props.user._id) })

        })
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
                                        {this.state.petition.center && <Card.Link href="#">Centro elegido:  {this.state.petition.center} </Card.Link> }
                                        {this.state.petition.owner && <Card.Link href="#">Soñador/a:  {this.state.petition.owner} </Card.Link> }
                                    </Card.Body>
                                </Card>

                                {this.props.user ?

                                    this.props.user._id === this.state.petition.owner || this.props.user.role === 'ADMIN' ?

                                        <>
                                            <Link className="btn btn-info" to={`/petitions/edit/${this.state.petition._id}`}>Editar regalo</Link>
                                            <Button className="btn btn-info" name="delete" onClick={this.changeStatus} value={this.state.petition._id}>Eliminar</Button>
                                        </>

                                        :
                                        <>
                                            <Button className="btn btn-info" name={this.state.changeButton ? 'unmatch' : 'match'} onClick={this.changeStatus} value={this.state.petition._id}>{this.state.changeButton ? 'Desregalar' : 'Regalar'}</Button>

                                            {this.state.changeButton && <Button className="btn btn-info" name="sent" onClick={this.changeStatus} value={this.state.petition._id}>Enviado</Button>}
                                        </>
                                    
                                    : null
                                }

                            </Col>
                        </Row>
                    </Container>

                    : 'Loading...'}
            </>
        )
    }
}