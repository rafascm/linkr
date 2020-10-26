import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GlobalStyle from '../styles/styles';
import Login from '../pages/Login';

const App = () => {
    return (
        <>
            <GlobalStyle />
            <Router>
                <Switch>
                    <Route path='/' exact>
                        <Login />
                    </Route>
                </Switch>
            </Router>
        </>
    );
}

export default App;