import { FeedMainContainer, Logo, MainContainer, NoPageContainer, NoText } from "."
import useRecommendFeeds from "../../apis/queries/useRecommendFeeds"
import handleNative from "../../native"
import { UserType } from "../../types/user"
import MainBtn from "../../components/MainBtn"
import FeedCard from "../../components/FeedCard"
import { useState } from "react"
import { trackEvent } from "../../apis/logging/amplitude"
import ObserverTarget from "../../components/ObserverTarget"

export default function FeedPage ({user}: {user: UserType}) {

    const { data, hasNextPage, fetchNextPage, refetch } = useRecommendFeeds(user)
    const [warnFeedIds, setWarnFeedIds] = useState<number[]>([])

    if(!data || data.length === 0) return <NoFeedPage />

    const filteredData = data.filter(feed => {
            if(warnFeedIds.includes(feed.id)) return false
            if(feed.writer.id === user.id) return false
            
            if(feed.warnUserIds.length === 0) return true
            if((feed.warnUserIds as number[]).includes(user.id)) return false

            return false
        }
    )

    if(filteredData.length === 0) return <NoFeedPage />

    const warnFeed = (feedId: number) => setWarnFeedIds([...warnFeedIds, feedId])

    return (
        <FeedMainContainer>
            <Logo style={{position: 'relative', marginBottom: '20px'}}>WISH</Logo>
            {
                filteredData.map(feed => (
                    <FeedCard key={feed.id} feed={feed} warnFeed={warnFeed}/>
                ))
            }
            <ObserverTarget hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} />
        </FeedMainContainer>
    )
}

const NoFeedPage = () => {

    const goToAlarmPage = () => {
        trackEvent('click_go2Alarm')
        handleNative('탭이동', 'alarm')
    }

    return (
        <MainContainer>
            <NoPageContainer>
                <Logo>WISH</Logo>
                <NoText>아직 글이 없어요</NoText>
                <NoText>알림에서 질문을 눌러 올려봐요</NoText>
                <MainBtn onClick={goToAlarmPage}>알림으로 가기</MainBtn>
            </NoPageContainer>
        </MainContainer>
    )
}