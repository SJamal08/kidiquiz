export interface Question {
    id: number;
    wording: string;
    options: string [];
    answer: string;
}

export interface QuestionPayload {
    wording: string;
    options: string [];
    answer: string;
}