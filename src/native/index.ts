declare global {
    interface Window {
        ReactNativeWebView: {
            postMessage: (type: string) => void;
        };
    }
}

// 사용 명세서
// handleNative('앱동기화${JSON.stringify(userInfo)}')
// handleNative('로털푸시${JSON.stringify(Push[])}')
// handleNative('푸시${JSON.stringify(pushs: Push[])}')
// handleNative('앱동기화${JSON.stringify(userInfo)}')
// handleNative('프로필이동${user.id}')
// handleNative('카메라${JSON.stringify(pushs: Push[])}')
// handleNative('알람${JSON.stringify(pushs: Push[])}')
// handleNative('진동')
// handleNative('인스타')

type NativeType = '초기화면' | '탭이동' | '연락처' | '앱동기화' | '로컬푸시' | '푸시' | '프로필이동' | '카메라' | '알람' | '진동' | '인스타'

const handleNative = (type: NativeType, data?: string) => {
    window.ReactNativeWebView.postMessage(type + (data ? data : ''));
}

export default handleNative