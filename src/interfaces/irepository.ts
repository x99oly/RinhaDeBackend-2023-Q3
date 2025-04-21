import { IEntitie } from "./ientitie"

export interface IRepository {
    create<T extends IEntitie>(model: string, data: T): Promise<void>
    getById(paramid:string):Promise<IEntitie | null>
    countEntities():Promise<number>

    runUnsafeQuery(param:string):Promise<void>
    clearDb():Promise<void>
}
