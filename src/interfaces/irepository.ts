import { IEntitie } from "./ientitie"

export interface IRepository {
    create<T extends IEntitie>(model: string, data: T): Promise<void>
    getById<T extends IEntitie>(paramid:string):Promise<IEntitie | null>

    runUnsafeQuery(param:string):Promise<void>
    clearDb():Promise<void>
}
