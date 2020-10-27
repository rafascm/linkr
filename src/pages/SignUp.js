import React, { useContext } from 'react';
import styled from 'styled-components';
import Title from '../components/Title';
import UserContext from '../contexts/UserContext';
import { FormsContainer } from '../styles/styles';
import { Link } from 'react-router-dom';
import Axios from 'axios';

const SignUp = () => {
    const { setUser } = useContext(UserContext);

    const signUpClickHandler = (e) => {
        e.preventDefault();

        Axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/sign_up')
            .then(({ data }) => setUser({ ...data }));
    }

    return (
        <Container>
            <Title />
            <FormsContainer>
                <input type='email' placeholder='e-mail' />
                <input type='password' placeholder='password' />
                <input type='text' placeholder='username' />
                <input type='url' placeholder='picture url' />
                <input type='submit' placeholder='Sign Up' onClick={(e) => signUpClickHandler(e)} />
                <Link to='/'>Switch back to log in</Link>
            </FormsContainer>
        </Container>
    );
}

export default SignUp;

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
`;
