import { ServerUserType } from "./user";

export type AlarmType = {
    id: number;
    question: string;
    asker: ServerUserType;
}