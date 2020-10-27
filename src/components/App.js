import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GlobalStyle from '../styles/styles';
import { UserProvider } from '../contexts/UserContext';
import { PostsProvider } from '../contexts/PostsContext';
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';
import Timeline from '../pages/Timeline';

const App = () => {
    return (
        <UserProvider>
            <PostsProvider>
                <GlobalStyle />
                <Router>
                    <Switch>
                        <Route path='/' exact>
                            <SignIn />
                        </Route>
                        <Route path='/sign-up'>
                            <SignUp />
                        </Route>
                        <Route path='/timeline'>
                            <Timeline />
                        </Route>
                    </Switch>
                </Router>
            </PostsProvider>
        </UserProvider>
    );
}

export default App; 