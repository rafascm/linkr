import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../styles/styles';
import { IoIosHeartEmpty } from "react-icons/io";
import ReactHashtag from "react-hashtag";
import PostsContext from '../contexts/PostsContext';
import UserContext from '../contexts/UserContext';

const Post = ({ post }) => {

    const history = useHistory();
    const { setClickedUser, setClickedHashtag, updatePostsList } = useContext(PostsContext);

    const { User } = useContext(UserContext);
    const { token } = User;
    const [config] = useState({ headers: { 'user-token': token } });

    const {
        user,
        text,
        likes,
        link,
        linkTitle,
        linkDescription,
        linkImage
    } = post;

    const hashtagClickedHandler = (tag) => {
        setClickedUser({});
        setClickedHashtag('');
        setClickedHashtag(tag.substring(1));
        updatePostsList(config);

        history.push(`/hashtag/${tag.substring(1)}`);
    }

    const userClickedHandler = (user) => {
        setClickedHashtag('');
        setClickedUser({});
        setClickedUser(user);
        updatePostsList(config);

        history.push(`/user/${user.id}`)
    }

    return (
        <Container>
            <ImageContainer>
                <img src={user.avatar} onClick={()=> userClickedHandler(user)}/>
                <HeartIcon />
                <p>{likes.length} likes</p>
            </ImageContainer>
            <TextContainer>
                <InfoContainer>
                    <h2 onClick={()=> userClickedHandler(user)}>{user.username}</h2>
                    <h3>
                        <ReactHashtag
                            renderHashtag={(val) => (
                                <Hashtag
                                    key={val}
                                    onClick={() => (hashtagClickedHandler(val))}
                                >
                                    {val}
                                </Hashtag>)}>
                            {text}
                        </ReactHashtag>
                    </h3>
                </InfoContainer>
                <PreviewContainer href={link} target="_blank">
                    <div>
                        <h1>{linkTitle}</h1>
                        <p>{linkDescription}</p>
                        <h6>{link}</h6>
                    </div>
                    <img src={linkImage} />
                </PreviewContainer>
            </TextContainer>
        </Container>
    );
}

export default Post;

const Container = styled.div`
    width: 100%;
    background-color: ${colors.bgContainer};
    padding: 1rem;
    border-radius: 1rem;
    display: flex;
    justify-content: space-between;
    

    &:last-child {
        margin-bottom: 3rem;
    }

`;
const ImageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 1rem;

    & > * + * {
        margin-top: .5rem;
    }

    img {
        border-radius: 50%;
        width: 4rem;
        height: 4rem;
    }
    
    p {
        color: ${colors.secondaryText};
    }

    @media (max-width: 1024px) {
        img {
            width: 2rem;
            height: 2rem;
        }
    }
`;

const HeartIcon = styled(IoIosHeartEmpty)`
    color: ${colors.secondaryText};
    font-size: 2rem;

    @media (max-width: 1024px) {
        & {
            font-size: .9rem;
        }
    }
`;

const TextContainer = styled.div`
    width: 100%;
`;

const InfoContainer = styled.div`
    width: 100%;
    margin-bottom: 1rem;

    & > h2 {
        margin: 1rem 0;
        font-family: 'Lato', sans-serif;
        color: ${colors.secondaryText};
        font-size: 1.2rem;
    }

    & > h3 {
        font-size: 1rem;
        color: ${colors.mainText};
    }

    @media (max-width: 1024px) {
        & > h2 {
            margin: .5rem 0;
            font-size: 1rem;
        }
        & > h3 {
            font-size: 1rem;
        }
    }
`;

const PreviewContainer = styled.a`
    width: 100%;
    display: flex;
    border-radius: 1rem;
    border: .05rem solid ${colors.mainText};
    justify-content: space-between;
    margin-bottom: 1rem;
    text-decoration: none;
    
    & > img {
        width: 15rem;
        height: 15rem;
        border-top-right-radius: 1rem;
        border-bottom-right-radius: 1rem;
    }

    & > div {
        padding: 1rem;

        word-break: break-word;

        & > * + * {
            margin-top: 1rem;
        }
        
        & > h1 {
            font-family: 'Lato', sans-serif;
            font-size: 1.2rem;
            color: ${colors.mainText};
            overflow-wrap: break-word;
        }

        & > p {
            font-size: .9rem;
            color: ${colors.mainText};
            overflow-wrap: break-word;
        }

        & > h6 {
            font-size: .7rem;
            color: ${colors.mainText};
            text-overflow: ellipsis;
        }

    }

    @media (max-width: 1024px) {
        & {
           
        }

        & > img {
            display:none;
        }

        p {
            overflow: hidden;
            text-overflow: ellipsis;
            max-height: 2rem
        }
    }
`;

const Hashtag = styled.span`
   color: ${colors.secondaryText};
   font-weight: bold;
`;