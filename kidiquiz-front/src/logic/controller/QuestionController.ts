import { InMemoryQuestionRepo } from "../../repository/question/InMemoryQuestionRepo";
import { IQuestionRepo } from "../../repository/question/IquestionRepo";
import { Question, QuestionPayload } from "../model/question";

export class QuestionController {

    private questionRepo: IQuestionRepo;

    constructor(questionRepo: InMemoryQuestionRepo) {
        this.questionRepo = questionRepo;
    }

    public async create(questionPayload: QuestionPayload) {
        await this.questionRepo.create(questionPayload);
    }

    async getAll(): Promise<Question[]> {
        return await this.questionRepo.getAll();
      }
    
      async getById(id: number): Promise<Question | undefined> {
        return await this.questionRepo.getById(id);
      }
    
      async update(id: number, questionPayload: QuestionPayload): Promise<Question | undefined> {
        return await this.questionRepo.update(id, questionPayload);
      }
      async delete(id: number): Promise<boolean> {
        return await this.questionRepo.delete(id);
      }
}