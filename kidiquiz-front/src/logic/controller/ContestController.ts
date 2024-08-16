import { Contest, ContestPayload } from "../model/Contest";
import { IContestRepo } from "../repository/contest/IContestRepo";
import { InMemoryContestRepo } from "../repository/contest/InMemoryContestRepo";

export class ContestController {

    private contestRepo: IContestRepo;

    constructor(contestRepo: InMemoryContestRepo) {
        this.contestRepo = contestRepo
    }

    public async create(contestPayload: ContestPayload) {
        await this.contestRepo.create(contestPayload);
    }

    public async getAll() {
        return await this.contestRepo.getAll();
    }

    async update(id: number, contestPayload: ContestPayload): Promise<Contest | undefined> {
        console.log("update in controller");
        return await this.contestRepo.update(id, contestPayload);
      }
}