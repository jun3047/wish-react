import { Logo, MainContainer } from "."
import useUser from "../../hooks/useUser"
import handleNative from "../../native"

export default function FeedPage () {

    const [user, setUser] = useUser()

    if(!user) return <Logo>대기중</Logo>

    return (
        <MainContainer>
            <Logo>피드 페이지</Logo>
            <Logo onClick={()=>{
                handleNative('프로필이동', '1')
            }}>프로필</Logo>
            <Logo>{user.age}</Logo>
            <Logo>{user.age}</Logo>
            <Logo onClick={()=>{
                setUser({...user, age: user.age+1})
            }}>1 상승</Logo>
        </MainContainer>
    )
}