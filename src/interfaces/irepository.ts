import { IEntitie } from "./ientitie"

export interface IRepository {
    create<T extends IEntitie>(model: string, data: T): Promise<void>
    clearDb():Promise<void>
}
