import React from "react";
import styled from "styled-components";

import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import FitScreenIcon from "@mui/icons-material/FitScreen";

const Container = styled.div`
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: fixed;
  top: 90px;
  width: 120px;
  height: calc(100vh - 71px);
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px 0;
`;

const ItemsSidebar = styled.div`
  height: 130px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.bgHover};
  }
`;

const Span = styled.span`
  margin-top: 5px;
  color: inherit;
  //color: ${({ theme }) => theme.text};
`;

const iconStyle = {
  fontSize: 40,
  color: "inherit",
};
const Sidebar = () => {
  return (
    <Container>
      <Wrapper>
        <ItemsSidebar>
          <HomeIcon style={iconStyle} />
          <Span>Home</Span>
        </ItemsSidebar>

        <ItemsSidebar>
          <ExploreIcon style={iconStyle} />
          <Span>Explore</Span>
        </ItemsSidebar>

        <ItemsSidebar>
          <FitScreenIcon style={iconStyle} />
          <Span>Shorts</Span>
        </ItemsSidebar>

        <ItemsSidebar>
          <SubscriptionsIcon style={iconStyle} />
          <Span>Subscriptions</Span>
        </ItemsSidebar>

        <ItemsSidebar>
          <VideoLibraryIcon style={iconStyle} />
          <Span>Library</Span>
        </ItemsSidebar>
      </Wrapper>
    </Container>
  );
};

export default Sidebar;
