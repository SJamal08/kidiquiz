import { Question, QuestionPayload } from "../model/question";
import { InMemoryQuestionRepo } from "../repository/question/InMemoryQuestionRepo";
import { IQuestionRepo } from "../repository/question/IquestionRepo";

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
        console.log("update in controller");
        return await this.questionRepo.update(id, questionPayload);
      }
      async delete(id: number): Promise<boolean> {
        console.log("we are in controller");
        const result = await this.questionRepo.delete(id);
        console.log("resukt in controller", result);
        return await this.questionRepo.delete(id);
      }
}