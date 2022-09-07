import React from "react";
import styled from "styled-components";
import dWiseTube from "../img/logo.png";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";

const Container = styled.div`
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  position: fixed;
  height: 90px;
  top: 0;
  right: 0;
  left: 0;
  z-index: 20;
`;

const Wrapper = styled.div`
  padding: 18px 40px;
  display: flex;
  color: inherit;
  align-items: center;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  color: inherit;
  font-size: 25px;
  cursor: pointer;
`;

const Img = styled.img`
  height: 35px;
`;

const iconStyle = {
  color: "inherit",
  fontSize: 40,

  cursor: "pointer",
};
const buttonIconStyle = {
  color: "inherit",
  fontSize: 35,
  cursor: "pointer",
};

const Hr = styled.hr`
  margin: 5px 0;

  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const LeftSection = styled.div`
  display: flex;
  flex: 1;
  margin-left: -15px;
`;

const HamburgContainer = styled.div`
  display: flex;
  align-items: center;
  color: inherit;
  justify-content: center;
  margin-right: 37px;
  width: 60px;
  height: 60px;
  cursor: pointer;
  border-radius: 50%;

  &:active {
    background-color: ${({ theme }) => theme.bgSearchButton};
  }
`;
const MiddleSection = styled.div`
  display: flex;
  flex 2.6;
  color: inherit;
 
  justify-content: center;
`;
const RightSection = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
`;

const Input = styled.input`
  width: 300px;
  height: 30px;
  padding: 10px 8px;
  outline: none;
  font-size: 20px;
  color: ${({ theme }) => theme.bgPlaceHolderColor};
  border: 1px solid ${({ theme }) => theme.soft};
  background-color: ${({ theme }) => theme.bgPlaceHolder};
  &::placeholder {
    background-color: ${({ theme }) => theme.bgPlaceHolder};
  }
`;
const SearchButton = styled.button`
  display: flex;
  color: inherit;
  align-items: center;
  justify-content: center;
  width: 80px;
  cursor: pointer;
  margin-right: 15px;
  background-color: ${({ theme }) => theme.bgSearchButton};
  border: none;
`;
const VoiceSearchButton = styled.button`
  display: flex;
  align-items: center;
  color: inherit;
  cursor: pointer;
  justify-content: center;
  width: 60px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.bgPlaceHolder};
  border: 1px solid ${({ theme }) => theme.soft};
`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;
const Header = ({ setModal, modal }) => {
  return (
    <Container>
      <Wrapper>
        <LeftSection>
          <HamburgContainer>
            <MenuIcon style={iconStyle} onClick={() => setModal(!modal)} />
          </HamburgContainer>
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "inherit",

              marginTop: "12px",
            }}
          >
            <Logo>
              <Img src={dWiseTube} />
              dWiseTube
            </Logo>
          </Link>
        </LeftSection>
        <MiddleSection>
          <Input placeholder="Search" />
          <SearchButton>
            <SearchIcon style={buttonIconStyle} />
          </SearchButton>
          <VoiceSearchButton>
            <KeyboardVoiceIcon style={buttonIconStyle} />
          </VoiceSearchButton>
        </MiddleSection>
        <RightSection>
          <Link
            to="login"
            style={{
              textDecoration: "none",
              color: "inherit",

              marginTop: "12px",
            }}
          >
            <Button>
              <AccountCircleOutlinedIcon />
              SIGN IN
            </Button>
          </Link>
        </RightSection>
      </Wrapper>
    </Container>
  );
};

export default Header;
