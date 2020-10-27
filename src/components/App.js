import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GlobalStyle from '../styles/styles';
import { UserProvider } from '../contexts/UserContext';
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';

const App = () => {
    return (
        <UserProvider>
            <GlobalStyle />
            <Router>
                <Switch>
                    <Route path='/' exact>
                        <SignIn />
                    </Route>
                    <Route path='/sign-up'>
                        <SignUp />
                    </Route>
                </Switch>
            </Router>
        </UserProvider>
    );
}

export default App;