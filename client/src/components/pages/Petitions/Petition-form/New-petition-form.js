// import React, { Component } from 'react'
// import PetitionService from '../../../../service/petitions.service'

// import { Container, Row, Col, Form, Button } from 'react-bootstrap'

// export default class PetitionForm extends Component {

//     constructor(props) {
//         super(props)

//         this.state = {

//             title: '',
//             description: '',
//             age: '',
//             sex: '',
//             image: undefined,
//             owner: this.props.loggedUser ? this.props.loggedUser._id : undefined,
//             giver: undefined,
//             center: undefined,
//             status: undefined,
//             sent: undefined

//         }

//         this.petitionService = new PetitionService()
//     }


//     onChangeHandler = e => this.setState({ [e.target.name]: e.target.value })

//     onSubmitHandler = e => {

//         e.preventDefault()

//         this.petitionService
//             .createNew(this.state)
//             .then(response => console.log(response))
//             .catch(err => console.log(err))

//     }


//     render() {

//         return (

//             <div>

//                 <Container>
//                     <Row>
//                         <Col md={{ span: 6, offset: 3 }}>

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
//                                 <Form.Group controlId="image">
//                                     <Form.Label>Imagen</Form.Label>
//                                     <Form.Control name="image" type="text" value={this.state.image} onChange={this.onChangeHandler} />
//                                 </Form.Group>
//                                 <Button variant="dark" block type="submit">Crear nuevo deseo</Button>
//                             </Form>

//                         </Col>
//                     </Row>
//                 </Container>

//             </div>

//         )

//     }

// }