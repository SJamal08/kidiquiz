import { Quiz } from "./Quiz";

export interface Contest {
    id: number;
    quiz: Quiz;
    date: string;
    rankedList: Rank[];
}

export interface ContestPayload {
    quiz: Quiz;
    date: string;
    rankedList: Rank[];
}

export interface Rank {
    username: string,
    score: number
}