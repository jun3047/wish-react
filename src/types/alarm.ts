import { SimpleUserType } from "./user";

export type AlarmType = {
    id: number;
    question: string;
    asker: SimpleUserType;
}