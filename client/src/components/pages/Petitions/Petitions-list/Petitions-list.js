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

        // this.visiblePets = this.state.petitions.filter(elm => elm.status === true)
        // this.myPetsGiver = this.state.petitions.filter(elm => elm.status === true && elm.giver === this.props.user._id)
        // this.myPetsReceiver = this.state.petitions.filter(elm => elm.status === true && elm.owner === this.props.user._id)

    }

    componentDidMount = () => this.componentDidUpdate()



    componentDidUpdate = (prevProps) => {

        if (prevProps !== this.props || prevProps === undefined) {

            console.log(prevProps)
            this.refreshPetitions()

        }
    }

    refreshPetitions = () => {

        //let visiblePets
        let myPetitions
        //let myPetsGiver = this.state.petitions.filter(elm => elm.status === true && elm.giver === this.props.user._id)
        //let myPetsReceiver = this.state.petitions.filter(elm => elm.status === true && elm.owner === this.props.user._id)

        this.petitionService
            .getAll()
            .then(response => {

                //visiblePets = response.data.filter(elm => elm.status === true)

                if (this.props.location.pathname.includes('/profile/mypetitions') && this.props.user.role === 'GIVER') {

                    myPetitions = response.data.filter(elm => elm.giver === this.props.user._id)

                    console.log('soy giver', myPetitions)

                    //return this.setState({ petitions: myPetitions })

                } else if (this.props.location.pathname.includes('/profile/mypetitions') && this.props.user.role === 'RECEIVER') {

                    myPetitions=response.data.filter(elm => elm.owner === this.props.user._id)

                    console.log('soy reciv', myPetitions)

                    //return this.setState({ petitions: myPetitions })

                } else {

                    console.log('no soy nadie')

                    myPetitions= response.data.filter(elm => elm.status === true)

                    //return this.setState({ petitions: myPetitions })

                }

                this.setState({ petitions: myPetitions })
            })
            .catch(err => console.log(err))


        // this.petitionService
        //     .getAll()
        //     .then(response => this.setState({ petitions: response.data }))
        //     .catch(err => console.log(err))

    }



    render() {

        console.log(this.state.petitions, this.props.match.path)

        return (
            <>

                <Container>

                    <h1>Lista de wishes</h1>

                    <Row>

                        {this.props.user ?

                            this.props.user.role === 'ADMIN' || this.props.user.role === 'RECEIVER' ?

                                <Link className="btn btn-info" to="/petitions/new"> Crear nuevo regalo</Link>


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