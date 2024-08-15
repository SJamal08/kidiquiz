import { Question, QuestionPayload } from "../../model/question";

export interface IQuestionRepo {
    create( question: QuestionPayload): Promise<Question>;
    getAll(): Promise<Question[]>;
    getById(id: number): Promise<Question | undefined>;
    update(id: number , question: QuestionPayload): Promise<Question | undefined>;
    delete(id: number): Promise<boolean>;
}