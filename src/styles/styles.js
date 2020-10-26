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

`;

export default GlobalStyle;