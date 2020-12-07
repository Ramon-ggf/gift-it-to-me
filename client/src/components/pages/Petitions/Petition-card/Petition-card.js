import { Col, Card, Button, ButtonGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const PetitionCard = ({_id, image, title, description}) => {


    return (
        <Col md={4}>
            <Card>
                <Card.Img variant="top" src={image} />
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>{description}</Card.Text>

                    <Link className="btn btn-dark btn-block btn-sm" to={`/petitions/${_id}`}>Ver detalles</Link>

                </Card.Body>
            </Card>
        </Col>
    )


}

export default PetitionCard