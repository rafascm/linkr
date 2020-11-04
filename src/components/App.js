import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GlobalStyle from "../styles/styles";
import { UserProvider } from "../contexts/UserContext";
import { PostsProvider } from "../contexts/PostsContext";
import { FollowProvider } from "../contexts/FollowContext";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import Timeline from "../pages/Timeline";
import UserProfile from "../pages/UserProfile";
import HashtagPosts from "../pages/HashtagPosts";
import MyLikes from "../pages/MyLikes";
import MyPosts from "../pages/MyPosts";
import { AnimatePresence } from "framer-motion";

const App = () => {
  return (
    <UserProvider>
      <PostsProvider>
        <FollowProvider>
          <GlobalStyle />
          <Router basename="/linkr">
            <AnimatePresence>
              <Switch>
                <Route path="/" exact>
                  <SignIn />
                </Route>
                <Route path="/sign-up">
                  <SignUp />
                </Route>
                <Route path="/timeline">
                  <Timeline />
                </Route>
                <Route path="/user">
                  <UserProfile />
                </Route>
                <Route path="/hashtag">
                  <HashtagPosts />
                </Route>
                <Route path="/my-likes">
                  <MyLikes />
                </Route>
                <Route path="/my-posts">
                  <MyPosts />
                </Route>
              </Switch>
            </AnimatePresence>
          </Router>
        </FollowProvider>
      </PostsProvider>
    </UserProvider>
  );
};

export default App;
