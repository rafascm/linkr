import React from 'react';
import styled from 'styled-components';
import { colors } from '../styles/styles';
import Header from '../components/Header';
import Publish from '../components/Publish';
import Trending from '../components/Trending';
import PostsList from '../components/PostsList';

const Timeline = () => {
    return (
        <>
            <Header />
            <Container>
                <h2>timeline</h2>
                <Content>
                    <Publish />
                    <PostsList />
                </Content>    
            </Container>
            <Trending />
        </>
    );
}

export default Timeline;

const Container = styled.div`
    max-width: 64rem;
    margin: 0 auto;
    height: 100%;
    padding: 6rem 2rem 2rem 2rem;
    
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
