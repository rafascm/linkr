import React from 'react';
import SignUp from './SignUp';
import { FormsContainer } from '../styles/styles'

const SignIn = () => {
    return (
        <>
            <FormsContainer>
                <input type='email' placeholder='e-mail'/>
                <input type='password' placeholder='password'/>
                <input type='text' placeholder='username'/>
                <input type='url' placeholder='picture url'/>
                <input type='submit' placeholder='Sign Up'/>
                <Link to='/'>Switch Back to log in</Link> 
            </FormsContainer>
            <SignUp />
        </>
    );
}

export default SignIn;