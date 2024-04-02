import styled from "@emotion/styled"
import { Logo, MainContainer, NoPageContainer, NoText } from "."
import useRecommendFeeds from "../../apis/queries/useRecommendFeeds"
import handleNative from "../../native"
import { UserType } from "../../types/user"
import MainBtn from "../../components/MainBtn"
import { FeedType } from "../../types/feed"
import FeedCard from "../../components/FeedCard"
import { css } from '@emotion/react';
import makeUserSimple from "../../utils/makeUserSimple"
import { useState } from "react"

export default function FeedPage ({user}: {user: UserType}) {

    const {data} = useRecommendFeeds(user) 
    const [warnFeedIds, setWarnFeedIds] = useState<number[]>([])

    alert('useRecommendFeeds(user)Data: ' + data.length + JSON.stringify(data))

    if(data.length === 0) return <NoFeedPage />

    const filteredData = data.filter(feed => {
            if(warnFeedIds.includes(feed.id)) return true
            if(feed.writer.id === user.id) return true
            
            if(feed.warnUserIds.length === 0) return false
            if((feed.warnUserIds as number[]).includes(user.id)) return true

            return true
        }
    )

    alert('filteredData: ' + filteredData.length + JSON.stringify(filteredData))

    if(filteredData.length === 0) return <NoFeedPage />

    const warnFeed = (feedId: number) => setWarnFeedIds([...warnFeedIds, feedId])

    return (
        <MainContainer>
            <Logo style={{position: 'relative', marginBottom: '20px'}}>WISH</Logo>
            {
                filteredData.map(feed => (
                    <FeedCard key={feed.id} feed={feed} warnFeed={warnFeed}/>
                ))
            }
        </MainContainer>
    )
}

const NoFeedPage = () => {

    const goToAlarmPage = () => {
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