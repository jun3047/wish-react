import { pollState } from "../recoils"
import { useEffect } from "react"
import { useRecoilState } from "recoil"
import { PollType } from "../types/poll";
import randomQuestion from "../pages/HomePage/PollData";
import handleNative from "../native";

const POLL_INFO_KEY = 'pollInfo';
const APP_SYNC_ACTION = '앱동기화';

const usePoll = () => {
    const [poll, setPoll] = useRecoilState(pollState);

    useEffect(() => {
        const loadPollInfo = () => {
            const pollInfo = window.localStorage.getItem(POLL_INFO_KEY);
            if (pollInfo) setPoll(JSON.parse(pollInfo));
        };

        // 다른 웹뷰의 변화를 인식
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === POLL_INFO_KEY) loadPollInfo();
        };

        // 앱의 변화를 인식
        const handleAppMessage = (event: MessageEvent) => {

            if(typeof event.data !== 'string') return;
            
            if(!event.data.startsWith(APP_SYNC_ACTION)) return;

            const appData = JSON.parse(event.data.replace(APP_SYNC_ACTION, ''))

            if(POLL_INFO_KEY in appData){

                const pollData = appData[POLL_INFO_KEY];
                updateData(pollData, true);
            }
        }

        loadPollInfo();

        window.addEventListener('message', handleAppMessage);
        window.addEventListener('storage', handleStorageChange);
        
        return () => {
            window.removeEventListener('message', handleAppMessage);
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const updateData = (pollData: PollType | null, fromApp: boolean = false ) => {
        const pollDataString = JSON.stringify({ pollInfo: pollData });
        window.localStorage.setItem(POLL_INFO_KEY, JSON.stringify(pollData));
        setPoll(pollData);

        if(fromApp) return;

        handleNative(APP_SYNC_ACTION, pollDataString);
    };

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

        alert('투표를 받은 유저는 기본적으로 익명으로 보게 되지만, \n 낮은 확률로 보낸 이의 이름을 확인할 수도 있습니다.')
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