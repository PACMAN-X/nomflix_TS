import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const globalStyles = createGlobalStyle`
    ${reset}
    a {
        text-decoration: none;
        color: inherit;
    }
    *{
        box-sizing: border-box;
    }
    body{
        font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size:12px;
        background-color:rgba(20, 20, 20, 1);
        color:white;
        padding-top:50px;
    }
    .tab-list {
        border-bottom: 1px solid #ccc;
        margin-bottom: 10px;
        padding-left: 0;
      }
      
      .tab-list-item {
        display: inline-block;
        list-style: none;
        margin-bottom: -1px;
        padding: 0.5rem 0.75rem;
      }
      
      .tab-list-active {
        background-color: black;
        border: solid #ccc;
        border-width: 1px 1px 0 1px;
      }
`;

export default globalStyles;
