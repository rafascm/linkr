import React from 'react';
import styled from 'styled-components';
import { FormsContainer } from '../styles/styles';
import { Link } from 'react-router-dom';

const SignUp = () => {
    return (
        <FormsContainer>
            <input type='email' placeholder='e-mail'/>
            <input type='password' placeholder='password'/>
            <input type='text' placeholder='username'/>
            <input type='url' placeholder='picture url'/>
            <input type='submit' placeholder='Sign Up'/>
            <Link to='/'>Switch Back to log in</Link> 
        </FormsContainer>
    );
}

export default SignUp;
