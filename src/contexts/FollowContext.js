import Axios from "axios";
import React, { useState, createContext, useContext } from "react";
import UserContext from "../contexts/UserContext";
import PostsContext from "../contexts/PostsContext";

const FollowContext = createContext();

export default FollowContext;

export const FollowProvider = (props) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followingArray, setFollowingArray] = useState("");
  const { clickedUser } = useContext(PostsContext);
  const { User } = useContext(UserContext);
  const { token } = User;
  //const [config] = useState({ headers: { "user-token": token } });

  const requestFollowers = () => {
    const url =
      "https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/users/follows";
    Axios.get(url, { headers: { "user-token": token } })
      .catch((err) => console.error(err))
      .then(({ data }) => processFollower(data));
  };

  const processFollower = (data) => {
    setFollowingArray(data.users);
    let follow = data.users.some((user) => user.id === clickedUser.id);
    setIsFollowing(follow);
    console.log(data);
  };

  const followUser = () => {
    const url = `https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/users/${clickedUser.id}/follow`;
    Axios.post(url, {}, { headers: { "user-token": token } })
      .catch((err) => console.error(err))
      .then(() => {
        setIsFollowing(true);
        requestFollowers();
      });
  };

  const unfollowUser = () => {
    const url = `https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/users/${clickedUser.id}/unfollow`;
    Axios.post(url, {}, { headers: { "user-token": token } })
      .catch((err) => console.error(err))
      .then(() => {
        setIsFollowing(false);
        requestFollowers();
      });
  };

  return (
    <FollowContext.Provider
      value={{
        requestFollowers,
        followUser,
        unfollowUser,
        isFollowing,
        followingArray,
      }}
    >
      {props.children}
    </FollowContext.Provider>
  );
};
