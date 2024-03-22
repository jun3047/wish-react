import styled from '@emotion/styled'
import useUser from '../../hooks/useUser';
import { userApi } from '../../apis';
import { useEffect } from 'react';
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from 'react-router-dom';
import useProfile from '../../apis/queries/useProfile';

export default function ProfilePage () {

    const [user, setUser] = useUser()
    const { id } = useParams() as {id: string}
    
    const {data} = useProfile(id)

    if(!user) return <Logo>대기중</Logo>
    
    return (
        <MainContainer>
            <Logo>친구리스트</Logo>
            <Logo>{data.id}</Logo>
            <Logo>{data.feedIds?.length}</Logo>
            <Logo>{data.school}</Logo>
            <Logo>{data.friends?.length}</Logo>
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