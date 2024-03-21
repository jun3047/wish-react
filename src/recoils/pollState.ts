import { atom } from 'recoil';
import { PollType } from '../types/poll';

const pollState = atom<PollType|null>({
  key: 'pollState',
  default: null,
});

export default pollState;