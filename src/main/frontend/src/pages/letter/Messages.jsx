import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import RoundButton from "../../components/RoundButton";
import API from "../../config";
import { SCREEN_MAX_SIZE } from "../../constant";

const MessagesBox = styled.div`
  max-width: ${SCREEN_MAX_SIZE}px;
  padding: 0 28px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin: 0 auto;
  height: 100%;
`;
const MessagePaper = styled.div`
  height: 50%;
  background: #f6f6f6;
  border-radius: 50px;
  padding: 34px;
  color: ${(props) => props.color};
  position: relative;
`;

const MessageSender = styled.h2`
  font-size: 24px;
  text-align: center;
`;
const MessageSenderForm = styled.span`
  text-transform: uppercase;
`;

const MessageSenderName = styled.span`
  text-transform: uppercase;
`;

const MessagePaperImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  max-width: 80%;
  max-height: 80%;
  object-fit: contain;
`;
export default function Messages() {
  const navigate = useNavigate();
  const { boxId, chatId } = useParams();
  const [data, setData] = useState();
  useEffect(() => {
    async function fetchData() {
      await axios
        .get(API.MESSAGE(boxId, chatId), {
          headers: { authorization: localStorage.getItem("jwt") },
        })
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          alert("잘못된 접근입니다");
          navigate("/box");
        });
    }
    fetchData();
  }, [data]);

  return (
    <MessagesBox>
      {data ? (
        data.open ? (
          <>
            <MessageSender>
              <MessageSenderForm>from. </MessageSenderForm>
              <MessageSenderName>{data.nickname}</MessageSenderName>
            </MessageSender>
            <MessagePaper color={data.textColor}>
              {data.content}
              <MessagePaperImage src={data.file && data.file.fileurl} />
            </MessagePaper>
            <div>
              <RoundButton
                Children={() => <span>누군지 맞히기</span>}
                onClick={() => navigate(`/box/${boxId}/chatting/${chatId}`)}
              />
              <RoundButton
                Children={() => <span>닫기</span>}
                onClick={() => {
                  navigate(`/box/${boxId}`);
                }}
              />
            </div>
          </>
        ) : (
          <MessagePaper>아직 확인하실 수 없습니다</MessagePaper>
        )
      ) : (
        <div> 로딩중</div>
      )}
    </MessagesBox>
  );
}
