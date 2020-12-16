import { Col, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Petition-card.css'


const PetitionCard = ({_id, image, title, description, user, owner}) => {

console.log({_id, image, title, description, user, owner})
    
    return (
        <Col md={4}>
            <Card className="wish-card" style={{ border: user && owner === user._id && '2px solid #00334e' }}>
                <Card.Img variant="top" src={image} alt={title}/>
                <Card.Body>
                    
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>{description}</Card.Text>

                    <Link className="btn btn-info btn-md" style={{position: 'absolute', bottom: 20, left: 125}} to={`/petitions/${_id}`}>Ver detalles</Link>

                </Card.Body>
            </Card>
        </Col>
    )


}

export default PetitionCard