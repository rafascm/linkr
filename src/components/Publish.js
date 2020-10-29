import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { colors } from '../styles/styles';
import UserContext from '../contexts/UserContext';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import PostsContext from '../contexts/PostsContext';
import { motion } from 'framer-motion';

const Publish = () => {
    const { User } = useContext(UserContext);
    const { updatePostsList } = useContext(PostsContext);
    const { token, user } = User;

    const [link, setLink] = useState('');
    const [text, setText] = useState('');

    const [hasBeenClicked, setHasBeenClicked] = useState(false);

    const [config] = useState({ headers: { 'user-token': token } });

    const history = useHistory();

    const publishClickHandler = (e) => {
        e.preventDefault();
        setHasBeenClicked(true);

        if (link) {
            Axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts',
                { link, text }, config)
                .catch(errorHandler)
                .then(processPublish)
        }
    }

    const errorHandler = () => {
        alert("Houve um erro ao publicar seu link");
        setHasBeenClicked(false);
    }

    const processPublish = () => {
        setLink('');
        setText('');
        setHasBeenClicked(false);
        updatePostsList(config);
        history.push('/timeline');
    }

    return (
        <AnimatedContainer
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
        <Container>
            <img src={user.avatar} />
            <InputContainer onSubmit={(e) => publishClickHandler(e)}>
                <h3>O que você tem favoritar hoje?</h3>
                <input
                    type='url'
                    name='url'
                    value={link}
                    placeholder="http:// ..."
                    onChange={(e) => setLink(e.target.value)}
                    disabled={hasBeenClicked}
                    required
                />
                <textarea
                    type='text'
                    name='description'
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    disabled={hasBeenClicked}
                />
                <input
                    type='submit'
                    value={hasBeenClicked ? 'Publishing...' : 'Publish'}
                    disabled={hasBeenClicked}
                />
            </InputContainer>
        </Container>
        </AnimatedContainer>
    );
}

export default Publish;

const AnimatedContainer = styled(motion.div)`
    width: 100%
`;

const Container = styled.div`
    background-color: ${colors.secondaryText};
    width: 100%;
    padding: 1rem;
    border-radius: 1rem;
    display: flex;
    justify-content: space-between;

    img {
        border-radius: 50%;
        width: 4rem;
        height: 4rem;
        margin-right: 1rem;
    }

    @media (max-width: 1024px) {
        & > img {
            display: none;
        }
    }
`;

const InputContainer = styled.form`
    padding-top: 1rem;
    width: 100%;
    display: block;
    position: relative;

    h3 {
        width: 100%;
        color: ${colors.mainText};
        font-size: 1.3rem;
        margin-bottom: .5rem;
    }

    

    input, textarea {
        background-color: ${colors.bgInput};
        width: 100%;
        padding: .5rem 1rem;
        margin-top: .5rem;
        border-radius: .5rem;
        outline-style: none;
        border: none;
        pointer-events: ${({ disabled }) => disabled ? 'none' : 'auto'};
        
        &[type=submit] {
            max-width: 9rem;
            position: absolute;
            right: 0;
            bottom: 0;
            background-color: ${colors.button};
            color: white;
        }
    }

    textarea {
        resize:none;
        height: 4rem;
        margin-bottom: 2.5rem;
        font-weight: 'Lato', sans-serif;
    }
`;