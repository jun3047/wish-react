import { useSuspenseQuery } from "@tanstack/react-query"
import { friendApi } from ".."
import { UserType } from "../../types/user"
import useUser from "../../hooks/useUser"
import useContacts from "../../hooks/useContacts"


const useRecommendFriends = (user: UserType) => {

    const { contacts } = useContacts()

    const reqUserInfo: {
        phoneList: string[],
        school?: string,
        schoolLocation?: string,
        friendIds?: number[],
    } = {
        phoneList: contacts,
        school: user.school,
        schoolLocation: user.schoolLocation,
        friendIds: user.friends?.map(friend => friend.id),
    }

    return useSuspenseQuery({
        queryKey: ['getRecommendFriends'],
        queryFn: () => friendApi.getRecommendFriends(reqUserInfo),
        select: (data) => data.data,
    })
}

export default useRecommendFriends