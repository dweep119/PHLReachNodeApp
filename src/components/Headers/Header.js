import React from "react";
import styled from "styled-components";

const ImageFlex = styled.div`
  & {
    flex: 1;
    background: #fff;
    display: flex;
    align-items: center;
  }
`;

const Header = () => {
  return (
    <ImageFlex>
      <img className="logo-home" src="https://anima-uploads.s3.amazonaws.com/projects/60d0ce8207f6c272e04c5a8d/img/logo---home@2x.png" alt="img"/>
    </ImageFlex>
  );
};

Header.propTypes = {};

export default Header;
