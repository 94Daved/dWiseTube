import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { publicRequest } from "../requestResponse";
import Comment from "./Comment";

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
  font-size: 18px;
`;

const Comments = ({ videoId }) => {
  const { currentUser } = useSelector((state) => state.slices.user);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await publicRequest.get(`/comments/${videoId}`);
        setComments(res.data);
      } catch (err) {}
    };
    fetchComments();
  }, [videoId]);

  return (
    <Container>
      <NewComment>
        <Avatar src={currentUser._id} />
        <Input placeholder="Add a comment..." />
      </NewComment>
      {comments.map((comment) => {
        return <Comment key={comment._id} comment={comment} />;
      })}
    </Container>
  );
};

export default Comments;
