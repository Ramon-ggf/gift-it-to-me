import { Col, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Petition-card.css'


const PetitionCard = ({_id, image, title, description, user, owner}) => {
    
    return (
        <Col md={4}>
            <Card className="wish-card" style={{ border: user && owner === user._id && '2px solid #145374' }}>
                <Card.Img className="wish-image" variant="top" src={image} alt={title}/>
                <Card.Body>
                    
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>{description}</Card.Text>

                    <Link className="btn btn-info btn-md" style={{position: 'absolute', bottom: 20, left: 50, right: 50}} to={`/petitions/${_id}`}>Ver detalles</Link>

                </Card.Body>
            </Card>
        </Col>
    )


}

export default PetitionCard