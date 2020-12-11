import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import React, { Component } from 'react'
import AuthService from './../service/auth.service'
import { Switch, Route, Redirect } from 'react-router-dom'

import Navigation from './Layout/Navbar/Navbar'
import SignupForm from './pages/Signup/Signup-form'
import LoginForm from './pages/Login/Login-form'
import PetitionForm from './pages/Petitions/Petition-form/New-petition-form'
import PetitionsList from './pages/Petitions/Petitions-list/Petitions-list'
import CentersList from './../components/pages/Centers/Center-list/Centers-list'
import PetitionDetails from './pages/Petitions/Petition-details/Petition-details'
import CenterDetails from './pages/Centers/Center-details/Center-details'
import Profile from './pages/Profiles/Profile-page/Profile-page'
import ProfileEdit from './pages/Profiles/Profile-edit/Profile-edit-form'
import PetitionEdit from './pages/Petitions/Edit-petition/Edit-petition-form'
import UsersList from './pages/Users/Users-list'

import GeneralCenterForm from './pages/Centers/Center-form/General-center-form'

import GeneralProfileForm from './pages/Profiles/Profile-form/General-profile-form'


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

            <Route path="/signup"  render={props => (this.state.loggedInUser ? <Redirect to="/"/> : <GeneralProfileForm storeUser={this.setUser} userLogged={this.state.loggedInUser} {...props} /> )} />
            <Route path="/login" render={props => <LoginForm storeUser={this.setUser} {...props} />} />

            <Route path="/petitions" exact render={() => <PetitionsList />} />
            <Route path="/petitions/:petition_id" exact render={props => <PetitionDetails user={this.state.loggedInUser} {...props} />} />
            <Route path="/petitions/edit/:petition_id" render={props => <PetitionEdit user={this.state.loggedInUser} {...props} />} />

            <Route path="/centers" exact render={() => <CentersList user={this.state.loggedInUser} />} />
            <Route path="/centers/new" render={props => <GeneralCenterForm user={this.state.loggedInUser} {...props}/>} />
            <Route path="/centers/:center_id" render={props => <CenterDetails user={this.state.loggedInUser} {...props} />} />
            <Route path="/center/edit/:center_id" render={props => <GeneralCenterForm user={this.state.loggedInUser} {...props} />} />

            <Route path="/profile" exact render={props => <Profile user={this.state.loggedInUser} {...props}/>} />
            <Route path="/profile/edit/:user_id" exact render={props => <GeneralProfileForm storeUser={this.setUser} user={this.state.loggedInUser} {...props}/>} />

            <Route path="/users" exact render={() => <UsersList user={this.state.loggedInUser}/>} />
            
          </Switch>
        </main>

      </>

    )
  }
}

export default App;