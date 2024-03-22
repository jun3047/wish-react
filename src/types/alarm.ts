import { SimpleUserType } from "./user";

export interface AlarmType {
    id: number;
    question: string;
    asker: SimpleUserType;
}