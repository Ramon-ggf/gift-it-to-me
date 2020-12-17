import { Container, Row, Col } from 'react-bootstrap'

const InfoPage = () => {

    return (
        <div className="info">
            <Container style={{ padding: '50px'}}>
          <h1 style={{ marginBottom: '50px' }}>Cómo funciona?</h1>
          <div style={{ marginBottom: '30px', textAlign: 'justify' }}>
            <h3>Soñadores</h3>
            <p>En nuestra página pueden inscribirse niños y ancianos de escasos recursos que mantienen viva la ilusión de estas fiestas.
            Una vez regtistrado un perfil pueden ir a la sección "Regalos" y crear un nuevo regalo con sus datos, una descripción y una fotografía.
             </p>
          </div>
          <div style={{ marginBottom: '30px', textAlign: 'justify' }}>
            <h3>Donantes</h3>
            <p>Los donantes son los "regaladores" oficiales registrados en nuestra página. Pueden elegir una o varias peticines de la lista de regalos que piden nuestros Soñadores.
             </p>
          </div>
          <div style={{ marginBottom: '30px', textAlign: 'justify' }}>
            <h3>Los regalos</h3>
            <p>Los donantes pueden comprar el regalo pedido por el niño o anciano, siempre dentro de un importe de 25€ a 35€. Una vez entregado, puede dalre al botón de Enviado en su perfil personal.</p>
            <p>Si el soñador pide algo que supera el importe se puede comprar un juguete acorde al sexo y edad del niño. Si pide ropa, se puede incluir el ticket regalo.</p>
          </div>
          <div style={{ marginBottom: '30px', textAlign: 'justify' }}>
            <h3>¿Por qué no puedo entregar los regalos personalmente?</h3>
            <p>La idea de nuestra web es que los soñadores puedan mantener la ilusión. Es un regalo anónimo, vosotros pensáis en el niño/niña, y ellos saben que existe alguien que ha pensado en ellos y le envía un regalo especial.
              </p>
          </div>
          <div style={{ marginBottom: '30px', textAlign: 'justify' }}>
            <h3>Entrega de los regalos</h3>
            <p>Cada soñador elige, al momento de crear su petición, el centro de entrega en el que prefiere recibir su regalo y dónde los donantes lo dejarán para su entrega.
              </p>
            </div>
            </Container>
        </div>
    )
}

export default InfoPage