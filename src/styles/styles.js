import styled, { createGlobalStyle } from 'styled-components';

export const colors = {
    bgMain: '#333333',
    bgHeader: '#151515',
    bgContainer: '#171717',
    bgInput: '#EFEFEF',
    button: '#1877F2',
    mainText: '#707070',
    secondaryText: '#fff',
    placeholderText: '#9F9F9F'

}

const GlobalStyle = createGlobalStyle`

    *, *::before, *::after {
        box-sizing: border-box;
    }

    body {
        font-family: 'Lato', sans-serif;
        background-color: ${colors.bgMain}
    }

    h1 {
        font-family: 'Passion One', sans-serif;
        font-size: 3rem;
    }
    h2 {
        font-family: 'Oswald', sans-serif;
        font-size: 2rem;
    }
`;

export default GlobalStyle;

export const FormsContainer = styled.form`
    width: 34%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    & > * + * {
        margin-top: 1rem;
    }

    a {
        color: ${colors.secondaryText};
    }

    input {
        width: 90%;
        height: 3rem;
        padding: 0 1rem;
        border-radius: .5rem;
        outline-style: none;
        border: none;
        
        &[type=submit] {
            background-color: ${colors.button};
            color: white;
            font-family: 'Oswald', sans-serif;
            font-size: 1.3rem;
            pointer-events: ${({ clicked }) => clicked ? 'none' : 'auto'};
        }

        &::placeholder {
            font-family: 'Oswald', sans-serif;
            font-size: 1.3rem;
        }
    }
`;

export const TitleContainer = styled.div`
    width: 66%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${colors.bgHeader};

    & > div {
        width: 60%;
    }

    h1 {
        font-size: 8rem;
        color: ${colors.secondaryText};
    }
    h2 {
        font-size: 3rem;
        color: ${colors.secondaryText};
    }
`;