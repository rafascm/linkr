import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GlobalStyle from "../styles/styles";
import { UserProvider } from "../contexts/UserContext";
import { PostsProvider } from "../contexts/PostsContext";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import TimeLine from "../pages/TimeLine";
import UserProfile from "../pages/UserProfile";
import HashtagPosts from "../pages/HashtagPosts";
import { AnimatePresence } from "framer-motion";

const App = () => {
  return (
    <UserProvider>
      <PostsProvider>
        <GlobalStyle />
        <Router>
          <AnimatePresence>
            <Switch>
              <Route path="/" exact>
                <SignIn />
              </Route>
              <Route path="/sign-up">
                <SignUp />
              </Route>
              <Route path="/timeline">
                <TimeLine />
              </Route>
              <Route path="/user">
                <UserProfile />
              </Route>
              <Route path="/hashtag">
                <HashtagPosts />
              </Route>
            </Switch>
          </AnimatePresence>
        </Router>
      </PostsProvider>
    </UserProvider>
  );
};

export default App;
