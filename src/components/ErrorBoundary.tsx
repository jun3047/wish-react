import React from 'react';
import { Logo, MainContainer, NoPageContainer, NoText } from '../pages/HomePage';

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

  renderContent() {
    if (this.state.hasError) {
      return <ErrorPage />;
    }

    if(!this.state.isOnline) {
      return <NoNetworkPage />;
    }
    return this.props.children;
  }

  render() {
    return this.renderContent();
  }
}

const NoNetworkPage = () => {

  return (
      <MainContainer>
          <NoPageContainer>
              <Logo>WISH</Logo>
              <NoText>📡</NoText>
              <NoText></NoText>
              <NoText>네트워크를 연결해주세요</NoText>
          </NoPageContainer>  
      </MainContainer>
  )
}

const ErrorPage = () => {

  return (
      <MainContainer>
          <NoPageContainer>
              <Logo>WISH</Logo>
              <NoText>문제가 생겼어요 🤔</NoText>
              <NoText></NoText>
              <NoText>다시 시작해도 문제가 계속되면</NoText>
              <NoText>문의해주세요 😭</NoText>
          </NoPageContainer>  
      </MainContainer>
  )
}

export default ErrorBoundary;