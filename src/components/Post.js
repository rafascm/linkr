import React, { useContext, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../styles/styles";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import ReactHashtag from "react-hashtag";
import PostsContext from "../contexts/PostsContext";
import ReactTooltip from "react-tooltip";
import UserContext from "../contexts/UserContext";

const Post = ({ post }) => {
  const history = useHistory();
  const { setClickedUser, setClickedHashtag, updatePostsList } = useContext(
    PostsContext
  );

  const { User } = useContext(UserContext);
  const { token } = User;
  const [config] = useState({ headers: { "user-token": token } });
  const {
    user,
    text,
    likes,
    link,
    linkTitle,
    linkDescription,
    linkImage,
  } = post;

  const initialState = likes.some((like) => like.userId === user.id);
  const [isLiked, setIsLiked] = useState(initialState);
  const [likedArray, setLikedArray] = useState(likes);

  const hashtagClickedHandler = (tag) => {
    setClickedUser({});
    setClickedHashtag("");
    setClickedHashtag(tag.substring(1));
    updatePostsList(config);

    history.push(`/hashtag/${tag.substring(1)}`);
  };

  const userClickedHandler = (user) => {
    setClickedHashtag("");
    setClickedUser({});
    setClickedUser(user);
    updatePostsList(config);

    history.push(`/user/${user.id}`);
  };

  const likePost = () => {
    if (!isLiked) {
      const likeObj = { id: User.id, username: User.username };
      axios
        .post(
          `https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts/${post.id}/like`,
          likeObj,
          config
        )
        .then(({ data }) => {
          setLikedArray([...data.post.likes]);
          setIsLiked(!isLiked);
        })
        .catch((error) => console.error(error));
    } else {
      const likeObj = { id: User.id, username: User.username };
      axios
        .post(
          `https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts/${post.id}/dislike`,
          likeObj,
          config
        )
        .then(({ data }) => {
          setLikedArray([...data.post.likes]);
          setIsLiked(!isLiked);
        })
        .catch((error) => console.error(error));
    }
  };

  const parseTooltipText = (likedArray, isLiked) => {
    let newString = "";
    if (likedArray.length === 0) return "Sem curtidas";
    const likeNames = likedArray.map((like) => like["user.username"]);
    if (isLiked) {
      if (likeNames.length === 1) return "Voce curtiu isso";
      newString = `Voce, ${likeNames[0]} e outras ${
        likeNames.length - 2
      } pessoas `;
    } else {
      if (likeNames.length === 1) return `${likeNames[0]} curtiu isso`;
      newString = `${likeNames[0]}, ${likeNames[1]} e outras ${
        likeNames.length - 2
      } pessoas`;
    }
    return newString;
  };

  return (
    <Container>
      <ImageContainer>
        <img src={user.avatar} onClick={() => userClickedHandler(user)} />
        {isLiked ? (
          <HeartIconFull onClick={likePost} />
        ) : (
          <HeartIcon onClick={likePost} />
        )}
        <p data-tip={parseTooltipText(likedArray, isLiked)}>
          {likes.length} likes
        </p>
        <ReactTooltip />
      </ImageContainer>
      <TextContainer>
        <InfoContainer>
          <h2 onClick={() => userClickedHandler(user)}>{user.username}</h2>
          <h3>
            <ReactHashtag
              renderHashtag={(val) => (
                <Hashtag key={val} onClick={() => hashtagClickedHandler(val)}>
                  {val}
                </Hashtag>
              )}
            >
              {text}
            </ReactHashtag>
          </h3>
        </InfoContainer>
        <PreviewContainer href={link} target="_blank">
          <div>
            <h1>{linkTitle}</h1>
            <p>{linkDescription}</p>
            <h6>{link}</h6>
          </div>
          <img src={linkImage} />
        </PreviewContainer>
      </TextContainer>
    </Container>
  );
};

export default Post;

const Container = styled.div`
  width: 100%;
  background-color: ${colors.bgContainer};
  padding: 1rem;
  border-radius: 1rem;
  display: flex;
  justify-content: space-between;

  &:last-child {
    margin-bottom: 3rem;
  }
`;
const ImageContainer = styled.div`
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
`;

const HeartIcon = styled(IoIosHeartEmpty)`
  color: ${colors.secondaryText};
  font-size: 2rem;
`;

const HeartIconFull = styled(IoIosHeart)`
  color: red;
  font-size: 2rem;
`;

const TextContainer = styled.div`
  width: 100%;
`;

const InfoContainer = styled.div`
  width: 100%;
  margin-bottom: 1rem;

  & > h2 {
    margin: 1rem 0;
    font-family: "Lato", sans-serif;
    color: ${colors.secondaryText};
    font-size: 1.2rem;
  }

  & > h3 {
    font-size: 1rem;
    color: ${colors.mainText};
  }
`;

const PreviewContainer = styled.a`
  width: 100%;
  display: flex;
  border-radius: 1rem;
  border: 0.05rem solid ${colors.mainText};
  justify-content: space-between;
  margin-bottom: 1rem;
  text-decoration: none;

  & > img {
    width: 15rem;
    height: 15rem;
    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;
  }

  & > div {
    padding: 1rem;

    word-break: break-word;

    & > * + * {
      margin-top: 1rem;
    }

    & > h1 {
      font-family: "Lato", sans-serif;
      font-size: 1.2rem;
      color: ${colors.mainText};
      overflow-wrap: break-word;
    }

    & > p {
      font-size: 0.9rem;
      color: ${colors.mainText};
      overflow-wrap: break-word;
    }

    & > h6 {
      font-size: 0.7rem;
      color: ${colors.mainText};
      text-overflow: ellipsis;
    }
  }
`;

const Hashtag = styled.span`
  color: ${colors.secondaryText};
  font-weight: bold;
`;
