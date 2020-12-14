import { Link } from 'react-router-dom'

import { Button } from 'react-bootstrap'

const ListItem = props => {

    return (
        <>
            {
                props.address ?

                    <li style={{ listStyle: 'none' }}>

                        <Link to={`/centers/${props._id}`}>{props.name}</Link>
                        <p>{props.address}</p>

                    </li>

                    :

                    <li style={{ listStyle: 'none' }}>

                        <Link to={`/users/${props._id}`}>{`${props.name} ${props.lastname}`}</Link>
                        <p>{props.email}</p>

                    </li>
            }
        </>

    )

}

export default ListItem