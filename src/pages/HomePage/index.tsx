import styled from '@emotion/styled'
import useUser from '../../hooks/useUser';
import usePoll from '../../hooks/usePoll';
import FeedPage from './FeedPage';
import PollPage from './PollPage';

export default function HomePage () {

    const [poll, setPoll] = usePoll()

    if(!poll?.question) return <FeedPage />
    else return <PollPage />
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