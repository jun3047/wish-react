import styled from '@emotion/styled'
import useUser from '../../hooks/useUser';

export default function FriendPage () {

    const [user, setUser] = useUser()

    if(!user) return <Logo>대기중</Logo>
    
    return (
        <MainContainer>
            <Logo>{user.age}</Logo>
            <Logo>친구</Logo>
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