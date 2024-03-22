import { pollState } from "../recoils"
import { useEffect } from "react"
import { useRecoilState } from "recoil"
import { PollType } from "../types/poll";

// @ts-ignore
const handleNative = (type: string) => window.ReactNativeWebView.postMessage(type);

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

    const updateData = (pollData: PollType, fromApp: boolean = false ) => {
        const pollDataString = JSON.stringify({ pollInfo: pollData });
        window.localStorage.setItem(POLL_INFO_KEY, JSON.stringify(pollData));
        setPoll(pollData);

        if(fromApp) return;

        handleNative(`${APP_SYNC_ACTION}${pollDataString}`);
    };

    return [poll, updateData] as const;
};

export default usePoll