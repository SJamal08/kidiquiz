import { Contest, ContestPayload } from "../../model/Contest";
import { IContestRepo } from "./IContestRepo";

export class InMemoryContestRepo implements IContestRepo {

    public contests: Contest []
    constructor() {
        this.contests = []
    }
    async create(contestPayload: ContestPayload): Promise<Contest> {

        let array = [...this.contests];

        const id = array.length + 1;
        const newContest: Contest = {id, ...contestPayload};
        try {
            array.push(newContest);
            this.contests = array;
            console.log("New quiz added to the list", array);
        } catch (error) {
            console.error("Error pushing new quiz to list:", error);
        }
        return Promise.resolve(newContest);
    }
    async getAll(): Promise<Contest[]> {
        return Promise.resolve(this.contests);
    }
    getById(id: number): Promise<Contest | undefined> {
        throw new Error("Method not implemented.");
    }
    async update(id: number, contest: ContestPayload): Promise<Contest | undefined> {
        try {
          console.log("Starting update operation");
  
          const contestsCopy = JSON.parse(JSON.stringify(this.contests));
  
          const index = contestsCopy.findIndex((q: Contest) => q.id === id);
          console.log("Index found:", index);
  
          if (index === -1) {
              console.log("Contest with the given id not found");
              return Promise.resolve(undefined);
          }
  
          const contestUpdated: Contest = { id, ...contest } as Contest;
          console.log("Updated Contest:", contestUpdated);
  
          contestsCopy[index] = contestUpdated;
  
          this.contests = contestsCopy;
  
          console.log("Updated Contest in list:", this.contests[index]);
  
          return Promise.resolve(contestUpdated);
      } catch (error) {
          console.error("Error in update operation:", error);
          return Promise.resolve(undefined);
      }
      }
    delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}