import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import React, { Component } from 'react'
import AuthService from './../service/auth.service'
import { Switch, Route, Redirect } from 'react-router-dom'

import Navigation from './Layout/Navbar/Navbar'
import LoginForm from './pages/Login/Login-form'
import PetitionsList from './pages/Petitions/Petitions-list/Petitions-list'
import CentersList from './../components/pages/Centers/Center-list/Centers-list'
import PetitionDetails from './pages/Petitions/Petition-details/Petition-details'
import CenterDetails from './pages/Centers/Center-details/Center-details'
import Profile from './pages/Profiles/Profile-page/Profile-page'
import UsersList from './pages/Users/Users-list'
import HomePage from './pages/Homepage/Home'
import Footer from './../components/Layout/Footer/Footer'
import UserDetails from './pages/Users/User-details'
import Info from './pages/Homepage/Info'

import GeneralCenterForm from './pages/Centers/Center-form/General-center-form'

import GeneralProfileForm from './pages/Profiles/Profile-form/General-profile-form'

import GeneralPetitionForm from './pages/Petitions/Petition-form/General-petition-form'


class App extends Component {

  constructor() {
    super()

    this.state = { loggedInUser: '' }
    this.authService = new AuthService()
  }

  componentDidMount = () => {

    this.authService
      .isLoggedIn()
      .then(response => this.setUser(response.data))
      .catch(() => this.setUser(undefined))
  }

  setUser = user => this.setState({ loggedInUser: user })

  render() {
    return (
      <div id="container">
        <div id="header">
          <Navigation storeUser={this.setUser} loggedUser={this.state.loggedInUser} />
        </div>

        <main>
          <Switch>

            <Route path="/" exact render={() => <HomePage storeUser={this.setUser} user={this.state.loggedInUser} />} />
            <Route path="/info" exact render={() => <Info storeUser={this.setUser} user={this.state.loggedInUser} />} />

            <Route path="/signup" render={props => (this.state.loggedInUser ? <Redirect to="/" /> : <GeneralProfileForm storeUser={this.setUser} user={this.state.loggedInUser} {...props} />)} />
            <Route path="/login" render={props => <LoginForm storeUser={this.setUser} {...props} />} />

            <Route path="/petitions" exact render={props => <PetitionsList user={this.state.loggedInUser} {...props} />} />
            <Route path="/petitions/new" render={props => <GeneralPetitionForm user={this.state.loggedInUser} {...props} />} />
            <Route path="/petitions/edit/:petition_id" exact render={props => <GeneralPetitionForm user={this.state.loggedInUser} {...props} />} />
            <Route path="/petitions/:petition_id" render={props => <PetitionDetails user={this.state.loggedInUser} {...props} />} />

            <Route path="/centers" exact render={() => <CentersList user={this.state.loggedInUser} />} />
            <Route path="/centers/new" render={props => <GeneralCenterForm user={this.state.loggedInUser} {...props} />} />
            <Route path="/centers/:center_id" render={props => <CenterDetails user={this.state.loggedInUser} {...props} />} />
            <Route path="/center/edit/:center_id" render={props => <GeneralCenterForm user={this.state.loggedInUser} {...props} />} />

            <Route path="/profile" exact render={() => <Profile user={this.state.loggedInUser} />} />
            <Route path="/profile/edit/:user_id" render={props =>
            (this.state.loggedInUser?._id === props.match.params
              .user_id || this.state.loggedInUser?.role === 'ADMIN' ?
              <GeneralProfileForm storeUser={this.setUser} user={this.state.loggedInUser} {...props} /> : <Redirect to="/" />)
            } />
            <Route path="/profile/mypetitions" render={props => (this.state.loggedInUser ? <PetitionsList user={this.state.loggedInUser} {...props} /> : <Redirect to="/petitions" />)} />

            <Route path="/users" exact render={() => <UsersList user={this.state.loggedInUser} />} />
            <Route path="/users/new" render={props => (this.state.loggedInUser?.role === 'ADMIN' && <GeneralProfileForm storeUser={this.setUser} user={this.state.loggedInUser} {...props} />)} />
            <Route path="/users/:user_id" render={props => <UserDetails user={this.state.loggedInUser} {...props} />} />

          </Switch>
        </main>

        <div id="footer">
          <Footer />
        </div>
      </div>
    )
  }
}

export default App;