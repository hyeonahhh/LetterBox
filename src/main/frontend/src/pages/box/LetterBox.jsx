import React from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import RoundButton from "../../components/RoundButton";
import styled from "styled-components";
import { SCREEN_MAX_SIZE } from "../../constant";
import BoxShape from "../../components/BoxShape";
import Clock from "../../components/Clock";

const LetterBoxCover = styled.div`
  max-width: ${SCREEN_MAX_SIZE}px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 36px;
  box-sizing: border-box;
  @media only screen and (min-width: 600px) {
    justify-content: space-between;
  }
`;

const LetterBoxTitle = styled.h2`
  font-size: 24px;
  line-height: 34px;
  text-align: center;
`;

const TtitleNickname = styled.span`
  color: #8040e9;
`;

const LetterBoxButton = styled.div`
  width: 100%;
`;

const LetterClock = styled.div`
  font-size: 16px;
  background: #eac1d6;
  padding: 0 10px;
  color: white;
  border-radius: 20px;
  margin: 10px 0;
`;

export default function LetterBox() {
  const Fortune = () => <span>수업 선물하기</span>;
  const Bag = () => <span>내 시간표 확인하기</span>;
  const navigate = useNavigate();
  const { box } = useOutletContext();
  const messageList = box.letterLists ? box.letterLists : [];
  return (
    <LetterBoxCover>
      <LetterBoxTitle>
        <TtitleNickname>{box.name}</TtitleNickname>
        <span>의 시간표</span>
        <LetterClock>
          <Clock />
        </LetterClock>
      </LetterBoxTitle>
      <BoxShape
        messageList={messageList}
        owner={false}
        onClick={() => {
          console.log("사용자가 아닙니다");
        }}
      />
      <LetterBoxButton>
        <RoundButton
          Children={Fortune}
          onClick={() => {
            navigate(`/question/${box.letterboxId}/name`);
          }}
        />
        <RoundButton
          Children={Bag}
          onClick={() => {
            navigate("/box");
          }}
        />
      </LetterBoxButton>
    </LetterBoxCover>
  );
}
