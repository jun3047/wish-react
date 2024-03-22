import { useSuspenseQuery } from "@tanstack/react-query"
import userApi from "../user"


const useProfile = (id: string) => {
    return useSuspenseQuery({
        queryKey: ['getUser'],
        queryFn: () => userApi.getUser(parseInt(id)),
        select: (data) => data.data,
    })
}

export default useProfile