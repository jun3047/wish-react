import { AxiosResponse } from 'axios';
import { request } from '.';
import { SimpleUserType } from '../types/user';
import { FeedType } from '../types/feed';

interface FeedApiType {
  postFeed: (feedInfo: 
    Omit<FeedType, 'imgUrl' | 'id' | 'warnUserIds' | 'time'>
    ) => Promise<AxiosResponse<{id: number, imgUrl: string}>>;
  getRecommendFeeds: (userInfo: {
    school?: string;
    schoolLocation?: string;
    friends: SimpleUserType[];
  }) => Promise<AxiosResponse<FeedType[]>>;
  getFeeds: (feedIds: number[]) => Promise<AxiosResponse<FeedType[]>>;
  warnFeed: (userId: number, feedId: number) => Promise<AxiosResponse>;
}

const feedApi: FeedApiType = {
  postFeed: feedInfo => request.post('/feed', feedInfo),
  getRecommendFeeds: userInfo => request.post(`/feed/recommend`, userInfo),
  getFeeds: feedIds => request.post(`/feeds`, feedIds),
  warnFeed: (userId, feedId) => request.put(`/feed/warn`, {userId, feedId})
};

export default feedApi;