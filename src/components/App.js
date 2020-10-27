import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GlobalStyle from '../styles/styles';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import {UserProvider} from '../contexts/UserContext'

const App = () => {
    return (
        <>
            <UserProvider>
                <GlobalStyle />
                <Router>
                    <Switch>
                        <Route path='/' exact>
                            <SignIn />
                        </Route>
                        <Route path='/signUp' component={SignUp} />
                    </Switch>
                </Router>
            </UserProvider>
        </>
    );
}

export default App; 