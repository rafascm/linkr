import React from "react";
import styled from "styled-components";
import { colors } from "../styles/styles";

const TitleComponent = () => {
  return (
    <TitleContainer>
      <div>
        <h1>linkr</h1>
        <h2>
          save, share and discover <br />
          the best links on the web
        </h2>
      </div>
    </TitleContainer>
  );
};

export default TitleComponent;

const TitleContainer = styled.div`
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
