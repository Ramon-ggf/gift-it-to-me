import React, { Component } from 'react'
import { Container, Row, CardDeck } from 'react-bootstrap'

import { Link } from 'react-router-dom'


import PetitionService from './../../../../service/petitions.service'
import PetitionCard from './../../Petitions/Petition-card/Petition-card'

export default class PetitionsList extends Component {
    constructor() {
        super()

        this.state = {

            petitions: undefined

        }

        this.petitionService = new PetitionService()


    }

    componentDidMount = () => this.refreshPetitions()



    componentDidUpdate = (prevProps) => {

        if (prevProps !== this.props || prevProps === undefined) {


            this.refreshPetitions()

        }
    }

    refreshPetitions = () => {


        if (this.props.location.pathname.includes('/profile/mypetitions') && this.props.user.role === 'GIVER') {

            this.petitionService
                .getGiverPets(this.props.user._id)
                .then(response => this.setState({ petitions: response.data }))
                .catch(err => console.log(err))

        } else if (this.props.location.pathname.includes('/profile/mypetitions') && this.props.user.role === 'RECEIVER') {

            this.petitionService
                .getOwnerPets(this.props.user._id)
                .then(response => this.setState({ petitions: response.data }))
                .catch(err => console.log(err))
        } else {

            this.petitionService
                .getAll()
                .then(response => this.setState({ petitions: response.data }))
                .catch(err => console.log(err))
    
        }
    }



    render() {



        return (
            <>

                <Container style={{padding: '50px'}} fluid>

                    <h1 style={{marginBottom:'50px'}}>Lista de regalos</h1>

                    <Row>

                        {this.props.user ?

                            this.props.user.role === 'ADMIN' || this.props.user.role === 'RECEIVER' ?

                            <Link className="btn btn-info" style={{marginBottom: '25px'}} to="/petitions/new"> Crear nuevo regalo</Link>

                                :
                                null
                            :
                            null
                        }

                        <CardDeck>

                            {this.state.petitions ?

                                this.state.petitions.map(elm => <PetitionCard key={elm._id} {...elm} />)

                                :
                                'Loading...'
                            }

                        </CardDeck>
                    </Row>
                </Container>

            </>
        )
    }
}