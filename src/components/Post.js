import React from 'react';
import styled from 'styled-components';
import { colors } from '../styles/styles';
import { IoIosHeartEmpty } from "react-icons/io";

const Post = ({ post }) => {
    const {
        user,
        text,
        likes,
        link,
        linkTitle,
        linkDescription,
        linkImage
    } = post;

    console.log(user);
    
    return (
        <Container>
            <ImageContainer>
                <img src={user.avatar} />
                <HeartIcon />
                <p>{likes.length} likes</p>
            </ImageContainer>
            <div>
                <InfoContainer>
                    <h2>{user.username}</h2>
                    <h3>{text}</h3>
                </InfoContainer>
                <PreviewContainer>
                    <div>
                        <h1>{linkTitle}</h1>
                        <p>{linkDescription}</p>
                        <p>{link}</p>
                    </div>
                    <img src={linkImage} />
                </PreviewContainer>
            </div>
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
`;

const HeartIcon = styled(IoIosHeartEmpty)`
    color: ${colors.secondaryText};
    font-size: 2rem;
`;

const InfoContainer = styled.div`
    width: 100%;

    & > h2 {
        font-family: 'Lato', sans-serif;
        color: ${colors.secondaryText};
        font-size: 1.2rem;
    }

    & > h3 {
        font-size: 1rem;
        color: ${colors.mainText};
    }
`;

const PreviewContainer = styled.div`
    display: flex;
    border-radius: 1rem;
    border: .05rem solid ${colors.mainText};
    
    & > img {
        width: 10rem;
        height: 10rem;
    }

    h1 {
        font-family: 'Lato', sans-serif;
        font-size: 1rem;
    }
`;
/*
id: 12
likes: []
link: "https://youtu.be/5qap5aO4i9A"
linkDescription: "Thank you for listening, I hope you will have a good time here :) 🎼 Listen to the playlist on Spotify, Apple music and more → https://bit.ly/chilledcow-playl..."
linkImage: "https://i.ytimg.com/vi/5qap5aO4i9A/maxresdefault_live.jpg"
linkTitle: "lofi hip hop radio - beats to relax/study to"
text: "#lofi"
user:
    avatar: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlgA"
    id: 6
    username: "rafasm"*/