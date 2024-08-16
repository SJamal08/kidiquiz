import { Quiz, QuizPayload } from "../../model/Quiz";

export interface IQuizRepo {
    create( quizPayload: QuizPayload): Promise<Quiz>;
    getAll(): Promise<Quiz[]>;
    getById(id: number): Promise<Quiz | undefined>;
    update(id: number , quizPayload: QuizPayload): Promise<Quiz | undefined>;
    delete(id: number): Promise<boolean>;
}