import axios from 'axios'

export default class CenterService {

    constructor() {

        this.apiHandler = axios.create({
            baseURL: 'http://localhost:5000/api/centers',
            withCredentials: true
        })
    
    }

    getAll = () => this.apiHandler.get('/')
    getById = center_id => this.apiHandler.get(`/centerById/${center_id}`)
    createNew = centerData => this.apiHandler.post('/new', centerData)
    editCenter = (center_id, centerData) => this.apiHandler.put(`/edit/${center_id}`, centerData)

}