import React, { useState, createContext } from "react";
import Axios from "axios";

const UserContext = createContext();

export default UserContext;

export const UserProvider = (props) => {
  const [User, setUser] = useState({});
  const [hashtagList, setHashtagList] = useState();

  const updateHashtagList = (config) => {
    Axios.get(
      "https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/hashtags/trending",
      config
    )
      .catch(() => alert("erro"))
      .then(({ data }) => setHashtagList([...data.hashtags]));
  };
  const [isLogged, setIsLogged] = useState(false);

  console.log(User)
  return (
    <UserContext.Provider
      value={{
        User,
        setUser,
        hashtagList,
        updateHashtagList,
        isLogged,
        setIsLogged,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
