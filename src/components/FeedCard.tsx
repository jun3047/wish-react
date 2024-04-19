import styled from "@emotion/styled";
import { FeedType } from "../types/feed";
import handleNative from "../native";
import { ReactComponent as OptionIcon } from '../images/assets/option.svg';
import { Dropdown, Menu, MenuProps } from "antd";
import { feedApi, friendApi, pushApi } from "../apis";
import useUser from "../hooks/useUser";
import getRelationById from "../utils/getRelationById";
import { useState } from "react";

const FeedCard = ({ feed, warnFeed }: { feed: FeedType, warnFeed?: (feedId: number) => void }) => {

    const goToProfile = (id: number) => {
        handleNative('프로필이동', id.toString())
    }

    const [imgLoading, setImgLoading] = useState(true)

    return (
      <CardContainer>
        <QuestionText>익명에게 받은 질문</QuestionText>
        <FeedQuestion>{feed.question}</FeedQuestion>
        <ImageContainer>
          { imgLoading && <SkeletonImage /> }
          <Image 
            src={feed.imgUrl}
            alt="feed"
            onLoad={()=>{
              setImgLoading(false)
            }}
          />
        </ImageContainer>
        <ProfileContainer onClick={() => goToProfile(feed.writer.id)}>
          <ProfileImage />
          <WriterInfo>
            <WriterName>{feed.writer.name}</WriterName>
            <WriterDetails>{feed.writer.school}</WriterDetails>
          </WriterInfo>
          <FeedMenu warnFeed={warnFeed} feed={feed}/>
        </ProfileContainer>
      </CardContainer>
    );
  };

const FeedMenu = ({feed, warnFeed}: {
  feed: FeedType
  warnFeed?: (feedId: number) => void
}) => {

  const [user, setUser] = useUser()

  if(!user) return null

  const relation = getRelationById(user, feed.writer)

  const items: MenuProps['items'] = [
    {key: '1', label: ( <a onClick={(e) => {
      e.stopPropagation()

      if(relation === 'me')
      return handleNative('탭이동', 'my')
      
      handleNative('프로필이동', feed.writer.id.toString())
    }}>프로필 이동</a> )},
    {key: '2', label: ( <a onClick={(e) => {
      e.stopPropagation()

      if(feed.writer.id === user.id) return alert('자신의 게시물은 신고할 수 없습니다.')
      if(!window.confirm('정말 신고하시겠습니까? 누적 신고 3번 이상된 유저는 더 글을 올릴 수 없게 됩니다.')) return
      
      feedApi.warnFeed(user.id, feed.id)
      .then(() => alert('신고가 완료되었습니다. 24시간 내에 조치될 예정입니다.'))
      .catch(() => alert('이미 신고한 게시물입니다.'))
      
      const isMyFeed = warnFeed === undefined
      if(isMyFeed) return 
      
      warnFeed(feed.id)

    }}>글 신고하기</a> )},
    {key: '2', label: ( <a onClick={(e) => {
      e.stopPropagation()

      if(feed.writer.id === user.id) return alert('자신은 신고할 수 없습니다.')
      if(!window.confirm('정말 신고하시겠습니까? 누적 신고 3번 이상된 유저는 더 글을 올릴 수 없게 됩니다.')) return
      
      feedApi.warnFeed(user.id, feed.id)
      .then(() => alert('신고가 완료되었습니다. 24시간 내에 조치될 예정입니다.'))
      .catch(() => alert('이미 신고한 유저입니다.'))
      
      const isMyFeed = warnFeed === undefined
      if(isMyFeed) return 
      
      warnFeed(feed.id)

    }}>사용자 신고하기</a> )},
  ]

  const lastItem = (
      text:string,
      onClick: () => void
    ) => {
        return {
          key: '4',
          label: (<a onClick={(e) => {
          e.stopPropagation()
          onClick()
        }}>{text}</a>)}
    }

  switch(relation) {
    case 'recive':
      items.push(lastItem('친구 수락하기', () => {
        if(!window.confirm(`${feed.writer.name}님의 친구 요청을 수락하겠습니까?`)) return
        friendApi.beFriend(user, feed.writer)
        setUser({...user, friends: [...user.friends, feed.writer]})
      }))
      break
    case 'none':
      items.push(lastItem('친구 요청하기', () => {
        if(!window.confirm(`${feed.writer.name}님께 친구 요청을 하겠습니까?`)) return
        pushApi.reqFriend(user, feed.writer.token)
        setUser({...user, requestFriends: [...user.requestFriends, feed.writer]})
      }))
      break
    case 'request':
      break
    case 'friend':
      break
    case 'me':
      break  
  }

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
  width: 100%;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
`;

const SkeletonImage = styled(Image)`
  background-color: #717171;
  animation: pulse 1.5s infinite alternate;
  
  @keyframes pulse {
    0% {
      opacity: 0.6;
    }
    100% {
      opacity: 1;
    }
  }
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
  width: 100%;
  height: 100%;
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