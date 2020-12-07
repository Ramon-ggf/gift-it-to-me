import { Col, Card, Button, ButtonGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const CenterCard = ({_id, image, name, address}) => {


    return (
        <Col md={4}>
            <Card>
                <Card.Img variant="top" src={image} />
                <hr/>
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>{address}</Card.Text>

                    <Link className="btn btn-dark btn-block btn-sm" to={`/centers/${_id}`}>Ver detalles</Link>

                </Card.Body>
            </Card>
        </Col>
    )


}

export default CenterCard