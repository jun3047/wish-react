import { atom } from 'recoil';
import { UserType } from '../types/user';

const userState = atom<UserType|null>({
  key: 'userState',
  default: null,
});

export default userState;