import { useEffect, useState } from "react"
import handleNative from "../native"

const useContacts = () => {

    // TODO: 서버한테 받아오는 거 해야 함

    const [contacts, setContacts] = useState([])

    useEffect(() => {
        handleNative('연락처')

        // 앱의 변화를 인식
        const handleAppMessage = (event: MessageEvent) => {

            if(typeof event.data !== 'string') return;
            if(!event.data.startsWith('연락처')) return;

            const appData = JSON.parse(event.data.replace('연락처', ''))

            alert(appData)

            setContacts(appData)
        }

        window.addEventListener('message', handleAppMessage);
        
        return () => {
            window.removeEventListener('message', handleAppMessage);
        };
    }, [])

    return {contacts}
}

export default useContacts