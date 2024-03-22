import styled from '@emotion/styled'
import useUser from '../../hooks/useUser';
import usePoll from '../../hooks/usePoll';
import FeedPage from './FeedPage';
import PollPage from './PollPage';
import handleNative from '../../native';

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
            <Logo>투표 페이지</Logo>
            <Logo>친구가 없습니다.</Logo>
            <Logo onClick={goToFriendPage}>친구 추가하러 가기</Logo>
        </MainContainer>
    )
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

export {Logo, SubText, SubjectText, MainContainer}