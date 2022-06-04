import { createGlobalStyle } from 'styled-components'

export default  createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
    }

    :root {
        --white: #fff;

        --bg-default: black;

        --gray-100: #e1e1e6;
        --gray-300: #a8a8b3;
        --gray-800: #29292e;
        --gray-850: #1f2729;
        --gray-900: #121214;

        --cyan-500: #61dafb;
        --yellow-500: #eba417;
    }

    @media (max-width: 1080px) {
        html {
            font-size: 93.75%;
        }
    }

    @media (max-width: 720px) {
        html {
            font-size: 87.5%;
        }
    }

    body {
        background: var(--bg-default);
        color: var(--white);
    }

    body, input, textarea, select, button {
        font: 400 1rem "Space-Grotesk", sans-serif;
        color: #29292e;
    }

    button {
        cursor: pointer;
    }

    a {
        color: inherit;
        text-decoration: none;
    }

    // Animations HandleMake by dev.jpedro@gmail.com
    @keyframes getItOpen {
        0% {
            transform: translateX(30px);
            opacity: 0;
        }
        100% {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes caramelo {
        0% {
            transform: translateX(0px);
        }
        80% {
            opacity: 0.8;
        }
        90% {
            opacity: 0.5;
        }
        100% {
            transform: translateX(1800px);
            opacity: 0;
        }
    }
`
