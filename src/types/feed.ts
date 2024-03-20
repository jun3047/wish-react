import { FeedUserType } from "./user";

export type FeedType = {
    id: number;
    question: string;
    imgUrl: string;
    warnUserIds: number[];
    writer: FeedUserType;
    asker: FeedUserType;
    time: string;
}