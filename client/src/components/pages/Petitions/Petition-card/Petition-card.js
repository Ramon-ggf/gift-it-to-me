import { Col, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Petition-card.css'


const PetitionCard = ({_id, image, title, description}) => {


    return (
        <Col md={4}>
            <Card className="wish-card">
                <Card.Img variant="top" src={image} alt={title}/>
                <Card.Body>
                    
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>{description}</Card.Text>

                    <Link className="btn btn-info btn-block btn-sm" to={`/petitions/${_id}`}>Ver detalles</Link>

                </Card.Body>
            </Card>
        </Col>
    )


}

export default PetitionCard