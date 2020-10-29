import React, { useContext } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Trending from '../components/Trending';
import PostsContext from '../contexts/PostsContext';
import { colors } from '../styles/styles';
import PostsList from '../components/PostsList';

const UserProfile = () => {
    const { clickedUser } = useContext(PostsContext);

    return (
        <>
            <Header />
            <Trending />
            <Container>
                <h2>{clickedUser.username}'s posts</h2>
                <Content>                    
                    <PostsList />
                </Content>
            </Container>
        </>
    );
}

export default UserProfile;

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
