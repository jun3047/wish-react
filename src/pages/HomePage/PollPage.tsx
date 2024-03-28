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

    const [friend, setSelcetedFriend] = useState<SimpleUserType | null>(null);
    const [user, setUser] = useUser()
    const [poll, setPoll, scheduleNextPoll] = usePoll()

    if(!user) return <Logo>대기중</Logo>
    if(!poll) return <Logo>대기중</Logo>

    const pollFriend = (friend: SimpleUserType | null) => {

        if(!friend) return;
        pushApi.poll(makeUserSimple(user), friend.token, poll.question)
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
                    friend={friend}
                    setSelcetedFriend={setSelcetedFriend}
                    user={user}
                />
                <MainBtn onClick={() => pollFriend(friend)}>투표하기</MainBtn>
            </PollPageContainer>
        </MainContainer>
    )
}


const PollButtonGrid = ({
    user,
    friend,
    setSelcetedFriend
}:{
    user: UserType,
    friend: SimpleUserType | null,
    setSelcetedFriend: React.Dispatch<React.SetStateAction<SimpleUserType | null>>
}) => {

    const MaxRefresh = user.friends.length > 12 ? 3 : 
                       user.friends.length > 8 ? 2 : 1

    const [refreshNum, setRefreshNum] = useState<number>(MaxRefresh - 1);

    const nowRefreshIndex = MaxRefresh - (refreshNum + 1)

    return (
        <>
        <GridContainer>
            {
                user.friends.slice(nowRefreshIndex*4, (nowRefreshIndex+1)*4).map((_friend, i)=>(
                    <PollButton
                        key={_friend.id}
                        setSelcetedFriend={setSelcetedFriend}
                        friend={_friend}
                        selectedFriend={friend}
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

const PollButton = ({ friend, setSelcetedFriend, selectedFriend }: { 
    friend: SimpleUserType, 
    setSelcetedFriend: (friend: SimpleUserType) => void,
    selectedFriend: SimpleUserType | null
}) => {

    return selectedFriend?.id === friend.id ? (
        <DisabledButton>
            <Circle />
            {friend.name}
        </DisabledButton>
        ) : (
        <ActiveButton onClick={() => setSelcetedFriend(friend)}>
            <Circle />
            {friend.name}
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


