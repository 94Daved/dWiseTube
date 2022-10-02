import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import SportsBasketballOutlinedIcon from "@mui/icons-material/SportsBasketballOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import { useSelector } from "react-redux";

const Container = styled.div`
  background-color: ${({ theme }) => theme.bg};
  top: 76px;
  /* background: rgba(0, 0, 0, 0.4); */
  position: fixed;
  color: ${({ theme }) => theme.text};
  /* min-height: 100vh; */
  width: 320px;
  z-index: 15;

  transform: translateX(${(props) => props.transition}%);
  transition: transform 0.5s ease-in-out;

  box-shadow: 4px 4px 8px -3px rgba(0, 0, 0, 0.83);
  -webkit-box-shadow: 4px 4px 8px -3px rgba(0, 0, 0, 0.83);
  -moz-box-shadow: 4px 4px 8px -3px rgba(0, 0, 0, 0.83);
`;
const Wrapper = styled.div`
  padding: 23px 26px;
  margin-top: 8px;
  overflow-x: hidden;
  overflow-y: auto;
  height: calc(100vh - 120px);
`;

const Login = styled.div`
  margin-left: 15px;
`;

const Item = styled.div`
  margin-left: 15px;
  display: flex;
  margin-left: 15px;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 7.5px 0px;
  width: 100%;

  &:hover {
    background-color: ${({ theme }) => theme.bgHover};
  }
`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  margin-left: 15px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Title = styled.h2`
  font-size: 14px;
  font-weight: 500;
  color: #aaaaaa;
  margin-bottom: 20px;
  margin-left: 15px;
`;

const iconStyle = {
  fontSize: 40,
  color: "inherit",
};

const Menu = ({ modal, darkMode, setDarkMode }) => {
  const { currentUser } = useSelector((state) => state.slices.user);

  return (
    <Container transition={modal ? 0 : -105}>
      <Wrapper>
        <Item>
          <HomeIcon style={iconStyle} />
          Home
        </Item>
        <Link to="trends" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            <ExploreOutlinedIcon style={iconStyle} />
            Explore
          </Item>
        </Link>
        <Link
          to="subscriptions"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>
            <SubscriptionsOutlinedIcon style={iconStyle} />
            Subscriptions
          </Item>
        </Link>
        <Hr />
        <Item>
          <VideoLibraryOutlinedIcon style={iconStyle} />
          Library
        </Item>
        <Item>
          <HistoryOutlinedIcon style={iconStyle} />
          History
        </Item>
        <Hr />

        {!currentUser && (
          <>
            <Login>
              Sign in to like videos, comment, and subscribe.
              <Link to="login" style={{ textDecoration: "none" }}>
                <Button>
                  <AccountCircleOutlinedIcon />
                  SIGN IN
                </Button>
              </Link>
            </Login>
            <Hr />
          </>
        )}
        <Title>Best of dWiseTube</Title>
        <Item>
          <LibraryMusicOutlinedIcon style={iconStyle} />
          Music
        </Item>
        <Item>
          <SportsBasketballOutlinedIcon style={iconStyle} />
          Sports
        </Item>
        <Item>
          <SportsEsportsOutlinedIcon style={iconStyle} />
          Gaming
        </Item>
        <Item>
          <MovieOutlinedIcon style={iconStyle} />
          Movies
        </Item>
        <Item>
          <ArticleOutlinedIcon style={iconStyle} />
          News
        </Item>
        <Item>
          <LiveTvOutlinedIcon style={iconStyle} />
          Live
        </Item>
        <Hr />
        <Item>
          <SettingsOutlinedIcon style={iconStyle} />
          Settings
        </Item>
        <Item>
          <FlagOutlinedIcon style={iconStyle} />
          Report
        </Item>
        <Item>
          <HelpOutlineOutlinedIcon style={iconStyle} />
          Help
        </Item>
        <Item onClick={() => setDarkMode(!darkMode)}>
          <SettingsBrightnessOutlinedIcon style={iconStyle} />
          {darkMode ? "Light" : "Dark"} Mode
        </Item>
      </Wrapper>
    </Container>
  );
};

export default Menu;
