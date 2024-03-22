import { AxiosResponse } from 'axios';
import { request } from '.';
import { SimpleUserType, UserType } from '../types/user';

interface FriendApiType {
  beFriend: (
    user: SimpleUserType, 
    targetUser: SimpleUserType
  ) => Promise<AxiosResponse>;
  getRecommendFriends: (
    userInfo:{
      phoneList: string[],
      school?: string,
      schoolLocation?: string,
      friendIds?: number[],
  }) => Promise<AxiosResponse<SimpleUserType[]>>;
}

const userApi: FriendApiType = {
  beFriend: (user, targetUesr) => request.post('/friend', {user, targetUesr}),
  getRecommendFriends: userInfo => request.post(`/friend/recommend`, userInfo)
};

export default userApi;