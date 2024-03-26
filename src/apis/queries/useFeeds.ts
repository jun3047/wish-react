import { useSuspenseQuery } from "@tanstack/react-query"
import feedApi from "../feed"

const useFeeds = (feedIds: number[]) => {
    return useSuspenseQuery({
        queryKey: ['getFeeds'],
        queryFn: () => feedApi.getFeeds(feedIds),
        select: (data) => data.data,
    })
}

export default useFeeds