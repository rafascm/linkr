import React, { useContext, useState, useEffect } from "react";
import Axios from "axios";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { colors } from "../styles/styles";
import UserContext from "../contexts/UserContext";
import PostsContext from "../contexts/PostsContext";
import FollowContext from "../contexts/FollowContext";
import { DebounceInput } from "react-debounce-input";

const Header = () => {
  const { User } = useContext(UserContext);
  const { user, token } = User;
  const [config] = useState({ headers: { "user-token": token } });

  const { followingArray, requestFollowers } = useContext(FollowContext);
  const [usersFound, setUsersFound] = useState("");

  useEffect(() => requestFollowers(), []);

  const {
    setPostsList,
    updatePostsList,
    setClickedUser,
    setClickedHashtag,
    setClickedMyLikes,
  } = useContext(PostsContext);

  const [hasClicked, setHasClicked] = useState(false);

  const history = useHistory();

  const dropMenu = () => {
    setHasClicked(!hasClicked);
  };

  const logoClickHandler = () => {
    setClickedHashtag("");
    setClickedUser({});
    setClickedMyLikes(false);
    setPostsList([]);
    updatePostsList(config);
    history.push("/timeline");
  };

  const userClickedHandler = (user) => {
    setClickedMyLikes(false);
    setClickedHashtag("");
    setClickedUser({});
    setClickedUser(user);
    setPostsList([]);
    updatePostsList(config);
    history.push(`/user/${user.id}`);
  };

  const myLikesHandler = () => {
    setClickedHashtag("");
    setClickedUser({});
    setPostsList([]);
    setClickedMyLikes(true);
    updatePostsList(config);
  };

  const getUsers = (searchName) => {
    Axios.get(
      `https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/users/search?username=${searchName}`,
      config
    )
      .catch((err) => console.error(err))
      .then(({ data }) => realignFollowingFirst(data));

    realignInputResults();
  };

  const realignFollowingFirst = (data) => {
    let following = [""];
    let notFollowing = [""];
    let concatArr = [""];

    following = data.users.filter((user) => {
      return followingArray.some((follow) => follow.id === user.id);
    });

    notFollowing = data.users.filter((user) => {
      return !following.some((follow) => follow.id === user.id);
    });

    concatArr = [...following, ...notFollowing];

    setUsersFound(concatArr);
  };

  const checkFollowing = (user) => {
    return (
      followingArray && followingArray.some((follow) => follow.id === user.id)
    );
  };

  const logoutFunc = () => {
    localStorage.removeItem("user");
    setClickedMyLikes(false);
    setClickedHashtag("");
    setClickedUser({});
    setClickedUser("");
    setPostsList([]);
  };

  return (
    <HeaderContainer>
      <h1 onClick={() => logoClickHandler()}>linkr</h1>
      <SearchContainer>
        <StyledDebounce
          placeholder="Search for people and friends..."
          minLength={3}
          debounceTimeout={300}
          onChange={(event) => getUsers(event.target.value)}
        />
        <SearchDropdown>
          {usersFound &&
            usersFound.map((user) => (
              <li onClick={() => userClickedHandler(user)} key={user.id}>
                <img src={user.avatar} />
                {user.username}
                <p>{checkFollowing(user) ? "-Following-" : ""}</p>
              </li>
            ))}
        </SearchDropdown>
      </SearchContainer>
      <div>
        <span onClick={() => dropMenu()}>
          {hasClicked ? <UpIcon /> : <DropDownIcon />}
        </span>
        <img src={user.avatar} onClick={() => dropMenu()} />
        <DropDownMenu clicked={hasClicked.toString()}>
          <Link onClick={() => userClickedHandler(user)} to="/my-posts">
            <p>My posts</p>
          </Link>
          <Link onClick={() => myLikesHandler()} to="/my-likes">
            <p>My likes</p>
          </Link>
          <Link onClick={() => logoutFunc()} to="/">
            <p>Logout</p>
          </Link>
        </DropDownMenu>
      </div>
    </HeaderContainer>
  );
};

export default Header;

const SearchContainer = styled.div`
  position: relative;
  width: 30%;
  height: auto;
  display: flex;
  flex-direction: column;
`;

const SearchDropdown = styled.div`
  position: absolute;
  top: 2rem;
  left: 0;
  width: 100%;
  max-height: 7rem;
  display: flex;
  flex-direction: column;
  background-color: ${colors.bgInput};
  border-radius: 0.2rem;
  overflow-y: scroll;

  > li {
    width: 100%;
    height: auto;
    cursor: pointer;
    font-size: 1rem;
    color: black;
    display: flex;
    align-items: center;
    margin-bottom: 0.3rem;
  }

  img {
    width: 2rem;
    height: 2rem;
    border-radius: 1rem;
    margin: 0 1rem;
  }

  p {
    font-size: 0.7rem;
    color: slategray;
    margin-left: 1rem;
  }
`;

const StyledDebounce = styled(DebounceInput)`
  z-index: 9999;
  width: 100%;
  height: 2rem;
  padding: 0 1rem;
  border-radius: 0.5rem;
  outline-style: none;
  border: none;
`;

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4rem;
  display: flex;
  padding: 0 1rem;
  justify-content: space-between;
  align-items: center;
  background-color: ${colors.bgHeader};
  z-index: 999;

  h1 {
    font-size: 2.75rem;
    color: ${colors.secondaryText};
  }

  & > div {
    display: flex;
    align-items: center;
  }

  img {
    cursor: pointer;
    height: 2.75rem;
    width: auto;
    border-radius: 50%;
    margin-left: 1rem;
  }
`;

const DropDownIcon = styled(FaChevronDown)`
  font-size: 1.5rem;
  color: ${colors.secondaryText};
  cursor: pointer;
`;

const UpIcon = styled(FaChevronUp)`
  font-size: 1.5rem;
  color: ${colors.secondaryText};
  cursor: pointer;
`;

const DropDownMenu = styled.div`
  z-index: -999;
  position: absolute;
  top: ${({ clicked }) => (clicked === "true" ? "4rem" : "-7rem")};
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  height: 7rem;
  width: 8rem;
  background-color: ${colors.bgHeader};
  border-radius: 0 0 0 2rem;
  transition: all 0.3s ease-out;

  p {
    cursor: pointer;
    margin: 0.3rem;
    color: ${({ clicked }) =>
      clicked === "true" ? colors.secondaryText : colors.bgHeader};
  }
`;
