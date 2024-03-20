export type IRequestFriendInfo = {
    token: string;
    gender: "boy" | "girl";
    id: number;
    name: string;
    age: number;
    school: string;
    schoolLocation: string;
    friendIds: number[];
}

export type UserType = {
    id: number;
    token: string;
    name: string;
    age: number;
    phone: string;
    gender: "boy" | "girl";
    friendIds: number[];
    feedIds: number[];
    school?: string;
    schoolLocation?: string;
    requestFriendInfos: IRequestFriendInfo[];
    addFriendIds: number[];
}

export interface FeedUserType {
    id: number;
    name: string;
    token: string;
    age: number;
    school?: string;
    schoolLocation?: string;
}

export interface ServerUserType {
    id: number;
    token: string;
    name: string;
    age: number;
    phone: string;
    gender: "boy" | "girl";
    friendIds: number[];
    feedIds: number[];
    school?: string;
    schoolLocation?: string;
}