export interface IRepository {
    create<T>(model: string, data: T): Promise<void>;
}
