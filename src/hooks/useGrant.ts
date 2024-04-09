import { useEffect, useState } from "react"

// @ts-ignore
const handleNative = (type: string) => window.ReactNativeWebView.postMessage(type);

const GRANT_KEY = 'grant';
const ALARM_GRANT_CHANGE_ACTION = '알람권한변경';

const initValue = true

const useGrant = () => {
    const [alarm, setAlarm] = useState<boolean>(initValue);

    useEffect(() => {
        const loadAlarmInfo = () => {
            const alarmGrant = window.localStorage.getItem(GRANT_KEY);
            if (alarmGrant) {
                setAlarm(JSON.parse(alarmGrant));
            } else {
                setAlarm(initValue);
                window.localStorage.setItem(GRANT_KEY, JSON.stringify({alarm:initValue}));
            }
        };

        loadAlarmInfo();

    }, []);

    const changeAlarmGrant = () => {
        const alarmDataString = JSON.stringify({ alarm: !alarm });
        window.localStorage.setItem(GRANT_KEY, alarmDataString);
        setAlarm(!alarm);
        handleNative(ALARM_GRANT_CHANGE_ACTION);
    };

    return [alarm, changeAlarmGrant] as const;
};

export default useGrant