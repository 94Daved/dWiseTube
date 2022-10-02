import React from "react";
import Card from "../components/Card";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { publicRequest } from "../requestResponse";
import { useSelector } from "react-redux";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 15px;
  row-gap: 40px;
`;

const Home = ({ type }) => {
  const [videos, setVideos] = useState([]);
  const { currentUser } = useSelector((state) => state.slices.user);

  // const authToken = JSON.parse(localStorage.getItem("token"));
  // console.log(authToken);
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await publicRequest.get(`/videos/${type}`);
        setVideos(res.data);
        // publicRequest.defaults.headers.common["token"] = currentUser?.token;
      } catch (error) {}
    };
    fetchVideos();
  }, [type]);

  console.log(videos);
  return (
    <Container>
      {videos?.map((video) => (
        <Card key={video._id} video={video} />
      ))}
    </Container>
  );
};

export default Home;
