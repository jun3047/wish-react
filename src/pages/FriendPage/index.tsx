import styled from '@emotion/styled'
import useUser from '../../hooks/useUser';
import useRecommendFriends from '../../apis/queries/useRecommendFriends';
import useContacts from '../../hooks/useContacts';
import { UserType } from '../../types/user';

export default function FriendPage ({user}:{user: UserType}) {

    const {data} = useRecommendFriends(user)

    return (
        <MainContainer>
            {/* <Logo>{data[0].name}</Logo> */}
            {/* <Logo>친구 목록 {data[0].id}</Logo> */}
            <Logo>요청 상승</Logo>
            <Logo>추가 상승</Logo>
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