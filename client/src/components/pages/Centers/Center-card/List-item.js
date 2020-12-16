import { Link } from 'react-router-dom'

const ListItem = props => {

    return (
        <>
            {
                props.address ?

                    <li style={{ listStyle: 'none', border: '2px solid #8C8989', borderRadius: '10px', padding: '10px', margin:'15px 0 15px', boxShadow: '2px 2px 2px 3px rgba(0, 0, 0, 0.2)'}}>

                        <Link to={`/centers/${props._id}`} style={{textDecoration: 'none', color: '#393e46', fontWeight: 'bold', marginBottom: '10px'}}>{props.name}</Link>
                        <p>{props.address}</p>

                    </li>

                    :

                    <li style={{ listStyle: 'none', border: '2px solid #8C8989', borderRadius: '10px', padding: '10px', margin:'15px 0 15px', boxShadow: '2px 2px 2px 3px rgba(0, 0, 0, 0.2)'}}>

                        <Link to={`/users/${props._id}`}style={{textDecoration: 'none', color: '#393e46'}}>{`${props.name} ${props.lastname}`}</Link>
                        <p>{props.email}</p>

                    </li>
            }
        </>

    )

}

export default ListItem