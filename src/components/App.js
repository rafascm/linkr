import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GlobalStyle from '../styles/styles';
import { UserProvider } from '../contexts/UserContext';
import { PostsProvider } from '../contexts/PostsContext';
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';
import TimeLine from '../pages/TimeLine';
import UserProfile from '../pages/UserProfile';

const App = () => {
    return (
        <UserProvider>
            <PostsProvider>
                <GlobalStyle />
                <Router>
                    <Switch>
                        <Route path='/' exact component={SignIn} />
                        <Route path='/sign-up' component={SignUp} />
                        <Route path='/timeline' component={TimeLine} />
                        <Route path='/user' component={UserProfile} />  
                    </Switch>
                </Router>
            </PostsProvider>
        </UserProvider>
    );
}

export default App; 