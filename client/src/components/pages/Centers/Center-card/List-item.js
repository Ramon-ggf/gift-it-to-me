import { Link } from 'react-router-dom'

const ListItem = props => {

    return (
        <>
            {
                props.address ?

                    <li style={{ listStyle: 'none', border: '1px solid', borderRadius: '10px'}}>

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