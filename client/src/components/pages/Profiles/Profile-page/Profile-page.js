import { Link, Redirect } from 'react-router-dom'
import { Container, Row, Col, Button } from 'react-bootstrap'

import './Profile-page.css'

const Profile = ({ user }) => {
    return (
        <>
            {
                user ?
                    <Container style={{ padding: '50px' }} fluid>
                        <div className='welcome'>
                            <h1>Bienvenid@, {user.name}</h1>
                        </div>
                        <Row>
                            <Col md={3}>
                                <figure>
                                    <img className="user-image" src={user.image} alt={user.name} />
                                </figure>
                            </Col>

                            <Col md={4}>
                                <p>Nombre: {user.name}</p> <hr />
                                <p>Apellidos: {user.lastname}</p> <hr />
                                <p>Email: {user.email}</p> <hr />
                            </Col>

                            <Col md={3} className="action-btn">
                                {
                                    user.role === 'ADMIN' &&
                                    <>
                                        <Link className="btn btn-info action" to="/users">Gestionar usuarios</Link>
                                        <Link className="btn btn-info action" to="/centers">Gestionar centros</Link>
                                    </>
                                }
                                <Link className="btn btn-info action" to="/profile/mypetitions">Gestionar regalos</Link>
                            </Col>
                        </Row>
                        <div className="profile-btn">
                            <Link className="btn btn-info action" to={`/profile/edit/${user._id}`}>Editar perfil</Link>
                            <Button className="btn btn-info delete-btn" >Darse de baja</Button>
                        </div>
                    </Container>
                    : <Redirect to="/" />
            }
        </>
    )
}

export default Profile