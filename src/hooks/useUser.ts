import { UserType } from "../types/user";
import useSyncData from "./useSyncData";

const USER_ATOM_KEY = 'userState';
const USER_INFO_KEY = 'userInfo';

const useUser = () => {
    const [userData, updateUserData] = useSyncData<UserType>(USER_ATOM_KEY, USER_INFO_KEY, null);
    return [userData, updateUserData] as const;
};

export default useUser;