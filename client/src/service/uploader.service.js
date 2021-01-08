import axios from 'axios'
import runtimeEnv from '@mars/heroku-js-runtime-env';

const env = runtimeEnv();
export default class UploaderService {

    constructor() {

        this.apiHandler = axios.create({
            baseURL: `${env.REACT_APP_API_URL}/uploader`,
            withCredentials: true
        })
    }

    uploadImage = imageForm => this.apiHandler.post('/upload', imageForm)
}