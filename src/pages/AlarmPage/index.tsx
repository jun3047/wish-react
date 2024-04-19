import styled from '@emotion/styled'
import { UserType } from '../../types/user';
import { MainContainer, NoPageContainer, NoText } from '../HomePage';
import AlarmBox from '../../components/AlarmBox';
import MainBtn from '../../components/MainBtn';
import handleNative from '../../native';
import { trackEvent } from '../../apis/logging/amplitude';

export default function AlarmPage ({
    user,
    setUser
}:{
    user: UserType,
    setUser: (user: UserType) => void
}) {

    if(user.alarms.length === 0) return <NoAlarmPage />

    return (
        <AlarmContainer>
            <AlarmBigText>알람</AlarmBigText>
            <MainBtn onClick={() => {

                trackEvent('click_showWho')
                handleNative('진동')
                
                const res = window.confirm('확인을 위해 wish 공식 인스타로 이동합니다')
                if(!res) return;

                trackEvent('click_Insta')
                handleNative('인스타프로필', 'wishappteam')
            }}>누군지 확인하기</MainBtn>
            {
                user.alarms.map((alarm, index) => (
                    <AlarmBox
                        user={user}
                        key={index}
                        alarm={alarm}
                    />
                ))
            }
        </AlarmContainer>
    );
}

const NoAlarmPage = () => {
    return (
        <NoPageContainer>
            <NoText>아직 알람이 없어요 😭</NoText>
        </NoPageContainer>
    )
}

const AlarmContainer = styled(MainContainer)`
    padding: 20px 20px calc(3% + 90px) 20px;
    overflow-y: scroll;
`

const AlarmBigText = styled.h2`
    font-size: 2rem;
    font-weight: 600;
    width: 100%;
    text-align: start;
    color: white;
    margin-bottom: 20px;
`