import { InfiniteQueryObserverResult } from "react-query";
import { useCallback, useEffect, useState } from "react";
import { FeedType } from "../types/feed";
import { FetchNextPageOptions } from "@tanstack/react-query";


interface ObserverTargetProps {
  hasNextPage: boolean | undefined;
  fetchNextPage: () => void
}

const ObserverTarget = ({
    hasNextPage,
    fetchNextPage,
}: ObserverTargetProps) => {

  const { setTarget } = useIntersectionObserver({
    hasNextPage,
    fetchNextPage,
  });

  return (
    <div ref={setTarget} style={{height: "20px"}} />
  )
}

interface IuseIntersectionObserverProps {
    threshold?: number;
    hasNextPage: boolean | undefined;
    fetchNextPage: () => void;
  }


const useIntersectionObserver = ({
    threshold = 0.1,
    hasNextPage,
    fetchNextPage,
  }: IuseIntersectionObserverProps) => {
  
    const [target, setTarget] = useState<HTMLDivElement | null | undefined>(null);
  
    const observerCallback = useCallback<IntersectionObserverCallback>((entries) => {
      entries.forEach((entry) => {

        if (entry.isIntersecting && hasNextPage) {
            fetchNextPage();
        }
      });
    }, [fetchNextPage, hasNextPage]);
    
  
    useEffect(() => {
      if (!target) return;
      
      const observer = new IntersectionObserver(observerCallback, {
        threshold,
      });
      
      observer.observe(target);
      
      return () => observer.unobserve(target);
    }, [observerCallback, threshold, target]);
  
    return { setTarget };
  };

  export default ObserverTarget