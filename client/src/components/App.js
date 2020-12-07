import './App.css';
import React, { Component } from 'react'
import AuthService from './../service/auth.service'
import { Switch, Route } from 'react-router-dom'

import Navigation from './Layout/Navbar/Navbar'
import SignupForm from './pages/Signup/Signup-form'
import LoginForm from './pages/Login/Login-form'
import PetitionForm from './pages/Petitions/Petition-form/New-petition-form'
import PetitionsList from './pages/Petitions/Petitions-list/Petitions-list'
import CentersList from './../components/pages/Centers/Center-list/Centers-list'
import PetitionDetails from './pages/Petitions/Petition-details/Petition-details'
import CenterDetails from './pages/Centers/Center-details/Center-details';



class App extends Component {

  constructor() {
    super()

    this.state = {

      loggedInUser: ''

    }

    this.authService = new AuthService()
  }

  componentDidMount = () => {

    this.authService
      .isLoggedIn()
      .then(response => this.setUser(response.data))
      .catch(() => this.setUser(undefined))

  }

  setUser = user => this.setState({ loggedInUser: user }, () => console.log(this.state))

  render() {

    return (

      <>

        <Navigation storeUser={this.setUser} loggedUser={this.state.loggedInUser} />
        
        <main>
          <Switch>

            <Route path="/signup" render={props => <SignupForm storeUser={this.setUser} {...props} />} />
            <Route path="/login" render={props => <LoginForm storeUser={this.setUser} {...props} />} />
            <Route path="/petitions" exact render={() => <PetitionsList />} />
            <Route path="/petitions/:petition_id" render={props => <PetitionDetails {...props}/>} />
            <Route path="/centers" exact render={() => <CentersList />} />
            <Route path="/centers/:center_id" render={props => <CenterDetails {...props}/>} />
          </Switch>
        </main>

      </>

    )
  }
}

export default App;