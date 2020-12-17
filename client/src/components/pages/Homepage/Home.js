import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Logo from './Pictures/logo7.png'
import Logo2 from './Pictures/Logo2.png'

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
                                    <h3>Mucha gente no tendrá regalos estas Fiestas</h3>
                                    <p>En Regala_me puedes ayudar a que nadie se sienta diferente y todas las personas puedan recibir algo que necesitan. Un simple gesto puede marcar la diferencia.</p>
                                    <Link className="btn btn-info btn-registro" to="/signup">Regístrate</Link>
                                </div>
                            </article>

                        </Col>
                    </Row>
                </Container>
            </section>
            <section className="features">
                <Container style={{padding: '30px'}}>
                    <h2 className="feature-title2">¡Regalar es muy fácil!</h2>
                    <Row>
                        <Col md={4}>
                            <div style={{textAlign: 'center'}}><i className="icon fas fa-sign-in-alt fa-6x"></i></div>
                            <h3 className="feature-title3">Regístrate</h3>
                            <p className="feature-text">Abre un perfil y forma parte de la comunidad <span style={{color: '#145374', fontWeight: '800'}}>Regala_</span><span style={{color: '#ee6f57', fontWeight: '800'}}>me</span></p>
                        </Col>
                        <Col md={4}>
                            <div style={{textAlign: 'center'}}><i className="icon fas fa-search fa-6x"></i></div>
                            <h3 className="feature-title3">Busca</h3>
                            <p className="feature-text">Busca en la lista de regalos a quién quieres regalar</p>
                        </Col>
                        <Col md={4}>
                            <div style={{textAlign: 'center'}}><i className="icon fas fa-gift fa-6x"></i></div>
                            <h3 className="feature-title3">Regala</h3>
                            <p className="feature-text">Compra el regalo y llévalo al punto de recogida indicado</p>
                        </Col>
                    </Row>
                    <Link className="btn btn-info btn-more" to="/info">Quiero saber más</Link>
                </Container>
            </section>
            <section className="about">
                <Container>
                    <Row>
                        <Col md={8}>
                            <h2 className="about-title">Quienes somos?</h2>
                            <p><span style={{color: '#F6F5F5', fontWeight: 'bold'}}>Regala_</span><span style={{color: '#ee6f57', fontWeight: 'bold'}}>me</span> es un sitio sin ánimo de lucro creado para ayudar a personas de bajos recursos a mantener la ilusión en estas fechas.</p>
                           <p>Gracias a tu ayuda y la coolaboración de los centros de distribución, hacemos llegar a cientos de niños y ancianos una pequeña muestra de afecto y mostrar que nos importan.</p>
                        </Col>
                        <Col md={4}>
                            <div className="about-icon">
                                <img src={Logo2} alt='logo-white'/>
                            </div>
                        </Col>
                    </Row>
</Container>
            </section>
        </>
    )
}

export default HomePage