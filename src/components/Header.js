import React, {useContext} from 'react';
import styled from 'styled-components';
import { FaChevronDown } from 'react-icons/fa';
import { colors } from '../styles/styles';
import UserContext from '../contexts/UserContext'

const Header = () => {

    const { User } = useContext(UserContext);

    const { token, user } = User;

    console.log(user);

    return(
        <HeaderContainer>
            <h1>linkr</h1>
            <div>
                <DropDownIcon />
                <img src={user.avatar}/>
            </div>
        </HeaderContainer>
    );
}

export default Header;

const HeaderContainer = styled.div`
    width: 100%;
    height: 4rem;
    display: flex;
    padding: 0 1rem;
    justify-content: space-between;  
    align-items: center;
    background-color: ${colors.bgHeader};

    h1 {
        font-size: 2.75rem;
        color: ${colors.secondaryText};
    }

    & > div {
        display: flex;
        align-items: center;
    }

    img {
        height: 2.75rem;
        width: auto;
        border-radius: 50%;
        margin-left: 1rem;
    }
`;

const DropDownIcon = styled(FaChevronDown)`
    font-size: 1.5rem;
    color: ${colors.secondaryText};
    cursor: pointer;
`;