import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Logo from './Pictures/logo7.png'

import './Homepage.css'



const HomePage = () => {

    return (
        <>
            <section className="main-content">
                <Container>
                    <Row>
                        <Col md={6}>

                            <article className="main-text">
                                <figure>
                                    <img src={Logo} style={{width: '500px'}}/>
                                </figure>

                                <div className="main-info">
                                    <h3>Mucha gente no tendrá regalos esta Navidad</h3>
                                    <p>En Regala_me queremos ayudar a que nadie se sienta diferente y todas las personas puedan tener aquello que necesitan. Un simple gesto puede marcar la diferencia.</p>
                                    <Link className="btn btn-info" to="/signup">Regístrate</Link>
                                </div>
                            </article>

                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default HomePage