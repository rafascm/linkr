import React, { useState, useContext } from "react";
import styled from "styled-components";
import Title from "../components/Title";
import UserContext from "../contexts/UserContext";
import { FormsContainer } from "../styles/styles";
import { Link, useHistory } from "react-router-dom";
import Axios from "axios";
import { motion } from "framer-motion";

const SignUp = () => {
  const { setUser, history } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");

  const [hasBeenClicked, setHasBeenClicked] = useState(false);

  const signUpClickHandler = (e) => {
    e.preventDefault();
    setHasBeenClicked(true);

    if (email && password && username && pictureUrl) {
      Axios.post(
        "https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/sign_up",
        { email, password, username, pictureUrl }
      )
        .catch(errorHandler)
        .then(({ data }) => processSignUp(data));
    } else {
      alert("Preencha todos os campos");
      setHasBeenClicked(false);
    }
  };

  const errorHandler = () => {
    alert("Usuário já cadasstrado");
    setHasBeenClicked(false);
  };

  const processSignUp = (data) => {
    setUser({ ...data });
    history.push("/timeline");
  };

  return (
    <Container>
      <Title />
      <AnimatedContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <FormsContainer onSubmit={(e) => signUpClickHandler(e)}>
          <input
            type="email"
            name="email"
            placeholder="e-mail"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="text"
            name="username"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="url"
            name="profile-pic"
            placeholder="picture url"
            onChange={(e) => setPictureUrl(e.target.value)}
          />
          <input
            type="submit"
            value="Sign Up"
            clicked={hasBeenClicked.toString()}
          />
          <Link to="/">Switch back to log in</Link>
        </FormsContainer>
      </AnimatedContainer>
    </Container>
  );
};

export default SignUp;

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;

    @media (max-width: 1024px) {
        & {
            width: 100%;
            display: block;
        }
    }
`;

const AnimatedContainer = styled(motion.div)`
    width: 34%;

    @media (max-width: 1024px) {
        & {
            width: 100%;
        }
    }
`;
