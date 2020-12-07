import { Link } from 'react-router-dom'


const Profile = props => {

    return (

        <>

            <h1>Bienvenid@, {props.user.name}</h1>
            <figure>
                <img src={props.user.image} alt={props.user.name} />
            </figure>
            <p>Nombre: {props.user.name}</p>
            <p>Apellidos: {props.user.lastname}</p>
            <p>Email: {props.user.email}</p>

            <hr />
            <Link className="btn btn-info" to="#">Editar perfil</Link>
            <Link className="btn btn-info" to="#">Darse de baja</Link>
            
        </>

    )

}

export default Profile