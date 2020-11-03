import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { colors } from '../styles/styles';
import ReactHashtag from "react-hashtag";
import { FaTrash } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import Axios from 'axios';

const InfoContainer = ({ id, User, user, userClickedHandler, text, setClickedMyLikes, setClickedUser, setClickedHashtag, updatePostsList, config }) => {
    const [clickedEditBtn, setClickedEditBtn] = useState(false);
    const [newText, setNewText] = useState(text);

    const hashtagClickedHandler = (tag) => {
        setClickedMyLikes(false);
        setClickedUser({});
        setClickedHashtag("");
        setClickedHashtag(tag.substring(1));
        updatePostsList(config);

        history.push(`/hashtag/${tag.substring(1)}`);
    };

    const toggleClickEditBtn = () => setClickedEditBtn(!clickedEditBtn);
    const inputRef = useRef(null);

    useEffect(() => {
        clickedEditBtn && inputRef.current.focus();
    }, [clickedEditBtn]);

    const handleKeyDown = event => event.key === "Escape" && toggleClickEditBtn();

    const submitClickHandler = (e) => {
        e.preventDefault();
        toggleClickEditBtn();
        Axios.put(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts/${id}`, { text: newText }, config)
        .catch(errorHandler)
    }
    const errorHandler = () => {
        alert("Não foi possível salvar as alterações");
        toggleClickEditBtn();
    }
    return (
        <Container>
            <div>
                <h2 onClick={() => userClickedHandler(user)}>{user.username}</h2>
                {
                    clickedEditBtn ?
                        <form onSubmit={e => submitClickHandler(e)}>
                            <input
                                type='text'
                                ref={inputRef}
                                defaultValue={text}
                                onKeyDown={(e) => handleKeyDown(e)}
                                onChange={(e)=> setNewText(e.target.value)}
                            />
                            <input
                                type='submit'
                                value={'Salvar'}    
                            />
                        </form> :
                        <h3>
                            <ReactHashtag renderHashtag={(val) => (<Hashtag key={val} onClick={() => hashtagClickedHandler(val)}>{val}</Hashtag>)}>
                                {newText}
                            </ReactHashtag>
                        </h3>
                }
            </div>
            {
                (User.user.id === user.id) &&
                <div>
                    <EditIcon onClick={toggleClickEditBtn} />
                    <DeleteIcon />
                </div>
            }
        </Container>
    );
}

export default InfoContainer;

const Container = styled.div`
  width: 100%;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;

  & > div {
    & > h2 {
      font-family: "Lato", sans-serif;
      color: ${colors.secondaryText};
      font-size: 1rem;
    }

    & > h3 {
        font-size: .9rem;
        color: ${colors.mainText};
    }
  }
    @media (max-width: 1024px) {
        
    }
`;

const Hashtag = styled.span`
  cursor: pointer;
  color: ${colors.secondaryText};
  font-weight: bold;
`;

const EditIcon = styled(FaPen)`
  color: ${colors.secondaryText};
  font-size: .9rem;
  margin-right: .25rem;
`;

const DeleteIcon = styled(FaTrash)`
  color: ${colors.secondaryText};
  font-size: .9rem;
`;