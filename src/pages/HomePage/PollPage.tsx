import { Logo, MainContainer } from "."
import usePoll from "../../hooks/usePoll"
import useUser from "../../hooks/useUser"

export default function FeedPage () {

    const [user, setUser] = useUser()
    const [poll, setPoll] = usePoll()

    if(!user) return <Logo>대기중</Logo>

    return (
        <MainContainer>
            <Logo>{user.age}</Logo>
            <Logo onClick={()=>{
                setUser({...user, age: user.age+1})
            }}>1 상승</Logo>
        </MainContainer>
    )
}