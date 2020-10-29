import React, { useContext, useEffect, useState } from 'react';
import ReactHashtag from "react-hashtag";
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../styles/styles';
import UserContext from '../contexts/UserContext';
import PostsContext from '../contexts/PostsContext';

const Trending = () => {

    const history = useHistory();

    const { User, updateHashtagList, hashtagList } = useContext(UserContext);
    const { token } = User;
    const [config] = useState({ headers: { 'user-token': token } });
    
    const { setClickedHashtag, setClickedUser, updatePostsList } = useContext(PostsContext);
    
    useEffect(() => updateHashtagList(config), []);

    const HashtagHandler = (tag) => {
        setClickedHashtag(tag.substring(1));
        updatePostsList(config);

        history.push(`/hashtag/${tag.substring(1)}`);
    }

    return (
        <Container>
            <div><h2>trending</h2></div>
            <section>
                {hashtagList && hashtagList.map(hashtag =>
                    <Hashtag key={hashtag.id}>
                        <ReactHashtag onHashtagClick={val => HashtagHandler(val)}>
                            {`#${hashtag.name}`}
                        </ReactHashtag>
                    </Hashtag>
                )}
            </section>
        </Container>
    );
}

export default Trending;

const Container = styled.aside`
    position: fixed;
    top: 11.5rem;
    left: calc(50vw + 15rem);
    display: flex;
    flex-direction: column;    
    width: 16.7rem;       
    height: auto;
    border-radius: 1rem;
    background-color: ${colors.bgMain};

    & > div{
        width: 100%;
        height: 4rem;
        display:flex;
        align-items: center;
        padding-left: 1.5rem;       
        background-color: ${colors.bgHeader};
        border-bottom: 0.2rem solid  ${colors.bgMain};
        border-radius: 1rem 1rem 0 0;

        h2{
            color: ${colors.secondaryText};
        }
    }

    & > section{
        width: 100%;
        min-height: 10rem;        
        background-color: ${colors.bgHeader};
        border-radius: 0 0 1rem 1rem;
        padding: 1rem 0 1rem 0;

        & > a {
            text-decoration: none;
        }

        p {
            cursor:pointer;
            color: ${colors.secondaryText};
            padding-left: 1.5rem;
            margin-bottom: 0.5rem;
        }
    }

    @media (max-width: 1024px) {
        display: none;
    }
`;

const Hashtag = styled.li`
    z-index: 2;
    cursor:pointer;
    color: ${colors.secondaryText};
    padding-left: 1.5rem;
    margin-bottom: 0.5rem;

 `;