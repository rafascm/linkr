import React, {useContext, useEffect, useState} from 'react';
import ReactHashtag from "react-hashtag";
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../styles/styles';
import UserContext from '../contexts/UserContext';

const Trending = () => {
    
    const history = useHistory();

    const { User, updateHashtagList, hashtagList } = useContext(UserContext);
    const { token } = User;
    const [config] = useState({ headers: { 'user-token': token } });

    useEffect(() => updateHashtagList(config), []);

    const HashtagHandler = (tag) =>{
        history.push(`/${tag.substring(1)}`);
    }     

    console.log(hashtagList)

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
    left: calc(50vw + 13rem);
    display: flex;
    flex-direction: column;    
    width: 20vw;       
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

       
    }
`;
 const Hashtag = styled.li`
    z-index: 2;
    cursor:pointer;
    color: ${colors.secondaryText};
    padding-left: 1.5rem;
    margin-bottom: 0.5rem;
 `;