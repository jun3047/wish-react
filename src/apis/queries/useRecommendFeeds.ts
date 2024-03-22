import { useSuspenseQuery } from "@tanstack/react-query"
import { feedApi } from ".."
import { SimpleUserType, UserType } from "../../types/user"


const useRecommendFeeds = (user: UserType) => {

    const reqUserInfo: {
        school?: string | undefined,
        schoolLocation?: string | undefined,
        friends: SimpleUserType[],
    } = {
        school: user.school,
        schoolLocation: user.schoolLocation,
        friends: user.friends ?? [],
    }

    return useSuspenseQuery({
        queryKey: ['getRecommendFeeds'],
        queryFn: () => feedApi.getRecommendFeeds(reqUserInfo),
        select: (data) => data.data,
    })
}

export default useRecommendFeeds