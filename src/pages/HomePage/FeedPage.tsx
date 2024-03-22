import styled from "@emotion/styled"
import { Logo, MainContainer } from "."
import useRecommendFeeds from "../../apis/queries/useRecommendFeeds"
import useUser from "../../hooks/useUser"
import handleNative from "../../native"
import { UserType } from "../../types/user"

export default function FeedPage ({user}: {user: UserType}) {

    const {data} = useRecommendFeeds(user)


    if(!data.length) return <NoFeedPage />

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

const NoFeedPage = () => {

    const goToAlarmPage = () => {
        handleNative('탭이동', 'alarm')
    }

    return (
        <MainContainer>
            <Logo>아직 글이 없어요</Logo>
            <Logo>알림에서 질문을 눌러 올려봐요</Logo>
            <Logo onClick={goToAlarmPage}>알림으로 가기</Logo>

        </MainContainer>
    )
}