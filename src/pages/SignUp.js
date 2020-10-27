import React from 'react';
import { FormsContainer } from '../styles/styles';
import { Link } from 'react-router-dom';
import TitleComponent from '../components/TitleComponent';
import styled from 'styled-components';


const SignUp = () => {
    return (
        <Container>  
            <TitleComponent />
            <FormsContainer>
                <input type='email' placeholder='e-mail'/>
                <input type='password' placeholder='password'/>
                <input type='text' placeholder='username'/>
                <input type='url' placeholder='picture url'/>
                <input type='submit' placeholder='Sign Up'/>
                <Link to='/'>Switch Back to log in</Link> 
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