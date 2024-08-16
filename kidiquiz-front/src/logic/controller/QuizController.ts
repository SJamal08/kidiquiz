import { Quiz, QuizPayload } from "../model/Quiz";
import { InMemoryQuizRepo } from "../repository/quiz/InMemoryQuizRepo";
import { IQuizRepo } from "../repository/quiz/IQuizRepo";

export class QuizController {

    private quizRepo: IQuizRepo;

    constructor(quizRepo: InMemoryQuizRepo) {
        this.quizRepo = quizRepo;
    }

    public async create(quizPayload: QuizPayload) {
        console.log("in controller create quiz");
        return await this.quizRepo.create(quizPayload);
    }

    async getAll(): Promise<Quiz[]> {
        return await this.quizRepo.getAll();
    }
}