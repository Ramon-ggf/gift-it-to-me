import React, { Component } from 'react'
import {Container, Row} from 'react-bootstrap'


import PetitionService from '../../../../service/petitions.service'
import PetitionCard from './../../Petitions/Petition-card/Petition-card'

export default class PetitionsList extends Component {
    constructor() {
        super()

        this.state = {

            petitions: []

        }

        this.petitionService = new PetitionService()

    }

    componentDidMount = () => this.refreshPetitions()

    refreshPetitions = () => {

        this.petitionService
            .getAll()
            .then(response => this.setState({ petitions: response.data }))
            .catch(err => console.log(err))

    }

    render() {
        return (
            <>
                <h1>Lista de wishes</h1>

                {this.state.petitions.map(elm => <PetitionCard key={elm._id} {...elm}/>)}
                
            </>
        )
    }
}