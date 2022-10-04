import styled, { ThemeProvider } from "styled-components";
import Header from "./components/Header";
import Menu from "./components/Menu";
import Sidebar from "./components/Sidebar";
import { useState } from "react";
import { darkTheme, lightTheme } from "./utils/Theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Video from "./pages/Video";
import Login from "./pages/Login";
import Search from "./pages/Search";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Main = styled.div`
  display: flex;
  position: relative;

  z-index: 10;
  margin-top: 90px;
  background-color: ${({ theme }) => theme.bgPlaceHolder};
  min-height: calc(100vh - 90px);
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  /* justify-content: center;
  align-items: center; */
  padding: 15px 45px;
  margin-left: 120px;
  z-index: -200;
`;

function App() {
  const [modal, setModal] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <BrowserRouter>
          <Header setModal={setModal} modal={modal} />
          <Main>
            <Menu modal={modal} darkMode={darkMode} setDarkMode={setDarkMode} />
            <Sidebar />
            <Wrapper position={modal && "fixed"}>
              <Routes>
                <Route path="/">
                  <Route index element={<Home type="random" />} />
                  <Route path="trends" element={<Home type="trend" />} />
                  <Route path="subscriptions" element={<Home type="sub" />} />
                  <Route path="video">
                    <Route path=":id" element={<Video />} />
                  </Route>
                  <Route path="search" element={<Search />} />
                  <Route path="login" element={<Login />} />
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
