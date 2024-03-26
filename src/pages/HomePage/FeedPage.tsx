import styled from "@emotion/styled"
import { Logo, MainContainer, NoPageContainer, NoText } from "."
import useRecommendFeeds from "../../apis/queries/useRecommendFeeds"
import handleNative from "../../native"
import { UserType } from "../../types/user"
import MainBtn from "../../components/MainBtn"
import { FeedType } from "../../types/feed"
import makeUserSimple from "../../utils/MakeUserSimple"
import FeedCard from "../../components/FeedCard"
import { css } from '@emotion/react';

export default function FeedPage ({user}: {user: UserType}) {

    const {data} = useRecommendFeeds(user)

    // orign
    // if(!data.length) return <NoFeedPage />

    const fakeFeed: FeedType = {
        id: 1,
        question: '질문이 들어갈 곳',
        writer: makeUserSimple(user),
        imgUrl: 'https://i.pinimg.com/736x/75/99/23/75992317aaeac57424fb1230bf3c5588.jpg',
        warnUserIds: [],
        asker: makeUserSimple(user),
        time: ""
    }

    const fakeFeeds = Array.from({length: 10}, (_, i) => fakeFeed)

    return (
        <MainContainer>
            <Logo style={{position: 'relative', marginBottom: '20px'}}>WISH</Logo>
            {
                fakeFeeds.map(feed => (
                    <FeedCard key={feed.id} feed={feed} />
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