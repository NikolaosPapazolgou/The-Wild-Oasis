/* eslint-disable no-constant-condition */
import styled, { css } from "styled-components";

//If you want to implement JavaScript logic in an external variable
//Then you need to apply the css function in order to have
//1) AUTO-COMPLITION
//2) LOGIC INSIDE THE ``
// const test = css`
//   text-align: center;
//   ${10 > 5 ? "color: yellow" : "color: purple"};
// `;

const Heading = styled.h1`
  //REACIVING THE PROPS FROM THE PARENT REACT COMPONENT!!
  //Checking for the as prop value
  ${(props) =>
    props.as === "h1" &&
    css`
      /* Conditionally implementing styles with STYLED-COMPONENTS */
      font-size: 3rem;
      font-weight: 600;
    `}

  //Checking for the as prop value
    ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `}

  //Checking for the as prop value
  ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 1.5rem;
      font-weight: 500;
    `}
    line-height: 1.4;
`;

export default Heading;
