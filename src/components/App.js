import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GlobalStyle from '../styles/styles';
import { UserProvider } from '../contexts/UserContext';
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';
import TimeLine from '../pages/TimeLine';

const App = () => {
    return (
        <UserProvider>
            <GlobalStyle />
            <Router>
                <Switch>
                    <Route path='/' exact component={SignIn} />
                       
                    <Route path='/sign-up' component={SignUp} />
                       
                    <Route path='/timeline' component={TimeLine} />                     
                </Switch>
            </Router>
        </UserProvider>
    );
}

export default App; 