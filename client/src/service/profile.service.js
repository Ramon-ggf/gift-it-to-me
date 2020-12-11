import axios from 'axios'

export default class ProfileService {

    constructor() {

        this.apiHandler = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/profiles`,
        })
    
    }

    getAll = () => this.apiHandler.get('/')
    getById = user_id => this.apiHandler.get(`/userById/${user_id}`)
    editProfile = (user_id, userData) => this.apiHandler.put(`/edit/${user_id}`, userData)

}