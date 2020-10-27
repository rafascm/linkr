import React, {useContext, useState} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { colors } from '../styles/styles';
import UserContext from '../contexts/UserContext'

const Header = () => {

    const { User } = useContext(UserContext);
    const { user } = User;

    const [hasClicked,setHasClicked] = useState(false)

    const dropMenu = () =>{
        setHasClicked(!hasClicked)
    }
    

    return(
        <HeaderContainer>
            <h1>linkr</h1>
            <div>                
                <span onClick={() => dropMenu()}>
                    {hasClicked ? <UpIcon /> : (<DropDownIcon />)}
                </span>
                <img src={user.avatar} onClick={() => dropMenu()} />
                <DropDownMenu clicked={hasClicked.toString()}>
                    <Link to="/my-posts"><p>My posts</p></Link>
                    <Link to="/my-likes"><p>My likes</p></Link>
                    <Link to="/"><p>Logout</p></Link>
                </DropDownMenu>
            </div>
        </HeaderContainer>
    );
}

export default Header;

const HeaderContainer = styled.div`
    position: fixed;
    top:0;
    left:0;
    width: 100%;
    height: 4rem;
    display: flex;
    padding: 0 1rem;
    justify-content: space-between;  
    align-items: center;
    background-color: ${colors.bgHeader};
    z-index: 999;

    h1 {
        font-size: 2.75rem;
        color: ${colors.secondaryText};
    }

    & > div {
        display: flex;
        align-items: center;
    }

    img {
        cursor: pointer;
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

const UpIcon = styled(FaChevronUp)`
    font-size: 1.5rem;
    color: ${colors.secondaryText};
    cursor: pointer;
`;

const DropDownMenu = styled.div`
    z-index:-999;
    position: absolute;
    top: ${({clicked}) => clicked === "true" ? "4rem" : "-7rem"};
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content:center;
    text-align: center;
    height: 7rem;
    width: 8rem;
    background-color: ${colors.bgHeader};
    border-radius: 0 0 0 2rem;
    transition: all 0.3s ease-out;

    p {
        cursor: pointer;
        margin: 0.3rem;
        color: ${({clicked}) => clicked === "true" ? colors.secondaryText : colors.bgHeader};
    }
`;
