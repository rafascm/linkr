import React, { useContext } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Trending from "../components/Trending";
import { colors } from "../styles/styles";
import PostsList from "../components/PostsList";
import { motion } from "framer-motion";

const MyPosts = () => {
  return (
    <>
      <Header />
      <AnimatedContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Trending />
        <Container>
          <h2>My Posts</h2>
          <Content>
            <PostsList />
          </Content>
        </Container>
      </AnimatedContainer>
    </>
  );
};

export default MyPosts;

const Container = styled.div`
  max-width: 64rem;
  margin: 0 auto;
  height: 100%;
  padding-top: 6rem;

  & > h2 {
    width: 100%;
    color: ${colors.secondaryText};
    font-size: 2.5rem;
    margin-bottom: 3rem;
  }
  @media (max-width: 1024px) {
    & > h2 {
      width: initial;
      margin-left: 1rem;
      margin-bottom: 1.5rem;
    }
  }
`;

const Content = styled.div`
  width: 70%;
  height: 100%;

  & > * + * {
    margin-top: 2rem;
  }

  @media (max-width: 1024px) {
    & {
      width: 100%;
    }
  }
`;

const AnimatedContainer = styled(motion.div)`
  width: 100%;
`;
