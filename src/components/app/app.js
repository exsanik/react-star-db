import React from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorCatch from '../error-catch';
import {SwapiServiceProvider} from '../swapiServiceContext'
import {PeoplePage, PlanetPage, StarshipPage, SecretPage, LoginPage} from '../pages';
import ItemDetails from '../item-details'

import SwapiService from '../../services/swapiService.js'

import './app.css';

import  { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

export default class App extends React.Component
{
  state = {
    swapiService: new SwapiService(),
    isLoggedIn: false
  };
  onLogin = () => {
    this.setState({isLoggedIn: true});
  };

  render() {
    const {swapiService, isLoggedIn } = this.state; 

    return (
      <ErrorCatch>
        <SwapiServiceProvider value = {swapiService}>
          <Router>
            <ErrorCatch><Header /></ErrorCatch>
            <RandomPlanet swapiService = {swapiService}/>

            <Switch>
              <Route path={process.env.PUBLIC_URL+"/"} exact render={() => <h2>Welcome to StarDB</h2>} /> 
              <Route path= {process.env.PUBLIC_URL+"/people/:id?"} component = {PeoplePage}/> 
              <Route path= {process.env.PUBLIC_URL+"/planets/:id?"} component = {PlanetPage}/> 
              <Route path= {process.env.PUBLIC_URL+"/starships"} exact component = {StarshipPage}/> 
              <Route path = {process.env.PUBLIC_URL+"/starships/:id"}
                    render = { ({match}) => {
                      const {id} = match.params;
                      return <ItemDetails getData={swapiService.getStarship} itemId = {id} />
                    }}/>
              <Route path ={process.env.PUBLIC_URL+"/secret"} 
                    render ={() => {
                      return <SecretPage isLoggedIn={isLoggedIn}/>;
                    }}/>
              <Route path = {process.env.PUBLIC_URL+"/login"} 
                    render ={() => {
                      return <LoginPage isLoggedIn={isLoggedIn} 
                                        onLogin={this.onLogin}/>
                    }} />
              <Redirect to={process.env.PUBLIC_URL+'/'} />
            </Switch>
          </Router>
        </SwapiServiceProvider>
      </ErrorCatch>
    );
  }
};
