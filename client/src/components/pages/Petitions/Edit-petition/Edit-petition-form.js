// import React, { Component } from 'react'
// import PetitionService from '../../../../service/petitions.service'

// import { Container, Row, Col, Form, Button } from 'react-bootstrap'

// export default class PetitionEdit extends Component {

//     constructor() {
//         super()

//         this.state = {

//             title: '',
//             description: '',
//             age: '',
//             sex: '',
//             image: undefined,
//             owner: undefined,
//             center: undefined

//         }

//         this.petitionService = new PetitionService()
//     }


//     componentDidMount = () => this.refreshState()

//     refreshState = () => {

//         this.petitionService
//             .getById(this.props.match.params.petition_id)
//             .then(response => this.setState({ title: response.data.title, description: response.data.description, age: response.data.age, sex: response.data.sex, image: response.data.image, owner: response.data.owner, center: response.data.center }))
//             .catch(err => console.log(err))
//     }


//     onChangeHandler = e => this.setState({ [e.target.name]: e.target.value })

//     onSubmitHandler = e => {

//         e.preventDefault()

//         this.petitionService
//             .editPetition(this.props.match.params.petition_id, this.state)
//             .then(response => {

//                 this.props.history.push(`/petitions/${this.props.match.params.petition_id}`)
//                 console.log(response.data)
//             })
//             .catch(err => console.log(err))

//     }


//     render() {

//         return (

//             <div>

//                 { this.props.user && this.props.user._id === this.state.owner &&

//                     <Container>
//                         <Row>
//                             <Col md={{ span: 6, offset: 3 }}>

//                             <Form onSubmit={this.onSubmitHandler}>
//                                 <Form.Group controlId="title">
//                                     <Form.Label>Título</Form.Label>
//                                     <Form.Control name="title" type="text" value={this.state.title} onChange={this.onChangeHandler} />
//                                 </Form.Group>
//                                 <Form.Group controlId="description">
//                                     <Form.Label>Descripción</Form.Label>
//                                     <Form.Control name="description" type="textarea" value={this.state.description} onChange={this.onChangeHandler} />
//                                 </Form.Group>
//                                 <Form.Group controlId="age">
//                                     <Form.Label>Edad del soñador/a</Form.Label>
//                                     <Form.Control name="age" type="number" value={this.state.age} onChange={this.onChangeHandler} />
//                                 </Form.Group>
//                                 <Form.Group controlId="sex">
//                                     <Form.Label>Sexo del soñador/a</Form.Label>
//                                     <Form.Control as="select" name="sex" value={this.state.sex} onChange={this.onChangeHandler}>
//                                         <option>Seleccionar</option>
//                                         <option value={"masculino"}>Masculino</option>
//                                         <option value={"femenino"}>Femenino</option>
//                                         <option value={"no definido"}>No definido</option>
//                                     </Form.Control>
//                                 </Form.Group>
//                                 <Form.Group controlId="center">
//                                     <Form.Label>Centro</Form.Label>
//                                     <Form.Control name="center" type="text" value={this.state.center} onChange={this.onChangeHandler} />
//                                 </Form.Group>
//                                 <Form.Group controlId="image">
//                                     <Form.Label>Imagen</Form.Label>
//                                     <Form.Control name="image" type="text" value={this.state.image} onChange={this.onChangeHandler} />
//                                 </Form.Group>
//                                 <Button variant="dark" block type="submit">Editar regalo</Button>
//                             </Form>
//                             </Col>
//                         </Row>
//                     </Container>
//                 }

//             </div>

//         )

//     }

// }