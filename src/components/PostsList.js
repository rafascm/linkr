import React, { useContext, useState, useEffect } from "react";
import Axios from "axios";
import InfiniteScroll from "react-infinite-scroller";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";
import PostsContext from "../contexts/PostsContext";
import Post from "./Post.js";

const PostsList = () => {
  const {
    postsList,
    setPostsList,
    updatePostsList,
    increaseOffset,
    setIncreaseOffset,
    clickedUser,
    clickedHashTag,
    clickedMyLikes,
  } = useContext(PostsContext);

  const { User } = useContext(UserContext);
  const { token } = User;
  const [config] = useState({ headers: { "user-token": token } });
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => updatePostsList(config), [clickedUser, clickedHashTag]);

  const loadFunc = () => {
    const tailURL = `posts?offset=${increaseOffset}&limit=5`;
    const headURL = "https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr";
    const likedURL = "posts/liked";

    const userHasBeenClicked = Object.keys(clickedUser).length;

    const url = clickedHashTag
      ? `${headURL}/hashtags/${clickedHashTag}/${tailURL}`
      : userHasBeenClicked
      ? `${headURL}/users/${clickedUser.id}/${tailURL}`
      : clickedMyLikes
      ? `${headURL}/${likedURL}?offset=${increaseOffset}&limit=5`
      : `${headURL}/${tailURL}`;

    Axios.get(url, config).then(({ data }) => {
      setIncreaseOffset(increaseOffset + 5);
      if (!(data.posts.length > 0)) setHasMore(false);
      setPostsList([...new Set([...postsList, ...data.posts])]);
    });
  };

  return (
    <>
      <StyledInfiniteScroll
        loadMore={loadFunc}
        hasMore={hasMore}
        loader={
          <LoadingContainer key={Math.floor(Math.random() * 1000000)}>
            <Loading src="/media/loading.gif" />
          </LoadingContainer>
        }
      >
        {postsList.map((post) => (
          <Post post={post} key={Math.floor(Math.random() * 1000000)} />
        ))}
      </StyledInfiniteScroll>
    </>
  );
};

//

export default PostsList;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Loading = styled.img`
  width: 10rem;
  height: auto;
`;

const StyledInfiniteScroll = styled(InfiniteScroll)`
  & > * + * {
    margin-top: 2rem;
  }
`;
