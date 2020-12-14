import { Link, Redirect } from 'react-router-dom'

import { Container, Row, Col } from 'react-bootstrap'

import './Profile-page.css'

const Profile = props => {


    return (

        <>

            {
                props.user ?

                    <Container>

                        <div className='welcome'>
                            <h1>Bienvenid@, {props.user.name}</h1>
                        </div>

                        <Row>

                            <Col md={3}>
                                <figure>
                                    <img className="user-image" src={props.user.image} alt={props.user.name} />
                                </figure>
                            </Col>

                            <Col md={4}>
                                <p>Nombre: {props.user.name}</p> <hr />
                                <p>Apellidos: {props.user.lastname}</p> <hr />
                                <p>Email: {props.user.email}</p> <hr />
                            </Col>

                            <Col md={3} className="action-btn">

                                {
                                    props.user.role === 'ADMIN' &&
                                    <>

                                        <Link className="btn btn-info action" to="/users">Gestionar usuarios</Link>
                                        <Link className="btn btn-info action" to="/centers">Gestionar centros</Link>

                                    </>
                                }

                                <Link className="btn btn-info action" to="/profile/mypetitions">Gestionar regalos</Link>

                            </Col>

                        </Row>

                        <div className="profile-btn">

                            <Link className="btn btn-info action" to={`/profile/edit/${props.user._id}`}>Editar perfil</Link>
                            <Link className="btn btn-info action" to="#">Darse de baja</Link>

                        </div>
                        
                    </Container>


                    : <Redirect to="/" />
            }

        </>






    )

}

export default Profile