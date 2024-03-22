import { Logo, MainContainer } from "."
import usePoll from "../../hooks/usePoll"
import useUser from "../../hooks/useUser"
import handleNative from "../../native"
import randomQuestion from "./PollData"

export default function FeedPage () {

    const [user, setUser] = useUser()
    const [poll, setPoll, scheduleNextPoll] = usePoll()

    if(!user) return <Logo>대기중</Logo>
    if(!poll) return <Logo>대기중</Logo>
    
    return (
        <MainContainer>
            <Logo>투표</Logo>
            <Logo>{user.age}</Logo>
            <Logo>{poll.question}</Logo>
            <Logo onClick={scheduleNextPoll}>투표하기</Logo>
        </MainContainer>
    )
}