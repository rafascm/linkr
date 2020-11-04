import React, { useContext, useState, useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../styles/styles";
import PostsContext from "../contexts/PostsContext";
import UserContext from "../contexts/UserContext";
import ImageContainer from './ImageContainer';
import InfoContainer from './InfoContainer';
import YouTube from 'react-youtube';
import getYoutubeID from 'get-youtube-id';

const Post = ({ post }) => {
  const history = useHistory();
  const {
    setClickedUser,
    setClickedHashtag,
    updatePostsList,
    setClickedMyLikes,
    clickedMyLikes,
  } = useContext(PostsContext);

  const { User } = useContext(UserContext);
  const { token } = User;
  const [config] = useState({ headers: { "user-token": token } });
  const {
    id,
    user,
    text,
    likes,
    link,
    linkTitle,
    linkDescription,
    linkImage,
  } = post;

  const initialState = likes.some((like) => {
    return clickedMyLikes
      ? like.id === User.user.id
      : like["user.id"] === User.user.id;
  });
  const [isLiked, setIsLiked] = useState(initialState);
  const [likedArray, setLikedArray] = useState(likes);


  const userClickedHandler = (user) => {
    setClickedMyLikes(false);
    setClickedHashtag("");
    setClickedUser({});
    setClickedUser(user);
    updatePostsList(config);

    history.push(`/user/${user.id}`);
  };

  const likePost = () => {
    if (!isLiked) {
      const likeObj = { id: User.user.id, username: User.user.username };
      axios
        .post(
          `https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts/${post.id}/like`,
          likeObj,
          config
        )
        .then(({ data }) => {
          setLikedArray([...data.post.likes]);
          setIsLiked(!isLiked);
          updatePostsList(config);
        })
        .catch((error) => console.error(error));
    } else {
      const likeObj = { id: User.user.id, username: User.user.username };
      axios
        .post(
          `https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts/${post.id}/dislike`,
          likeObj,
          config
        )
        .then(({ data }) => {
          setLikedArray([...data.post.likes]);
          setIsLiked(!isLiked);
          updatePostsList(config);
        })
        .catch((error) => console.error(error));
    }
  };

  const parseTooltipText = (likedArray, isLiked) => {
    let newString = "";

    if (likedArray.length === 0) return "Sem curtidas";

    let likeNames = likedArray.map((like) => {
      return clickedMyLikes ? like.username : like["user.username"];
    });

    if (isLiked) {
      if (likeNames.length === 1) return "Voce curtiu isso";

      let aux = likeNames;

      likeNames = likeNames.filter((name) => name !== User.user.username);

      if (aux.length === 2) return `Voce e ${likeNames[0]} curtiram isso`;

      newString = `Voce, ${likeNames[0]} e outra(s) ${likeNames.length - 1
        } pessoa(s) curtiram isso`;
    } else {
      if (likeNames.length === 1) return `${likeNames[0]} curtiu isso`;
      if (likeNames.length === 2)
        return `${likeNames[0]} e ${likeNames[1]} curtiram isso`;

      newString = `${likeNames[0]}, ${likeNames[1]} e outra(s) ${likeNames.length - 2
        } pessoa(s) curtiram isso`;
    }
    return newString;
  };


  const onReady = event => event.target.pauseVideo();

  return (
    <Container>
      <ImageContainer
        user={user}
        likePost={likePost}
        userClickedHandler={userClickedHandler}
        isLiked={isLiked}
        likedArray={likedArray}
        parseTooltipText={parseTooltipText}
      />
      <TextContainer>
        <InfoContainer
          id={id}
          User={User}
          user={user}
          userClickedHandler={userClickedHandler}
          text={text}
          setClickedMyLikes={setClickedMyLikes}
          setClickedUser={setClickedUser}
          setClickedHashtag={setClickedHashtag}
          updatePostsList={updatePostsList}
          config={config}
        />
        {
          getYoutubeID(link) ?
            <YouTube videoId={getYoutubeID(link)} opts={opts} onReady={e => onReady(e)}/> :
            <PreviewContainer href={link} target="_blank">
              <div>
                <h1>{linkTitle} {getYoutubeID(link)}</h1>
                <p>{linkDescription}</p>
                <h6>{link}</h6>
              </div>
              <img src={linkImage} />
            </PreviewContainer>
        }
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

const TextContainer = styled.div`
  width: 100%;
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
  @media (max-width: 1024px) {
        & > img {
            display:none;
        }
        p {
            overflow: hidden;
            text-overflow: ellipsis;
            max-height: 2rem
        }
    }
`;

const opts = {
  height: 341,
  width: 560,
  playerVars: {
    autoplay: 0
  }
}
