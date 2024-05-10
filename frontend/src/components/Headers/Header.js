import React from "react";
import styled from "styled-components";
import ReactLogo from '../../assets/img/PHL-Logo.svg';

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
      <img className="logo-home" src={ReactLogo} alt="img"/>
    </ImageFlex>
  );
};

Header.propTypes = {};

export default Header;
