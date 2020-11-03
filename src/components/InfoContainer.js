import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { colors } from '../styles/styles';
import ReactHashtag from "react-hashtag";
import { FaTrash } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import Axios from 'axios';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const InfoContainer = ({ id, User, user, userClickedHandler, text, setClickedMyLikes, setClickedUser, setClickedHashtag, updatePostsList, config }) => {
    const [clickedEditBtn, setClickedEditBtn] = useState(false);
    const [newText, setNewText] = useState(text);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const hashtagClickedHandler = (tag) => {
        setClickedMyLikes(false);
        setClickedUser({});
        setClickedHashtag("");
        setClickedHashtag(tag.substring(1));
        updatePostsList(config);

        history.push(`/hashtag/${tag.substring(1)}`);w
    };

    const toggleClickEditBtn = () => setClickedEditBtn(!clickedEditBtn);
    const inputRef = useRef(null);

    useEffect(() => {
        clickedEditBtn && inputRef.current.focus();
    }, [clickedEditBtn]);

    const handleKeyDown = event => event.key === "Escape" && toggleClickEditBtn();

    const submitClickHandler = (e) => {
        let edit = true;
        e.preventDefault();
        toggleClickEditBtn();
        Axios.put(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts/${id}`, { text: newText }, config)
        .catch(() => errorHandler(edit))
    }
    const errorHandler = (edit = undefined) => {
        edit ? alert("Não foi possível salvar as alterações") :
        alert('Não foi possível excluir o post');
        toggleClickEditBtn();
    }

    const submitPostDelete = () => {
        Axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts/${id}`, config)
        .then(processDelete)
        .catch(errorHandler)
    }

    const processDelete = () => {
        updatePostsList(config);
        setIsModalOpen(false);
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
                    <EditIcon onClick={() => toggleClickEditBtn()} />
                    <DeleteIcon onClick={() => setIsModalOpen(true)}/>
                </div>
            }
            <Modal
                isOpen={isModalOpen}
                onRequestClose={()=> setIsModalOpen(false)}
                style={modalCustomStyles}
            >
                <h2>Deseja excluir este post?</h2>
                <ModalBtnContainer>
                    <button onClick={() => submitPostDelete()}>Sim</button>
                    <button onClick={()=> setIsModalOpen(false)}>Não</button>
                </ModalBtnContainer>
            </Modal>
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

const ModalBtnContainer = styled.div`
    display: flex;
    margin-top: 1rem;
    justify-content: center;

    & > button {
        margin: .5rem;
        padding: .5rem 1rem;
        background-color: ${colors.button};
        color: ${colors.secondaryText};
        font-weight: bold;
        outline-style: none;
        border: none;
        border-radius: .5rem;
    }
`;


const modalCustomStyles = {
    content : {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: '2rem',
      borderRadius: '.5rem'
    }
  };

