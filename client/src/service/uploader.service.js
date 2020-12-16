import axios from 'axios'

export default class UploaderService {

    constructor() {

        this.apiHandler = axios.create({
            // baseURL: 'http://localhost:5000/api/uploader',
            baseURL: `${process.env.REACT_APP_API_URL}/uploader`,
            withCredentials: true
        })
    
    }

    uploadImage = imageForm => this.apiHandler.post('/upload', imageForm)

}