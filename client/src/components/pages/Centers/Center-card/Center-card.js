import { Col, Card, Button, ButtonGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import './Center-card.css'

const CenterCard = ({ _id, image, name, address }) => {


    return (
        <>
            <li><Link to={`/centers/${_id}`}>{name}</Link><p>{address}</p></li>

        </>
        // <Card>
        //     <Card.Img variant="top" src={image} />
        //     <hr/>
        //     <Card.Body>
        //         <Card.Title>{name}</Card.Title>
        //         <Card.Text>{address}</Card.Text>

        //         

        //     </Card.Body>
        // </Card>

    )

}

export default CenterCard