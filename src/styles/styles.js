import { createGlobalStyle } from 'styled-components';

export const colors = {
    bgMain: '#333333',
    bgHeader: '#151515',
    bgContainer: '#171717',
    bgInput: '#EFEFEF',
    button: '#1877F2',
    mainText: '#707070',
    secondaryText: '#fff',

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