import { UserType } from "../types/user";
import useSyncWebData from "./useSyncWebData";

const USER_ATOM_KEY = 'userState';
const USER_INFO_KEY = 'userInfo';

const useUser = () => {
    const [userData, updateUserData] = useSyncWebData<UserType>(USER_ATOM_KEY, USER_INFO_KEY, null);
    return [userData, updateUserData] as const;
};

export default useUser;