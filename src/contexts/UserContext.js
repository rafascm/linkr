import React, { useState, createContext } from 'react';

const UserContext = createContext();

export default UserContext;

export const UserProvider = (props) => {
    const [User, setUser] = useState({});
    
    return (
        <UserContext.Provider
            value={{
                User,
                setUser
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
}