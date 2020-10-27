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

    return (
        <Container>
            <ImageContainer>
                <img src={user.avatar} />
                <HeartIcon />
                <p>{likes.length} likes</p>
            </ImageContainer>
            <TextContainer>
                <InfoContainer>
                    <h2>{user.username}</h2>
                    <h3>{text}</h3>
                </InfoContainer>
                <PreviewContainer>
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
`;

const HeartIcon = styled(IoIosHeartEmpty)`
    color: ${colors.secondaryText};
    font-size: 2rem;
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
`;

const PreviewContainer = styled.div`
    width: 100%;
    display: flex;
    border-radius: 1rem;
    border: .05rem solid ${colors.mainText};
    justify-content: space-between;
    margin-bottom: 1rem;
    
    & > img {
        width: 15rem;
        height: 15rem;
        border-top-right-radius: 1rem;
        border-bottom-right-radius: 1rem;
    }

    & > div {
        padding: 1rem;

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
`;