import styled from '@emotion/styled'
import useUser from '../../hooks/useUser';
import handleNative from '../../native';

export default function AlarmPage () {

    const [user, setUser] = useUser()

    if(!user) return <Logo>대기중</Logo>
    
    return (
        <MainContainer>
            <Logo>{user.age}</Logo>
            <Logo>알람</Logo>
            <Logo onClick={()=>{
                const data = {
                    asker: user,
                    writer: user,
                    question: "이런거",
                }
                handleNative('카메라', JSON.stringify(data))
            }}>카메라</Logo>
            <Logo onClick={()=>{
                setUser({...user, age: user.age+1})
            }}>1 상승</Logo>
        </MainContainer>
    );
}

const Logo = styled.div`
    font-size: 2.5rem;
    font-weight: 900;
    color: #ffffff;
`

const SubText = styled.div`
    font-size: 1rem;
    margin-top: 15%;
    margin-bottom: 5%;

    font-weight: 400;
    color: #ffffff;
`

const SubjectText = styled.div`
    font-size: 2rem;
    font-weight: 700;
    color: #ffffff;

    margin-bottom: 10%;
`

const MainContainer = styled.div`
    height: 100vh;
    width: 100vw;

    display: flex;
    flex-direction: column;
    align-items: center;
    color: #000;
`