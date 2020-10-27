import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { FormsContainer } from '../styles/styles';
import TitleComponent from '../components/TitleComponent';
import Axios from 'axios';
import UserContext from '../contexts/UserContext';

const SignIn = () => {

    const history = useHistory();
    const { user, setUser } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const checkError = () => {
        if(email.length === 0) return false;
        if(password.length === 0) return false;

        return true;
    }

    const signInClickHandler = (e) => {
        e.preventDefault();

        if(checkError()){
        Axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/sign_in',{ 'email': email  , 'password': password })
            .then(({ data }) => {
                setEmail('')
                setPassword('')
                setUser({ ...data })
                history.push("/timeline")
            })
            .catch(() => alert("Usuário/Senha inválidos!"));
        } else{
            alert("Preencha todos os campos!")
        }

        console.log(user)
    }

    

    return (
        <Container>
            <TitleComponent />
            <FormsContainer onSubmit={signInClickHandler}>

                <input type='email' placeholder='e-mail' 
                onChange={e => setEmail(e.target.value)} 
                value={email}/>

                <input type='password' placeholder='password' 
                onChange={e => setPassword(e.target.value)} 
                value={password}/>

                <input type='submit' placeholder='Sign In'/>

                <Link to='/signUp'>Click Here To Sign Up</Link> 

            </FormsContainer>                          
        </Container>
    );
}

export default SignIn;

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
`;

