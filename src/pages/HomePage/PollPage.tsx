import { Logo, MainContainer } from "."
import usePoll from "../../hooks/usePoll"
import useUser from "../../hooks/useUser"
import handleNative from "../../native"

export default function FeedPage () {

    const [user, setUser] = useUser()
    const [poll, setPoll] = usePoll()

    if(!user) return <Logo>대기중</Logo>
    if(!poll) return <Logo>대기중</Logo>
    
    return (
        <MainContainer>
            <Logo>투표</Logo>
            <Logo>{user.age}</Logo>
            <Logo>{poll.question}</Logo>
            <Logo onClick={()=>{

                const newPoll = {
                    question: '질문 내용입니다',
                    nextTime: 0,
                }

                const content = JSON.stringify({
                    title: '이런거 어때요?',
                    body: '테스트입니다',
                    data: {
                        pollInfo: newPoll
                    }
                })
                handleNative('로컬푸시', content)
                setPoll({
                    question: '',
                    nextTime: ''
                })
            }}>로컬푸시 등록</Logo>
        </MainContainer>
    )
}