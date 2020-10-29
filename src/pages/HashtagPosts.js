import React, { useContext } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Trending from '../components/Trending';
import PostsContext from '../contexts/PostsContext';
import { colors } from '../styles/styles';
import PostsList from '../components/PostsList';
import { motion } from 'framer-motion';

const HashtagPosts = () => {
    const { clickedHashTag } = useContext(PostsContext);
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
                    <h2># {clickedHashTag}</h2>
                    <Content>
                        <PostsList />
                    </Content>
                </Container>
            </AnimatedContainer>
        </>
    );
}

export default HashtagPosts;

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
`;

const Content = styled.div`
    width: 70%;
    height: 100%;

    & > * + * {
        margin-top: 2rem;
    }
`;

const AnimatedContainer = styled(motion.div)`
    width: 100%;
`;