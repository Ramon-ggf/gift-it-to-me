import { Link } from 'react-router-dom'

import { Button } from 'react-bootstrap'

const ListItem = props => {

    console.log(props)

    return (
        <>
            {
                props.address ?

                    <li style={{ listStyle: 'none' }}>

                        <Link to={`/centers/${props._id}`}>{props.name}</Link>
                        <p>{props.address}</p>

                        {props.userLogged && props.userLogged.role === 'ADMIN' ?

                            <>
                                <Link className="btn btn-info" to={`/profile/edit/${props._id}`}>Editar</Link>
                                <Button className="btn btn-info" onClick={props.delete} value={props._id}>Eliminar</Button>
                            </>

                            : null}

                    </li>

                    :

                    <li style={{ listStyle: 'none' }}>

                        <Link to={`/profile/${props._id}`}>{`${props.name} ${props.lastname}`}</Link>
                        <p>{props.email}</p>
                        <Link className="btn btn-info" to={`/profile/edit/${props._id}`}>Editar</Link>
                        <Button className="btn btn-info" onClick={props.delete} value={props._id}>Eliminar</Button>

                    </li>
            }
        </>

    )

}

export default ListItem