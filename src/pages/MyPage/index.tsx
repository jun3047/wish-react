import styled from '@emotion/styled'
import useUser from '../../hooks/useUser';
import { Logo, MainContainer, NoPageContainer, NoText } from '../HomePage';
import FeedCard from '../../components/FeedCard';
import useFeeds from '../../apis/queries/useFeeds';
import { ReactComponent as OptionIcon } from '../../images/assets/option.svg';
import { Dropdown, MenuProps } from 'antd';
import usePoll from '../../hooks/usePoll';
import handleNative from '../../native';
import useGrant from '../../hooks/useGrant';

export default function MyPage () {

    const [user, setUser] = useUser()
    
    if(!user) return <Logo>대기중</Logo>

    return (
        <MyPageContainer>
            <MyMenu />
            <UserProfile />
            <BigText>{user.name}</BigText>
            <SubBoldGray>@{user.school}</SubBoldGray>
            <ProfileInfoBoxContainer>
                <ProfileInfoBox>
                    <SubBold>{user.feedIds.length}</SubBold>
                    <SubText>게시물</SubText>
                </ProfileInfoBox>
                <ProfileInfoBox>
                    <SubBold>{user.friends.length}</SubBold>
                    <SubText>친구</SubText>
                </ProfileInfoBox>
            </ProfileInfoBoxContainer>
            {
                user.feedIds.length > 0 ?
                <UserFeeds feedIds={user.feedIds} />
                :
                <NoUserFeed />
            }
        </MyPageContainer>
    );
}

const MyPageContainer = styled(MainContainer)`
    padding-bottom: 40px;
`

const UserFeeds = ({feedIds} : {
    feedIds: number[],
}) => {

    const {data} = useFeeds(feedIds)

    return (
        <FeedCardContainer>
        {
            data.map(feed => (
                <FeedCard key={feed.id} feed={feed} />
            ))
        }
        </FeedCardContainer>
    )
}


const MyMenu = () => {
  
    const [user, setUser] = useUser()
    const [poll, setPoll] = usePoll()
    const [alarmGrant, changeAlarmGrant] = useGrant()
  
    if(!user) return null
  
    const items: MenuProps['items'] = [
      {key: '1', label: ( <a onClick={(e) => {
        e.stopPropagation()
        handleNative('인스타프로필', 'wishappteam')
      }}>공식 인스타 방문하기</a> )},
      {key: '2', label: ( <a onClick={(e) => {
        e.stopPropagation()
        changeAlarmGrant()
      }}>알림 {alarmGrant ? '끄기' : '켜기'}</a> )},
      {key: '3', label: ( <a onClick={(e) => {
            e.stopPropagation()
            handleNative('이용약관')
      }}>약관보기</a> )},
      {key: '4', label: ( <a onClick={(e) => {
            e.stopPropagation()
            alert('아래 이메일로 문의해주세요\njungjun3047@naver.com')
      }}>문의하기</a> )},
      {key: '5', label: ( <a onClick={(e) => {
        e.stopPropagation()

        const res = window.confirm('정말 탈퇴하시겠습니까? \n 되돌릴 수 없습니다')

        if(!res) return

        setUser(null)
        setPoll(null)
        window.localStorage.removeItem('grant')
        window.localStorage.removeItem('userInfo')
        window.localStorage.removeItem('pollInfo')
        handleNative('초기화')
      }}>탈퇴하기</a> )},
    ]

      return (
        <UserHeader>
          <Dropdown menu={{items}} placement="bottomLeft">
              <OptionIcon onClick={(e) => e.stopPropagation()}/>
          </Dropdown>
        </UserHeader>
      )
  }

const UserHeader = styled.header`
    padding: 15px;
    width: 100%;
    display: flex;
    justify-content: end;
`

const FeedCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding-bottom: 2rem;
`

const NoUserFeed = () => {

    return (
        <CustomNoPage>
            <NoText>아직은 글이 없어요</NoText>
            <NoText>알람에서 글을 올려봐요</NoText>
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