import axios from 'axios'

export default class ProfileService {

    constructor() {

        this.apiHandler = axios.create({
            baseURL: 'http://localhost:5000/api/profiles',
        })
    
    }

    getAll = () => this.apiHandler.get('/')
    getById = user_id => this.apiHandler.get(`/userById/${user_id}`)
    editPetition = (user_id, userData) => this.apiHandler.put(`/edit/${user_id}`, userData)

}