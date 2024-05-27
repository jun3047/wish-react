import { useState } from 'react';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: React.ReactNode;
}

interface UsePullToRefreshOptions {
  onRefresh: () => Promise<void>;
}

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 4px solid white;
  width: 30px;
  height: 30px;
  animation: ${spin} 1s linear infinite;
`;

// 텍스트와 Spinner를 감싸는 컨테이너
const TextWithSpinnerContainer = styled.div`
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;


const PullToRefreshContainer = ({ onRefresh, children } : PullToRefreshProps) => {

  const { refreshing, handleTouchStart } = usePullToRefresh({
    onRefresh: onRefresh
  });

  return (
    <div style={{ minHeight: '100vh' }} onTouchStart={handleTouchStart}>
      {
        refreshing && 
        <TextWithSpinnerContainer>
          <Spinner />
        </TextWithSpinnerContainer>
      }
      {children}
    </div>
  );
};


const usePullToRefresh = ({ onRefresh }: UsePullToRefreshOptions) => {
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    
    const startTime = Date.now();
    await onRefresh();

    const endTime = Date.now();
    const executionTime = endTime - startTime;
    const additionalTime = Math.max(0, 2000 - executionTime);

    setTimeout(() => {
      setRefreshing(false);
    }, additionalTime);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1 || refreshing) return;
    const touchStartY = e.touches[0].pageY;

    const handleTouchMove = (e: TouchEvent) => {
      const touchCurrentY = e.touches[0].pageY;
      const distance = touchCurrentY - touchStartY;

      if (distance > 0) {
        e.preventDefault();
        if (distance >= 80 && window.scrollY < 0) {
          handleRefresh();
        }
      }
    };

    const handleTouchEnd = () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };

    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
  };

  return {
    refreshing,
    handleTouchStart,
  };
};

export default PullToRefreshContainer;