import React, {useContext, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../styles/styles';
import UserContext from '../contexts/UserContext';

const Trending = () => {

    const { User, updateHashtagList, hashtagList } = useContext(UserContext);
    const { token } = User;
    const [config] = useState({ headers: { 'user-token': token } });

    useEffect(() => updateHashtagList(config), []);

    console.log(hashtagList)

    return (
        <Container>

            <div><h2>trending</h2></div>

            <section>
                {hashtagList && hashtagList.map(hashtag => 
                <Link key={hashtag.id} to={`/${hashtag.name}`}>
                    <p>#{hashtag.name}</p>
                </Link> )}
            </section>

        </Container>
    );
}

export default Trending;

const Container = styled.aside`
    position: fixed;
    top: 11.5rem;
    right: calc(12.5vw);
    display: flex;
    flex-direction: column;    
    width: 25vw;       
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

        p{
            cursor:pointer;
            color: ${colors.secondaryText};
            padding-left: 1.5rem;
            margin-bottom: 0.5rem;
        }
    }
`;