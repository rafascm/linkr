import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import FollowContext from "../contexts/FollowContext";

export default function FollowUnfollow() {
  const {
    requestFollowers,
    followUser,
    unfollowUser,
    isFollowing,
  } = useContext(FollowContext);

  useEffect(() => requestFollowers(), []);

  return (
    <ButtonContainer>
      <Follow
        onClick={() => (isFollowing ? unfollowUser() : followUser())}
        following={isFollowing}
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </Follow>
    </ButtonContainer>
  );
}

const Follow = styled.button`    
    background-color: ${({ following }) => (following ? "red" : "green")};
    color: white;
    font-family: "Oswald", sans-serif;
    font-size: 0.8rem;
    width: 100%
    height: 2rem;
    padding: 0 1rem;
    border-radius: 0.5rem;
    outline-style: none;
    border: none;
    margin-bottom:1rem;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
