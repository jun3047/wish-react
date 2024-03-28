import styled from '@emotion/styled'
import useRecommendFriends from '../../apis/queries/useRecommendFriends';
import { SimpleUserType, UserType } from '../../types/user';
import { friendApi } from '../../apis';
import makeUserSimple from '../../utils/makeUserSimple';
import FriendSection from '../../components/FriendSection';
import { Logo, NoPageContainer, NoText } from '../HomePage';

export default function FriendPage ({
    user,
    setUser
}:{
    user: UserType,
    setUser: (user: UserType) => void
}) {

    const {data} = useRecommendFriends(user)

    if(!data) return <div>로딩중</div>

    const isNotShowFriend = (friend: SimpleUserType) => {
        const alreadyFriends = user.friends.find(userFriend => userFriend.id === friend.id)
        const alreadyRequestFriends = user.requestFriends.find(userFriend => userFriend.id === friend.id)
        const alreadyReceivedFriends = user.receivedFriends.find(userFriend => userFriend.id === friend.id)

        return !alreadyFriends && !alreadyRequestFriends && !alreadyReceivedFriends
    }
    const FilterData = data.filter(isNotShowFriend)

    const isRecommendFriend = FilterData.length > 0

    return (
        <MainContainer>
            <FriendSection
                title={'신규 요청'}
                data={user.receivedFriends}
            />
            <FriendSection
                title={'학교 친구들'}
                data={FilterData}
            />
            {
                isRecommendFriend || <NoFriend />
            }
        </MainContainer>
    );
}

const NoFriend = () => {
    return (
        <NoPageContainer>
            <NoText>추천 친구가 없어요 🥲</NoText>
            <NoText>다른 친구를 초대해봐요</NoText>
        </NoPageContainer>
    )
}

const MainContainer = styled.div`
    height: 100vh;
    width: 100vw;

    display: flex;
    flex-direction: column;
    align-items: center;
    color: #000;
`