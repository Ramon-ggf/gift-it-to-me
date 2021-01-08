import axios from 'axios'
import runtimeEnv from '@mars/heroku-js-runtime-env';

const env = runtimeEnv();
export default class ProfileService {

    constructor() {

        this.apiHandler = axios.create({
            baseURL: `${env.REACT_APP_API_URL}/profiles`,
            withCredentials: true
        })
    }

    getAll = () => this.apiHandler.get('/')
    getById = user_id => this.apiHandler.get(`/userById/${user_id}`)
    editProfile = (user_id, userData) => this.apiHandler.put(`/edit/${user_id}`, userData)
}