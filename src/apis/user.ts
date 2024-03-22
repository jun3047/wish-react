import { AxiosResponse } from 'axios';
import { request } from './';
import { UserType } from '../types/user';

interface UserApiType {
  register: (userInfo: 
    Omit<UserType, 'id'| 'feedIds'| 'friends'>
    ) => Promise<AxiosResponse<{id: number}>>;
  getUser: (id: number) => Promise<AxiosResponse<UserType>>;
}

const userApi: UserApiType = {
  register: userInfo => request.post('/user', userInfo),
  getUser: id => request.get(`/user/${id}`)
};

export default userApi;