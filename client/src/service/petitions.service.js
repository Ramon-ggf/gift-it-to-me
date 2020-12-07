import axios from 'axios'

export default class PetitionService {

    constructor() {

        this.apiHandler = axios.create({
            baseURL: 'http://localhost:5000/api/petitions',
        })
    
    }

    getAll = () => this.apiHandler.get('/')
    getById = petition_id => this.apiHandler.get(`/petitionById/${petition_id}`)
    createNew = petitionData => this.apiHandler.post('/new', petitionData)
    editPetition = (petition_id, petitionData) => this.apiHandler.put(`/edit/${petition_id}`, petitionData)

}