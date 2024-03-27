import styled from "@emotion/styled"
import { Logo, MainContainer } from "."
import usePoll from "../../hooks/usePoll"
import useUser from "../../hooks/useUser"
import MainBtn from "../../components/MainBtn"
import divideTwoLines from "../../utils/divideTwoLines"
import { SimpleUserType, UserType } from "../../types/user"
import { useEffect, useState } from "react"
import { ReactComponent as RefreshIcon } from '../../images/assets/refresh.svg';
import { pushApi } from "../../apis"
import makeUserSimple from "../../utils/makeUserSimple"

export default function PollPage () {

    const [friendName, setSelcetedName] = useState<string>("");
    const [user, setUser] = useUser()
    const [poll, setPoll, scheduleNextPoll] = usePoll()

    if(!user) return <Logo>대기중</Logo>
    if(!poll) return <Logo>대기중</Logo>

    const pollFriend = (friendName: string) => {

        const targetFriend = user.friends.find(friend => friend.name === friendName)
        if (!targetFriend) return

        pushApi.poll(makeUserSimple(user), targetFriend.token, poll.question)
        scheduleNextPoll()
    }

    return (
        <MainContainer>
            <PollPageContainer>
                <Logo>WISH</Logo>
                <SubText>오늘의 주제</SubText>
                {
                    divideTwoLines(poll.question).map((line, index) => (
                        <SubjectText key={index}>{line}</SubjectText>
                    ))
                }
                <PollButtonGrid
                    friendName={friendName}
                    setSelcetedName={setSelcetedName}
                    user={user}
                />
                <MainBtn onClick={() => pollFriend(friendName)}>투표하기</MainBtn>
            </PollPageContainer>
        </MainContainer>
    )
}


const PollButtonGrid = ({
    user,
    friendName,
    setSelcetedName
}:{
    user: UserType,
    friendName: string,
    setSelcetedName: React.Dispatch<React.SetStateAction<string>>
}) => {

    const MaxRefresh = 3

    const [refreshNum, setRefreshNum] = useState<number>(MaxRefresh - 1);

    // user.friends 대신 테스트로 쓸 것
    const testFriend: Omit<SimpleUserType, 'id' | 'name'> = {
        token: "토큰",
        age: 18,
        phone: "폰번호",
        gender: "남자",
        feedIds: [],
        school: '학교',
        schoolLocation: '학교위치',
    }

    const testFriends = Array.from({length: 12}, (_, i) => ({
        id: i,
        name: `친구${i}`,
        ...testFriend
    }))

    const nowRefreshIndex = MaxRefresh - (refreshNum + 1)

    return (
        <>
        <GridContainer>
            {
                // user.friends
                testFriends.slice(nowRefreshIndex*4, (nowRefreshIndex+1)*4).map((friend, i)=>(
                    <PollButton
                        // key={friend.id}
                        key={i}
                        setSelcetedName={setSelcetedName}
                        name={friend.name}
                        friendName={friendName}
                    />
                ))
            }
        </GridContainer>
        <RefreshButton 
            useRefresh={()=>setRefreshNum(refreshNum-1)} 
            active={refreshNum !== 0}
        />
        </>
    )
}

const PollButton = ({ name, setSelcetedName, friendName }: { 
    name: string, 
    setSelcetedName: (friendName: string) => void,
    friendName: string
}) => {

    return name === friendName ? (
        <DisabledButton>
            <Circle />
            {name}
        </DisabledButton>
        ) : (
        <ActiveButton onClick={() => setSelcetedName(name)}>
            <Circle />
            {name}
        </ActiveButton>
    );
};

type RefreshButtonProps = {
    useRefresh: () => void;
    active: boolean;
};

const StyledRefreshIcon = styled.div<{ active: boolean }>`
  cursor: ${({ active }) => (active ? 'pointer' : 'not-allowed')};
  opacity: ${({ active }) => (active ? 1 : 0.5)};
  transition: opacity 200ms;
  margin: 20px 0;

  &:hover {
    opacity: ${({ active }) => active ? 0.8 : 0.5};
  }
`;

const RefreshButton: React.FC<RefreshButtonProps> = ({ useRefresh, active }) => {
    return (
        <StyledRefreshIcon
            active={active}
            onClick={active ? useRefresh : undefined}>
            <RefreshIcon />
        </StyledRefreshIcon>
    );
};

const PollButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
  text-decoration: none;
  transition: all 100ms linear;
  background-color: #292828;
  border-radius: 1rem;
  cursor: pointer;
  padding-left: 28px;
  padding-right: 28px;
  margin: 5px;
`;

const ActiveButton = styled(PollButtonContainer)`
  &:hover {
    background-color: #3a3a3a;
  }
`;

const DisabledButton = styled(PollButtonContainer)`
  opacity: 0.5;
`;

const Circle = styled.div`
  height: 30px;
  width: 30px;
  margin-right: 20px;
  background-color: #D9D9D9;
  border-radius: 50%;
`;

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
    justify-content: center;
    align-items: center;
    height: 30%;
    max-width: 500px;
    padding-top: 20px;
`;


const PollPageContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const SubText = styled.div`
    font-size: 1.1rem;
    margin-bottom: 5%;

    font-weight: 400;
    color: #ffffff;
`

const SubjectText = styled.div`
    font-size: 2rem;
    font-weight: 700;
    color: #ffffff;
`


