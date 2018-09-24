import React from "react";
import ReactDOM from "react-dom";
import { injectGlobal } from "styled-components";

import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";

injectGlobal`
    html {
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        font-size: 16px;
    }

    *,
    *:before,
    *:after {
        -webkit-box-sizing: inherit;
        box-sizing: inherit;
    }

    body,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    ol,
    ul {
        margin: 0;
        padding: 0;
        font-weight: normal;
    }

    ol,
    ul {
        list-style: none;
    }

    img {
        max-width: 100%;
        height: auto;
    }
`;

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
