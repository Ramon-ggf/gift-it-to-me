import axios from 'axios'
import runtimeEnv from '@mars/heroku-js-runtime-env';

const env = runtimeEnv();
export default class PetitionService {

    constructor() {

        this.apiHandler = axios.create({
            baseURL: `${env.REACT_APP_API_URL}/petitions`,
            withCredentials: true
        })
    }

    getAll = () => this.apiHandler.get('/')
    getOwnPets = user_id => this.apiHandler.get(`/mypetitions/${user_id}`)
    getById = petition_id => this.apiHandler.get(`/petitionById/${petition_id}`)
    createNew = petitionData => this.apiHandler.post('/new', petitionData)
    editPetition = (petition_id, petitionData) => this.apiHandler.put(`/edit/${petition_id}`, petitionData)
}