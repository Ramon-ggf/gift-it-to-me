import axios from 'axios'
import runtimeEnv from '@mars/heroku-js-runtime-env';

const env = runtimeEnv();
export default class UploaderService {

    constructor() {

        this.apiHandler = axios.create({
            // baseURL: 'http://localhost:5000/api/uploader',
            // baseURL: `${process.env.REACT_APP_API_URL}/uploader`,
            baseURL: `${env.REACT_APP_API_URL}/uploader`,
            withCredentials: true
        })
    
    }

    uploadImage = imageForm => this.apiHandler.post('/upload', imageForm)

}