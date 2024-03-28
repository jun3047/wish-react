/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { useState } from 'react';
import handleNative from '../native';
import useUser from '../hooks/useUser';
import { SimpleUserType, UserType } from '../types/user';
import makeUserSimple from '../utils/makeUserSimple';
import { Logo } from '../pages/HomePage';
import { friendApi, pushApi } from '../apis';


interface FriendSectionProps {
    title: string;
    data: SimpleUserType[];
}

const FriendSection: React.FC<FriendSectionProps> = ({ title, data }) => {
  const [maxDisplayCount, setMaxDisplayCount] = useState(2);

  const [user, setUser] = useUser()

  if(!user) return <Logo>대기중</Logo>

  const handleShowMore = () => {
    setMaxDisplayCount((prevCount) => Math.min(prevCount + 10, data.length));
  };

  const beFriend = async (targetUser: SimpleUserType) => {
    friendApi.beFriend(makeUserSimple(user), targetUser)
    pushApi.reciveFriend(user, targetUser.token)

    setUser({
        ...user,
        friends: !user?.friends?.length ?
        [targetUser]:
        [...user.friends, targetUser],
        requestFriends: user.requestFriends.filter(friend => friend.id !== targetUser.id)
    })
  }

  const addFriend = async (targetUser: SimpleUserType) => {
    pushApi.reqFriend(makeUserSimple(user), targetUser.token)
    setUser({
        ...user,
        requestFriends: !user?.requestFriends?.length ?
        [targetUser]:
        [...user.requestFriends, targetUser]
    })
  }

  if (!data.length) return null;

  return (
    <Container>
      <Title>{title}</Title>
      {data.slice(0, maxDisplayCount).map((item, index) => (
        <FriendItem key={index} onClick={() => handleNative('프로필이동', item.id.toString())}>
          <ProfileIcon />
          <FriendInfo>
            <FriendName>{item.name}</FriendName>
            <MutualFriends>{item.age}살 {item.school}</MutualFriends>
          </FriendInfo>
          <div style={{ flex: 1 }} />
          {title === '신규 요청' ? (
            <BeFriendButton onClick={() => beFriend(item)} />
          ) : (
            <AddFriendButton onClick={() => addFriend(item)} />
          )}
        </FriendItem>
      ))}
      {maxDisplayCount < data.length && <MoreButton onClick={handleShowMore}>더보기</MoreButton>}
    </Container>
  );
};

const AddFriendButton = ({ onClick}: {
    onClick: () => void;
}) => {
    
  return <ActionButton onClick={(e)=>{
    e.stopPropagation()
    onClick()
  }}>추가</ActionButton>;
};

const BeFriendButton = ({onClick}: {
    onClick: () => void;
}) => {

  return <ActionButton onClick={(e)=>{
    e.stopPropagation()
    onClick()
  }}>수락</ActionButton>;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
  padding: 24px 15px;
`;

const Title = styled.h2`
  margin-left: 8px;
  font-size: 16px;
  font-weight: bold;
  color: #919191;
`;

const FriendItem = styled.div`
  display: flex;
  gap: 12px;
  padding: 8px;
  background-color: black;
  width: 100%;
  cursor: pointer;
`;

const ProfileIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #909090;
`;

const FriendInfo = styled.div``;

const FriendName = styled.p`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

const MutualFriends = styled.p`
  color: #787878;
  font-size: 13px;
`;

const MoreButton = styled.div`
  text-align: center;
  width: 100%;
  padding: 4px;
  margin-top: 8px;
  font-size: 14px;
  font-weight: bold;
  color: #787878;
  background-color: black;
  cursor: pointer;
`;

const ActionButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  padding: 0 16px;
  margin-right: 4px;
  font-size: 14px;
  font-weight: bold;
  color: black;
  background-color: white;
  border-radius: 9999px;
  cursor: pointer;
`;

export default FriendSection;