import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Card from "../components/Card";
import { publicRequest } from "../requestResponse";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;

const Search = () => {
  const [videos, setVideos] = useState([]);
  const query = useLocation().search.split("=")[1];

  console.log(query);
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await publicRequest.get(`/videos/search?q=${query}`);
        setVideos(res.data);
      } catch (error) {}
    };

    fetch();
  }, [query]);

  return (
    <Container>
      {videos.map((video) => (
        <Card key={video._id} video={video} />
      ))}
    </Container>
  );
};

export default Search;
