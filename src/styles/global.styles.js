import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
  text-decoration: none;
  list-style: none;
}
html {
  font-size: 62.5%;
}
body {
  box-sizing: border-box;
  font-family: 'Varela Round', serif
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
}
h1,h2,h3, div {
  color: whitesmoke;
  font-family: "verdana";
}
a, button {
  cursor: pointer;
}  
`;

export default GlobalStyle;
