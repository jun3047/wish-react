import { useEffect } from "react";
import { atom, useRecoilState } from "recoil";

const handleNative = (type: string) => window.ReactNativeWebView.postMessage(type);

const APP_SYNC_ACTION = '앱동기화';

const useSyncWebData = <T>(atomKey: string, storageKey: string, initValue: any) => {

    const state = atom<T|null>({
        key: atomKey,
        default: initValue,
    });

    const [data, setData] = useRecoilState(state);

    useEffect(() => {
        const loadData = () => {
            const storedData = window.localStorage.getItem(storageKey);
            if (storedData) setData(JSON.parse(storedData));
        };

        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === storageKey) loadData();
        };

        const handleAppMessage = (event: MessageEvent) => {
            if(typeof event.data !== 'string') return;
            
            if(!event.data.startsWith(APP_SYNC_ACTION)) return;

            const appData = JSON.parse(event.data.replace(APP_SYNC_ACTION, ''));

            if(storageKey in appData){
                const newData = appData[storageKey];
                updateData(newData, true);
            }
        };

        loadData();

        window.addEventListener('message', handleAppMessage);
        window.addEventListener('storage', handleStorageChange);
        
        return () => {
            window.removeEventListener('message', handleAppMessage);
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const updateData = (newData: T | null, fromApp: boolean = false) => {
        const newDataString = JSON.stringify(newData);
        window.localStorage.setItem(storageKey, newDataString);
        setData(newData);

        if(fromApp) return;

        const newDataObejct = {
            [storageKey]: newData
        };
        handleNative(`${APP_SYNC_ACTION}${JSON.stringify(newDataObejct)}`);
    };

    return [data, updateData] as const;
};

export default useSyncWebData;