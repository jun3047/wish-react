import { Logo, MainContainer } from "."
import useRecommendFeeds from "../../apis/queries/useRecommendFeeds"
import useUser from "../../hooks/useUser"
import handleNative from "../../native"
import { UserType } from "../../types/user"

export default function FeedPage ({user}: {user: UserType}) {

    const {data} = useRecommendFeeds(user)

    return (
        <MainContainer>
            <Logo>피드 페이지</Logo>
            <Logo>{data.length}</Logo>
            <Logo onClick={()=>{
                handleNative('프로필이동', '0')
            }}>프로필</Logo>
            <Logo>{user.age}</Logo>
            <Logo>{user.age}</Logo>
        </MainContainer>
    )
}