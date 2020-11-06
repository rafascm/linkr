import React from "react";
import styled from "styled-components";
import ReactTooltip from "react-tooltip";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { colors } from "../styles/styles";

const ImageContainer = ({
  user,
  likePost,
  userClickedHandler,
  isLiked,
  likedArray,
  parseTooltipText,
}) => (
  <Container>
    <img src={user.avatar} onClick={() => userClickedHandler(user)} />
    {isLiked ? (
      <HeartIconFull onClick={likePost} />
    ) : (
      <HeartIcon onClick={likePost} />
    )}
    <p data-tip={parseTooltipText(likedArray, isLiked)}>
      {likedArray.length} likes
    </p>
    <ReactTooltip />
  </Container>
);

export default ImageContainer;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 1rem;

  & > * + * {
    margin-top: 0.5rem;
  }

  img {
    border-radius: 50%;
    width: 4rem;
    height: 4rem;
  }

  p {
    color: ${colors.secondaryText};
  }

  @media (max-width: 1024px) {
    img {
      width: 2rem;
      height: 2rem;
    }
  }
`;

const HeartIcon = styled(IoIosHeartEmpty)`
  color: ${colors.secondaryText};
  font-size: 2rem;

  @media (max-width: 1024px) {
    & {
      font-size: 0.9rem;
    }
  }
`;

const HeartIconFull = styled(IoIosHeart)`
  color: red;
  font-size: 2rem;
`;
