import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Trending from '../components/Trending';
import UserContext from '../contexts/UserContext';
import PostsContext from '../contexts/PostsContext';
import { colors } from '../styles/styles';

const UserProfile = () => {
    const { postsList, updatePostsList } = useContext(PostsContext);
    const { User } = useContext(UserContext);

    return (
        <>
            <Container>
                <Header />
                <Content>
                    <h2>{}'s posts</h2>
                </Content>
                <Trending />
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
