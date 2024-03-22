import styled from '@emotion/styled'
import useRecommendFriends from '../../apis/queries/useRecommendFriends';
import { UserType } from '../../types/user';
import { friendApi } from '../../apis';
import makeUserSimple from '../../utils/MakeUserSimple';

export default function FriendPage ({
    user,
    setUser
}:{
    user: UserType,
    setUser: (user: UserType) => void
}) {

    const {data} = useRecommendFriends(user)

    return (
        <MainContainer>
            <Logo>{data.length}</Logo>
            <Logo onClick={()=>{
                friendApi.beFriend(makeUserSimple(user), data[0])
                setUser({
                    ...user,
                    friends: user.friends ?
                    [...user.friends, data[0]]:
                    [data[0]]
                })
            }}
            >친구 수릭</Logo>
        </MainContainer>
    );
}

const Logo = styled.div`
    font-size: 2.5rem;
    font-weight: 900;
    color: #ffffff;
`

const SubText = styled.div`
    font-size: 1rem;
    margin-top: 15%;
    margin-bottom: 5%;

    font-weight: 400;
    color: #ffffff;
`

const SubjectText = styled.div`
    font-size: 2rem;
    font-weight: 700;
    color: #ffffff;

    margin-bottom: 10%;
`

const MainContainer = styled.div`
    height: 100vh;
    width: 100vw;

    display: flex;
    flex-direction: column;
    align-items: center;
    color: #000;
`