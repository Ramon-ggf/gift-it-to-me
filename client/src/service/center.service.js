import axios from 'axios'

export default class CenterService {

    constructor() {

        this.apiHandler = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/centers`,
        })
    
    }

    getAll = () => this.apiHandler.get('/')
    getById = center_id => this.apiHandler.get(`/centerById/${center_id}`)
    createNew = centerData => this.apiHandler.post('/new', centerData)
    editCenter = (center_id, centerData) => this.apiHandler.put(`/edit/${center_id}`, centerData)

}