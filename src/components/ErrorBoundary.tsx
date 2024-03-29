import React from 'react';
import { Logo, MainContainer, NoPageContainer, NoText } from '../pages/HomePage';
import styled from '@emotion/styled';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  isOnline: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  state = {
    hasError: false,
    isOnline: navigator.onLine
  };

  componentDidMount() {
    window.addEventListener('online', this.handleNetworkChange);
    window.addEventListener('offline', this.handleNetworkChange);
  }

  componentWillUnmount() {
    window.removeEventListener('online', this.handleNetworkChange);
    window.removeEventListener('offline', this.handleNetworkChange);
  }

  static getDerivedStateFromError(): State {
    return { hasError: true, isOnline: navigator.onLine };
  }

  handleNetworkChange = () => {
    this.setState({ isOnline: navigator.onLine });
  }

  retry = () => {
    this.setState({ hasError: false });
    window.location.reload();
  }

  renderContent() {
    if (this.state.hasError) {
      return <ErrorPage onRetry={this.retry} />;
    }

    if(!this.state.isOnline) {
      return <NoNetworkPage onRetry={this.retry} />;
    }
    return this.props.children;
  }

  render() {
    return this.renderContent();
  }
}

const NoNetworkPage = ({onRetry}: {
  onRetry: () => void;
}) => {

  return (
      <MainContainer>
          <NoPageContainer>
              <Logo>WISH</Logo>
              <NoText>📡</NoText>
              <NoText></NoText>
              <NoText>네트워크를 연결해주세요</NoText>
              <RetryButton onClick={onRetry}>다시 시도하기</RetryButton>
          </NoPageContainer>  
      </MainContainer>
  )
}

const ErrorPage = ({onRetry}: {
  onRetry: () => void;
}) => {

  return (
      <MainContainer>
          <NoPageContainer>
              <Logo>WISH</Logo>
              <NoText>문제가 생겼어요 🤔</NoText>
              <NoText></NoText>
              <NoText>다시 시작해도 문제가 계속되면</NoText>
              <NoText>문의해주세요 😭</NoText>
              <RetryButton onClick={onRetry}>다시 시도하기</RetryButton>
          </NoPageContainer>  
      </MainContainer>
  )
}

const RetryButton = styled.button`

  position: absolute;
  bottom: 20%;

  border-radius: 5px;
  padding: 10px 20px;
  margin-top: 20px;
  font-size: 16px;
  cursor: pointer;
  color: black;
  font-weight: 400;

  background-color: white;
`

export default ErrorBoundary;