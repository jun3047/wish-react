import handleNative from "../native"
import { AlarmType } from "../types/alarm"
import { SimpleUserType } from "../types/user";

interface PushApiType {
    poll: (
      user: SimpleUserType, 
      targetToken: string,
      question: string
    ) => void;
    reqFriend: (
      user: SimpleUserType, 
      targetToken: string,
    ) => void;
    reciveFriend: (
      user: SimpleUserType, 
      targetToken: string,
    ) => void;
  }

const pushApi: PushApiType = {
    poll: (user, targetToken, question) => {

        const alarm: AlarmType = {
            question: question,
            asker: user
        }

        handleNative('푸시', JSON.stringify({pushs: [{
            token: targetToken,
            data: {
                title: '누구가가 당신을 투표했어요',
                body: '어떤 질문일까요?',
                data: {alarm}
            }
        }]}))
    },
    reqFriend: (user, targetToken) => {
        handleNative('푸시', JSON.stringify({pushs: [{
            token: targetToken,
            data: {
                title: '친구 요청이 왔어요',
                body: '어떤 친구일까요?',
                data: {req: user}
            }
        }]}))
    },
    reciveFriend: (user, targetToken) => {
        handleNative('푸시', JSON.stringify({pushs: [{
            token: targetToken,
            data: {
                title: '새로운 친구 생겼어요',
                body: '지금 친구의 글을 확인해봐요',
                data: {beFriend: user}
            }
        }]}))
    },

}

export default pushApi