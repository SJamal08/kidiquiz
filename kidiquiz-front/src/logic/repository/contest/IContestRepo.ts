import { Contest, ContestPayload } from "../../model/Contest";

export interface IContestRepo {
    create( contest: ContestPayload): Promise<Contest>;
    getAll(): Promise<Contest[]>;
    getById(id: number): Promise<Contest | undefined>;
    update(id: number , contest: ContestPayload): Promise<Contest | undefined>;
    delete(id: number): Promise<boolean>;
}