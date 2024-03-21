import { userState } from "../recoils"
import { useEffect } from "react"
import { useRecoilState } from "recoil"
import { UserType } from "../types/user";

// @ts-ignore
const handleNative = (type: string) => window.ReactNativeWebView.postMessage(type);

const USER_INFO_KEY = 'userInfo';
const APP_SYNC_ACTION = '앱동기화';

const useUser = () => {
    const [user, setUser] = useRecoilState(userState);

    useEffect(() => {
        const loadUserInfo = () => {
            const userInfo = window.localStorage.getItem(USER_INFO_KEY);
            if (userInfo) setUser(JSON.parse(userInfo));
        };

        // 다른 웹뷰의 변화를 인식
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === USER_INFO_KEY) loadUserInfo();
        };

        // 앱의 변화를 인식
        const handleAppMessage = (event: MessageEvent) => {

            if(!event?.data) return;
            if(!event.data.startsWith(APP_SYNC_ACTION)) return;

            const appData = JSON.parse(event.data.replace(APP_SYNC_ACTION, ''))

            if(USER_INFO_KEY in appData && user !== appData[USER_INFO_KEY]){

                const userData = appData[USER_INFO_KEY];
                updateData(userData, true);
            }
        }

        loadUserInfo();

        window.addEventListener('message', handleAppMessage);
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const updateData = (userData: UserType, fromApp: boolean = false ) => {
        const userDataString = JSON.stringify({ userInfo: userData });
        window.localStorage.setItem(USER_INFO_KEY, JSON.stringify(userData));
        setUser(userData);

        if(fromApp) return;

        handleNative(`${APP_SYNC_ACTION}${userDataString}`);
    };

    return [user, updateData] as const;
};

export default useUser