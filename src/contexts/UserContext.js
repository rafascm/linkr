import React, { useState, createContext } from 'react';

const UserContext = createContext();

export default UserContext;

export const UserProvider = (props) => {
    const [User, setUser] = useState({});
    const [isLogged, setIsLogged] = useState(false);
    
    return (
        <UserContext.Provider
            value={{
                User,
                setUser,
                isLogged,
                setIsLogged
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
}