import { PollType } from "../types/poll";
import randomQuestion from "../pages/HomePage/PollData";
import handleNative from "../native";
import { trackEvent } from "../apis/logging/amplitude";
import useSyncData from "./useSyncData";

const POLL_ATOM_KEY = 'pollState';
const POLL_INFO_KEY = 'pollInfo';

const usePoll = () => {
    const [poll, updateData] = useSyncData<PollType>(POLL_ATOM_KEY, POLL_INFO_KEY, null);

    const initPoll = () => {
        const newQuestion = randomQuestion("")
        const newPoll = {
            question: newQuestion,
            nextTime: 0,
        }
        
        const content = JSON.stringify({
            title: '새로운 질문이 도착했어요',
            body: '친구들 중 한명에게 투표해봐요',
            data: {
                pollInfo: newPoll
            }
        })

        handleNative('첫투표로컬푸시', content)

        updateData({
            question: '',
            nextTime: ''
        }, false)

        trackEvent('click_initQ')

        alert('투표를 받은 유저는 기본적으로 익명으로 보게 되지만, 낮은 확률로 보낸 이의 이름을 확인할 수도 있습니다.')
    }

    const scheduleNextPoll = () => {

        if(!poll) return;

        const newQuestion = randomQuestion(poll.question)
        const newPoll = {
            question: newQuestion,
            nextTime: 0,
        }
        
        const content = JSON.stringify({
            title: '새로운 질문이 도착했어요',
            body: '친구들 중 한명에게 투표해봐요',
            data: {
                pollInfo: newPoll
            }
        })

        handleNative('로컬푸시', content)

        updateData({
            question: '',
            nextTime: ''
        }, false)
    }

    return [poll, updateData, scheduleNextPoll, initPoll] as const;
};

export default usePoll