import React, { useState, createContext } from 'react';

const UserContext = createContext();

export default UserContext;

export const UserProvider = (props) => {
    const [user, setUser] = useState({});
    
    return (
        <UserContext.Provider
            value={{
                user,
                setUser
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
}