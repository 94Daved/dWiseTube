import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { format } from "timeago.js";
import { publicRequest } from "../requestResponse";

const Container = styled.div`
  padding: 10px;

  cursor: pointer;
  height: ${(props) => props.type === "sm" && "160px"};
  /* background-color: #999; */
  display: ${(props) => props.type === "sm" && "flex"};
  /* margin-bottom: ${(props) => props.type === "sm" && "10px"}; */
  gap: ${(props) => props.type === "sm" && "15px"};
`;

const Image = styled.img`
  width: ${(props) => (props.type === "sm" ? "60%" : "100%")};
  height: ${(props) => props.type === "sm" && "100%"};
  object-fit: cover;
  margin-bottom: 15px;
`;

const Details = styled.div`
  display: flex;
`;

const ImageProfile = styled.img`
  height: 50px;
  width: 50px;
  margin-right: 15px;
  display: ${(props) => props.type === "sm" && "none"};
  border-radius: 50%;
  object-fit: cover;
`;

const DescInfos = styled.div`
  width: ${(props) => props.type === "sm" && "100px"};
`;

const Desc = styled.p`
  width: ${(props) => (props.type === "sm" ? "180px" : "100%")};
  margin: 0;
  padding: 0;
  color: ${({ theme }) => theme.text};
  font-size: ${(props) => (props.type === "sm" ? "16px" : "21px")};
  margin-bottom: 10px;
`;

const ChannelName = styled.p`
  width: ${(props) => (props.type === "sm" ? "160px" : "100%")};
  margin: 0;
  padding: 0;
  color: ${({ theme }) => theme.textDesc};
  font-size: ${(props) => (props.type === "sm" ? "14px" : "17px")};
  margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "5px")};
`;
const VideoStats = styled.p`
  width: ${(props) => (props.type === "sm" ? "160px" : "100%")};
  margin: 0;
  padding: 0;
  font-size: ${(props) => (props.type === "sm" ? "14px" : "17px")};
  color: ${({ theme }) => theme.textDesc};
`;

const Card = ({ type, video }) => {
  const [channel, setChannel] = useState([]);

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const res = await publicRequest.get(`/users/find/${video.userId}`);
        setChannel(res.data);
      } catch (error) {}
    };
    fetchChannel();
  }, [video.userId]);

  return (
    <Link to={`/video/${video._id}`} style={{ textDecoration: "none" }}>
      <Container type={type}>
        <Image type={type} src={video.imgUrl} />
        <Details type={type}>
          <ImageProfile type={type} src={channel.img} />
          <DescInfos type={type}>
            <Desc type={type}>{video.title}</Desc>
            <ChannelName type={type}>{channel.name}</ChannelName>
            <VideoStats type={type}>
              {video.views} views &#183; {format(video.createdAt)}
            </VideoStats>
          </DescInfos>
        </Details>
      </Container>
    </Link>
  );
};

export default Card;
