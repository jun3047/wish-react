import React from 'react';
import { Logo } from '../pages/HomePage';

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
    if (this.state.hasError || !this.state.isOnline) {
      return <Logo>네트워크를 연결해주세요</Logo>;
    }
    return this.props.children;
  }

  render() {
    return this.renderContent();
  }
}

export default ErrorBoundary;