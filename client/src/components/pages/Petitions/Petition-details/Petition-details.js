import { Component } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap'

import PetitionService from './../../../../service/petitions.service'

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
            .then(() => this.props.history.push('/petitions'))
            .catch(err => console.log(err))
    }

    fetchPetition = () => {

        this.petitionService
            .getById(this.props.match.params.petition_id)
            .then(response => this.setState({ petition: [response.data], changeButton: (this.props.user && response.data.giver === this.props.user._id) }))
            .catch(err => console.log(err))
    }

    render() {
        return (
            <>
                { this.state.petition ?
                    <Container style={{ padding: '50px' }} fluid>
                        <h1 style={{ marginBottom: '50px' }}>Detalles del regalo</h1>
                        <Row>
                            <Col md={{ span: 6, offset: 3 }}>
                                <Card>
                                    <Card.Img variant="top" src={this.state.petition[0].image} style={{ height: '300px', width: '300px', objectFit: 'cover', margin: 'auto', marginTop: '20px' }} />
                                    <Card.Body>
                                        <Card.Title>{this.state.petition[0].title}</Card.Title>
                                        <Card.Text>{this.state.petition[0].description}</Card.Text>
                                    </Card.Body>
                                    <ListGroup className="list-group-flush">
                                        <ListGroupItem>{`Edad: ${this.state.petition[0].age}`}</ListGroupItem>
                                        <ListGroupItem>{`Sexo: ${this.state.petition[0].sex}`}</ListGroupItem>
                                    </ListGroup>
                                    <Card.Body>
                                        {this.state.petition[0].center && <Card.Text>Centro elegido: <Link to={`/centers/${this.state.petition[0].center._id}`}>  {this.state.petition[0].center.name}</Link></Card.Text>}
                                        {this.state.petition[0].owner && <Card.Text>Soñador/a:  {this.state.petition[0].owner.name} </Card.Text>}
                                    </Card.Body>
                                    {
                                        this.props.user?._id === this.state.petition[0].owner._id || this.props.user?.role === 'ADMIN' ?
                                            <div className="card-btn">
                                                <Link className="btn btn-info edit-btn" style={{ marginBottom: '10px' }} to={`/petitions/edit/${this.state.petition[0]._id}`}>Editar regalo</Link>
                                                <Button className="btn btn-info delete-btn" style={{ marginBottom: '10px' }} name="delete" onClick={this.changeStatus} value={this.state.petition[0]._id}>Eliminar</Button>
                                            </div>
                                            :
                                            this.props.user?.role === 'GIVER' &&
                                            <div className="card-btn">
                                                <Button className="btn btn-info edit-btn" name={this.state.changeButton ? 'unmatch' : 'match'} onClick={this.changeStatus} value={this.state.petition[0]._id}>{this.state.changeButton ? 'No regalar' : 'Regalar'}</Button>
                                                {this.state.changeButton && <Button className="btn btn-info" style={{ marginLeft: '50px' }} name="sent" onClick={this.changeStatus} value={this.state.petition[0]._id}>Enviado</Button>}
                                            </div>
                                    }
                                </Card>
                            </Col>
                        </Row>
                        <Link className="btn btn-info edit-btn" to={"/petitions"}>Volver a la lista</Link>
                    </Container>
                    : 'Loading...'}
            </>
        )
    }
}