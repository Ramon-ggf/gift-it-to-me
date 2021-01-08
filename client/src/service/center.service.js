import axios from 'axios'
import runtimeEnv from '@mars/heroku-js-runtime-env';

const env = runtimeEnv();
export default class CenterService {

    constructor() {

        this.apiHandler = axios.create({
            baseURL: `${env.REACT_APP_API_URL}/centers`,
            withCredentials: true
        })
    }

    getAll = () => this.apiHandler.get('/')
    getById = center_id => this.apiHandler.get(`/centerById/${center_id}`)
    createNew = centerData => this.apiHandler.post('/new', centerData)
    editCenter = (center_id, centerData) => this.apiHandler.put(`/edit/${center_id}`, centerData)
}