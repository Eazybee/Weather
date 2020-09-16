import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
*, :after, :before {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  border: 0;
  text-decoration: none;
  list-style:none;
  color: #000000;
  outline-color: #e2ff8b;
  outline-width: 1rem;
}

body {
  font-family: Arial, sans-serif;
  font-size: 16px;
}

.LazyLoad{
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  display: block;
  overflow: hidden;
  img{
    opacity: 0;
  }
  img.loaded{
    animation: fadeInImg cubic-bezier(0.23, 1, 0.32, 1) 1;
    opacity: 0;
    animation-fill-mode: forwards;
    animation-duration: 0.7s;
    animation-delay: 0.1s;
  }
}
@keyframes fadeInImg {
  from { opacity: 0; }
  to { opacity: 1; }
}
`;

export default GlobalStyle;
