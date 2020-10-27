import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { FormsContainer } from '../styles/styles';
import TitleComponent from '../components/Title';
import Axios from 'axios';
import UserContext from '../contexts/UserContext';

const SignIn = () => {

    const history = useHistory();

    const { setUser } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const checkError = () => {
        if(email && password) return true;
        return false;
    }

    const signInClickHandler = (e) => {
        e.preventDefault();

        setIsLoading(true);

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

