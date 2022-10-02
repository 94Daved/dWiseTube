import React, { useRef } from "react";
import styled from "styled-components";
import { useState } from "react";
import { publicRequest } from "../requestResponse";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../redux/userSlice";
import { auth, provider } from "../firebase/firebaseInit";
import { signInWithPopup } from "firebase/auth";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.text};
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 28px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
  font-size: 16px;
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const Links = styled.div`
  margin-left: 50px;
`;

const Link = styled.span`
  margin-left: 30px;
`;

const SignIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.slices.user);

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      const res = await publicRequest.post(`auth/signin`, { name, password });
      dispatch(loginSuccess(res.data));
      localStorage.setItem("token", JSON.stringify(res.data.token));
    } catch (error) {
      dispatch(loginFailure());
    }
  };

  const signInWithGoogle = async () => {
    dispatch(loginStart());
    try {
      const firstResult = await signInWithPopup(auth, provider);
      const secondResult = await publicRequest.post("/auth/google", {
        name: firstResult.user.displayName,
        email: firstResult.user.email,
        img: firstResult.user.photoURL,
      });
      dispatch(loginSuccess(secondResult.data));
      localStorage.setItem("token", JSON.stringify(secondResult.data.token));
    } catch (error) {
      dispatch(loginFailure());
    }
  };
  return (
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <SubTitle>to continue to dWiseTube</SubTitle>
        <Input
          placeholder="username"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleLogin}>Sign in</Button>
        <Title>or</Title>
        <Button onClick={signInWithGoogle}>Sign in with Google</Button>
        <Title>or</Title>
        <Input
          placeholder="username"
          onChange={(e) => setName(e.target.value)}
        />
        <Input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
        <Input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button>Sign up</Button>
      </Wrapper>
      <More>
        English(USA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  );
};

export default SignIn;
