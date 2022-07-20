import css from "styled-jsx/css"
import { breakpoints, fonts, colors } from "../../styles/theme"

export const globalStyles = css.global`
  html,
  body {
    background-color: #ffffff;
    padding: 0;
    margin: 0;
    font-family: ${fonts.base};
  }
  h1 {
    font-size: 20px;
    color: #111;
  }
`

export default css`
  div {
    display: grid;
    height: 100vh;
    place-items: center;
  }
  main {
    background: #fff;
    overflow-y: auto;
    overflow-x: hidden;
    border-radius: 5px;
    box-shadow: 50px 50px 100px #ccc, -50px -50px 100px #ffffff;
    height: 100%;
    width: 100%;
  }

  @media (min-width: ${breakpoints.mobile}) {
    body {
      background-image: radial-gradient(${colors.primary} 1px, transparent 1px);
      background-size: 32px 32px;
      background-color: #ffffff;
    }
    main {
      height: 95vh;
      width: ${breakpoints.mobile};
    }
    main::-webkit-scrollbar {
      width: 8px;
    }

    main::-webkit-scrollbar-track {
      background: #fff;
    }

    main::-webkit-scrollbar-thumb {
      background-color: #eee;
      border-radius: 20px;
      transition: all 2s;
    }

    main::-webkit-scrollbar-thumb:hover {
      background-color: #ccc;
    }
  }
`
