import styled from '@emotion/styled'
import useUser from '../../hooks/useUser';
import { friendApi, userApi } from '../../apis';
import { useEffect, useState } from 'react';
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from 'react-router-dom';
import useProfile from '../../apis/queries/useProfile';
import { Logo, MainContainer, NoPageContainer, NoText } from '../HomePage';
import FeedCard from '../../components/FeedCard';
import { FeedType } from '../../types/feed';
import makeUserSimple from '../../utils/makeUserSimple';
import { UserType } from '../../types/user';
import useFeeds from '../../apis/queries/useFeeds';
import MainBtn from '../../components/MainBtn';

export default function ProfilePage () {

    const [user, setUser] = useUser()
    const [warnFeedIds, setWarnFeedIds] = useState<number[]>([])
    const { id } = useParams() as {id: string}
    
    const {data} = useProfile(id)

    const warnFeed = (feedId: number) => {
        setWarnFeedIds([...warnFeedIds, feedId])
    }
    
    if(!user) return <Logo>대기중</Logo>

    const IsFriend = user.friends.find(friend => friend.id === parseInt(id)) !== undefined
    
    return (
        <MainContainer>
            <UserProfile />
            <BigText>{data.name}</BigText>
            <SubBoldGray>@{data.school}</SubBoldGray>
            <ProfileInfoBoxContainer>
                <ProfileInfoBox>
                    <SubBold>{data.feedIds.length}</SubBold>
                    <SubText>게시물</SubText>
                </ProfileInfoBox>
                <ProfileInfoBox>
                    <SubBold>{data.friends.length}</SubBold>
                    <SubText>친구</SubText>
                </ProfileInfoBox>
            </ProfileInfoBoxContainer>
            {
                IsFriend ?
                data.feedIds?.length ?
                <UserFeeds 
                    user={user}
                    warnFeedIds={warnFeedIds}
                    warnFeed={warnFeed} 
                    feedIds={data.feedIds}
                />
                :
                <NoUserFeed />
                :
                <AddFriend />
            }
        </MainContainer>
    );
}

const UserFeeds = ({feedIds, warnFeed, warnFeedIds, user} : {
    feedIds: number[],
    warnFeed: (feedId: number) => void,
    warnFeedIds: number[],
    user: UserType
}) => {

    const {data} = useFeeds(feedIds)

    const filteredData = data.filter(feed => 
        !warnFeedIds.includes(feed.id) &&
        feed.writer.id !== user.id &&
        (feed.warnUserIds.length === 0 || !(feed.warnUserIds as number[]).includes(user.id))
    )

    return (
        <>
        {
            filteredData.map(feed => (
                <FeedCard warnFeed={warnFeed} key={feed.id} feed={feed} />
            ))
        }
        </>
    )
}

const NoUserFeed = () => {

    return (
        <CustomNoPage>
            <NoText>아직은 글이 없어요</NoText>
            <NoText>이 친구를 투표해봐요</NoText>
        </CustomNoPage>
    )
}

const AddFriend = () => {

    return (
        <CustomNoPage>
            <NoText>친구가 되면 볼 수 있어요</NoText>
            <MainBtn>친구 추가</MainBtn>
        </CustomNoPage>
    )
}

const CustomNoPage = styled(NoPageContainer)`
    padding-bottom: 20%;
`

const ProfileInfoBoxContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`

const ProfileInfoBox = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 2rem 0;
`

const UserProfile = styled.div`
    background-color: #767676;
    width: 24%;
    aspect-ratio: 1;
    border-radius: 50%;
    margin-bottom: 1rem;
`

const BigText = styled.p`
    font-size: 2rem;
    font-weight: 700;
    color: #ffffff;
`

const SubText = styled.p`
    font-size: 1rem;
    font-weight: 400;
    color: #ffffff;
`

const SubBold = styled(SubText)`
    font-weight: 700;
`

const SubBoldGray = styled(SubBold)`
    color: #767676;
`