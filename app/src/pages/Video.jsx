import React from "react";
import styled from "styled-components";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import Card from "../components/Card";
import Comments from "../components/Comments";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { publicRequest } from "../requestResponse";
import { useDispatch, useSelector } from "react-redux";
import {
  dislikes,
  fetchFailure,
  likes,
  fetchStart,
  fetchSuccess,
} from "../redux/videoSlice";
import { sub } from "../redux/userSlice";

import { format } from "timeago.js";

const Container = styled.div`
  display: flex;
  gap: 24px;
  width: 100%;
`;

const Content = styled.div`
  flex: 6;
`;
const VideoWrapper = styled.div``;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  font-size: 16px;
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Recommendation = styled.div`
  flex: 2.5;
`;
const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
  font-size: 18px;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 16px;
`;

const Description = styled.p`
  font-size: 18px;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 15px 30px;
  cursor: pointer;
  font-size: 18px;
`;

const VideoFrame = styled.video`
  max-height: 720px;
 width: 100%;: ;
  object-fit: cover;
`;

const Video = () => {
  const path = useLocation().pathname.split("/")[2];
  const { currentUser } = useSelector((state) => state.slices.user);
  const { currentVideo } = useSelector((state) => state.slices.video);
  const [channel, setChannel] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const fectVideo = async () => {
      dispatch(fetchStart());
      try {
        const videoRes = await publicRequest.get(`videos/find/${path}`);
        const channelRes = await publicRequest.get(
          `users/find/${videoRes.data.userId}`
        ); //the owner of the video which we want to watch (This is his channel)

        dispatch(fetchSuccess(videoRes.data));
        setChannel(channelRes.data);
      } catch (error) {
        dispatch(fetchFailure());
      }
    };

    fectVideo();
  }, [path, dispatch]);

  const handleLike = async () => {
    await publicRequest.put(`users/like/${currentVideo._id}`);
    dispatch(likes(currentUser._id));
  };
  const handleDislike = async () => {
    await publicRequest.put(`users/dislike/${currentVideo._id}`);
    dispatch(dislikes(currentUser._id));
  };

  const handleSub = async () => {
    if (!currentUser.subscriberdUsers.includes(channel._id)) {
      await publicRequest.put(`users/sub/${channel._id}`);
      dispatch(sub(channel._id));
    } else {
      await publicRequest.put(`users/unsub/${channel._id}`);
      dispatch(sub(channel._id));
    }
  };

  return (
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame src={currentVideo?.videoUrl}></VideoFrame>
        </VideoWrapper>
        <Title>{currentVideo?.title}</Title>
        <Details>
          <Info>
            {currentVideo?.views}views • {format(currentVideo?.createdAt)}
          </Info>
          <Buttons>
            <Button onClick={handleLike}>
              {currentVideo?.likes?.includes(currentUser?._id) ? (
                <ThumbUpIcon />
              ) : (
                <ThumbUpOutlinedIcon />
              )}{" "}
              {currentVideo?.likes.length}
            </Button>
            <Button onClick={handleDislike}>
              {currentVideo?.dislikes?.includes(currentUser?._id) ? (
                <ThumbDownIcon />
              ) : (
                <ThumbDownOffAltOutlinedIcon />
              )}{" "}
              Dislike
            </Button>
            <Button>
              <ReplyOutlinedIcon /> Share
            </Button>
            <Button>
              <AddTaskOutlinedIcon /> Save
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src={channel.img} />
            <ChannelDetail>
              <ChannelName>{channel.name}</ChannelName>
              <ChannelCounter>{channel.subscribers} subscribers</ChannelCounter>
              <Description>{currentVideo?.desc}</Description>
            </ChannelDetail>
          </ChannelInfo>
          <Subscribe onClick={handleSub}>
            {currentUser.subscriberdUsers?.includes(channel._id)
              ? "SUBSCRIBED"
              : "SUBSCRIBE"}
          </Subscribe>
        </Channel>
        <Hr />
        <Comments videoId={currentVideo?._id} />
      </Content>
      <Recommendation>
        {/* <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" /> */}
      </Recommendation>
    </Container>
  );
};

export default Video;
