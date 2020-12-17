import { Link } from 'react-router-dom'

const ListItem = props => {

    return (
        <>
            {
                props.address ?

                    <Link to={`/centers/${props._id}`} style={{ textDecoration: 'none', color: '#393e46', marginBottom: '10px' }}>
                        
                        <li style={{ listStyle: 'none', border: '2px solid #8C8989', borderRadius: '10px', padding: '10px', margin: '15px 0 15px', boxShadow: '2px 2px 2px 3px rgba(0, 0, 0, 0.2)' }}>

                        <p style={{ fontWeight: 'bold'}}>{props.name}</p>
                        <p>{props.address}</p>

                    </li>
                    </Link>

                    :

                    <Link to={`/users/${props._id}`} style={{ textDecoration: 'none', color: '#393e46' }}>
                        
                        <li style={{ listStyle: 'none', border: '2px solid #8C8989', borderRadius: '10px', padding: '10px', margin: '15px 0 15px', boxShadow: '2px 2px 2px 3px rgba(0, 0, 0, 0.2)' }}>

                        <p style={{ fontWeight: 'bold'}}>{props.name} {props.lastname}</p>
                        <p>{props.email}</p>

                    </li>
                    </Link>
            }
        </>

    )

}

export default ListItem