import { SimpleUserType, UserType } from "../types/user";

type RelationType = 'me' | 'friend' | 'none' | 'request' | 'recive'
type IGetRelationById = (user: UserType, targetUser: SimpleUserType) => RelationType

const getRelationById: IGetRelationById = (user, targetUser) => {

    const isSame = (friend: SimpleUserType) => targetUser.id === friend.id

    if(user.id === targetUser.id) return 'me'
    if(user.friends.find(isSame)) return 'friend'
    if(user.requestFriends.find(isSame)) return 'request'
    if(user.receivedFriends.find(isSame)) return 'recive'
    return 'none'
}

export default getRelationById