import axios from 'axios'
import runtimeEnv from '@mars/heroku-js-runtime-env';

const env = runtimeEnv();
export default class AuthService {

    constructor() {

        this.apiHandler = axios.create({
            // baseURL: 'http://localhost:5000/api/auth',
            baseURL: `${env.REACT_APP_API_URL}/auth`,
            withCredentials: true
        })
    
    }

    signup = credentials => this.apiHandler.post('/signup', credentials)
    login = credentials => this.apiHandler.post('/login', credentials)
    logout = () => this.apiHandler.post('/logout')
    isLoggedIn = () => this.apiHandler.get('/loggedin')

}