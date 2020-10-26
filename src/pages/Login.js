import React from 'react';
import styled from 'styled-components';
import { colors } from '../styles/styles';
import SignIn from '../components/SingIn';

const LoginPage = () => {
    return (
        <Container>
            <TitleContainer>
                <h1>olar</h1>
            </TitleContainer>
            <SignIn />
        </Container>
    );
}

export default LoginPage;

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;    
`;

const TitleContainer = styled.div`
    width: 66%;
    height: 100%;
    background-color: ${colors.bgHeader};
`;