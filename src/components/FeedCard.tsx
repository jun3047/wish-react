import styled from "@emotion/styled";
import { FeedType } from "../types/feed";
import handleNative from "../native";
import { ReactComponent as OptionIcon } from '../images/assets/option.svg';
import { Dropdown, Menu, MenuProps } from "antd";

const FeedCard = ({ feed }: { feed: FeedType }) => {


    const goToProfile = (id: number) => {
        handleNative('프로필이동', id.toString())
    }
    
    return (
      <CardContainer>
        <QuestionText>익명에게 받은 질문</QuestionText>
        <FeedQuestion>{feed.question}</FeedQuestion>
        <ImageContainer>
          <Image src={feed.imgUrl} alt="feed" />
        </ImageContainer>
        <ProfileContainer onClick={() => goToProfile(feed.writer.id)}>
          <ProfileImage />
          <WriterInfo>
            <WriterName>{feed.writer.name}</WriterName>
            <WriterDetails>{feed.writer.school}</WriterDetails>
          </WriterInfo>
          <FeedMenu />
        </ProfileContainer>
      </CardContainer>
    );
  };

const FeedMenu = () => {
    const items: MenuProps['items'] = [
        {key: '1', label: ( <a onClick={(e) => e.stopPropagation()}>신고하기</a> )},
        {key: '2', label: ( <a onClick={(e) => e.stopPropagation()}>신고하기</a> )},
        {key: '3', label: ( <a onClick={(e) => e.stopPropagation()}>신고하기</a> )}
    ]

    return (
        <Dropdown menu={{items}} placement="bottomLeft">
            <OptionIcon onClick={(e) => e.stopPropagation()}/>
        </Dropdown>
    )
}

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 30px;
  margin: 16px 0;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
`;

const ProfileContainer = styled.div`
  display: flex;
  width: 100%;
  padding-right: 10px;
`;

const QuestionText = styled.p`
  width: 100%;
  text-align: left;
  font-size: 14px;
  font-weight: bold;
  color: #757575;
`;

const FeedQuestion = styled(QuestionText)`
  color: white;
`;

const ImageContainer = styled.div`
  margin: 20px 0;
  overflow: hidden;
  border-radius: 30px;
  aspect-ratio: 1;
`;

const ProfileImage = styled.div`
  width: 20px;
  padding: 20px;
  border-radius: 50%;
  background-color: #555555;
  margin-right: 8px;
`;

const WriterInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  cursor: pointer; /* Assuming you want the whole area to be clickable */
`;

const WriterName = styled.p`
  font-size: 14px;
  font-weight: bold;
  color: white;
`;

const WriterDetails = styled(WriterName)`
  color: #757575;
`;


export default FeedCard;