import styled from '@emotion/styled'
import useUser from '../../hooks/useUser';
import usePoll from '../../hooks/usePoll';
import FeedPage from './FeedPage';
import PollPage from './PollPage';
import handleNative from '../../native';
import MainBtn from '../../components/MainBtn';

const MIN_FRIENDS = 4

export default function HomePage () {

    const [poll, setPoll, scheduleNextPoll] = usePoll()
    const [user, setUser] = useUser()

    if(!user) return <Logo>대기중</Logo>

    if(!user.friends || user.friends.length < MIN_FRIENDS) {
        return <NoFirendPage />
    }

    if(!poll?.question) {
        return <FeedPage user={user}/>
    }

    return <PollPage />
}

const NoFirendPage = () => {

    const goToFriendPage = () => {
        handleNative('탭이동', 'friend')
    }

    return (
        <MainContainer>
            <NoPageContainer>
                <Logo>WISH</Logo>
                <NoText>시작을 위해서</NoText>
                <NoText>4명 이상의 친구가 필요해요</NoText>
                <MainBtn onClick={goToFriendPage}>추천 친구 보기</MainBtn>
            </NoPageContainer>  
        </MainContainer>
    )
}


// 안내문구

const Logo = styled.div`
    position: fixed;
    top: 3%;
    font-size: 2rem;
    font-weight: 900;
    color: #ffffff;
`

const NoText = styled.p`
    margin-top: 3%;
    font-size: 1.75rem;
    font-weight: 900;
    color: #ffffff;
`

const NoPageContainer = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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

export {
    Logo,
    SubText,
    SubjectText,
    MainContainer,
    NoText,
    NoPageContainer
}