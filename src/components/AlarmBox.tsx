import styled from "@emotion/styled"
import handleNative from "../native"
import { AlarmType } from "../types/alarm"
import { ReactComponent as CameraIcon } from "../images/assets/camera.svg"
import makeUserSimple from "../utils/makeUserSimple"
import { UserType } from "../types/user"
import { trackEvent } from "../apis/logging/amplitude"

const AlarmBox = ({alarm, user} : {alarm: AlarmType, user: UserType}) => {

    const { question, asker } = alarm;

    const writer = makeUserSimple(user);

    type Gender = '남자' | '여자';
    const getOtherGender = (gender: Gender): Gender => gender === '남자' ? "여자" : "남자"

    const displayAsker = asker.school === undefined ? {
        age: writer.age,
        gender: getOtherGender(writer.gender),
        school: writer.school
    }: asker

    return (
        <AlarmContainer onClick={() => handleNative('알람', `${question},${displayAsker.school},${displayAsker.age},${displayAsker.gender}`)}>
          <ProfileIcon gender = {displayAsker.gender}/>
          <QuestionDetails>
            <QuestionText>{question}</QuestionText>
            {
              displayAsker.school === undefined ? null 
              
              :<MutualFriendsText>{displayAsker.school}에 다니는 {displayAsker.age}살</MutualFriendsText>
            }
          </QuestionDetails>
          <div style={{ flex: 1 }} />
          <CameraIcon
            width={24}
            height={24}
            onClick={(e) => {
              e.stopPropagation();

              const isSameGender = asker.gender === user.gender ? 'same' : 'other';
              trackEvent(`view_alarmDetail-${isSameGender}`)
              handleNative('카메라', JSON.stringify({
                asker: asker,
                question: question,
                writer: writer
              }));
            }}
          />
        </AlarmContainer>
      );    
}

const AlarmContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  background-color: black;
  width: 100%;
  cursor: pointer;
`;


interface IProfileIcon {
    gender: "남자" | "여자";
}

const ProfileIcon = styled.div<IProfileIcon>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({gender}) => gender === "남자" ? "#4D6FFF" : "#FF4D6F"};
`;

const QuestionDetails = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    max-width: calc(95% - 80px);
`;

const QuestionText = styled.p`
  font-size: 16px;
  color: white;
  font-weight: bold;
`;

const MutualFriendsText = styled.p`
  color: #787878;
  font-size: 13px;
`;

export default AlarmBox;