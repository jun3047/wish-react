import { useInfiniteQuery, useSuspenseQuery } from "@tanstack/react-query"
import { feedApi } from ".."
import { SimpleUserType, UserType } from "../../types/user"
import { AxiosResponse } from "axios"
import { FeedType } from "../../types/feed"


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

    // return useSuspenseQuery({
    //     queryKey: ['getRecommendFeeds'],
    //     queryFn: () => feedApi.getRecommendFeeds(reqUserInfo),
    //     select: (data) => data.data,
    // })

    return useInfiniteQuery({
            queryKey: ['getRecommendFeeds'],
            queryFn: ({ pageParam }) => feedApi.getRecommendFeeds(reqUserInfo, pageParam),
            initialPageParam: undefined,
            getNextPageParam: getNextPageParam,
            select: (data) => data.pages.flatMap(page => page.data)
    });
}

const getNextPageParam = (lastPage: AxiosResponse<FeedType[], any>) => {
    return lastPage.data.length === 10 ?
        lastPage.data[lastPage.data.length - 1].id:
        undefined
}

export default useRecommendFeeds