import styled from "@emotion/styled";
import React from "react";

const MainBtn = ({children, onClick}:{
    children: React.ReactNode,
    onClick?: () => void
}) => {

    return (
        <MainBtnContainer onClick={onClick}>
            <MainBtnText>{children}</MainBtnText>
        </MainBtnContainer>
    )
}

const MainBtnContainer = styled.div`

    position: fixed;
    bottom: 3%;

    min-width: 80%;
    height: 50px;

    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    color: #000000;

    font-size: 1.5rem;
    font-weight: 900;

    border-radius: 40px;
    margin: 1rem;
    padding: 1rem;
    transition: 0.2s;

    cursor: pointer;
    &:hover {
        opacity: 0.7;
    }
`

const MainBtnText = styled.div`
    font-size: 1.5rem;
    font-weight: 900;
    color: #000000;
`


export default MainBtn