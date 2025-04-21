import { PrismaClient } from '../generated/prisma';
import { IRepository } from '../interfaces/irepository'

export default class PrismaRepository implements IRepository
{
    private prisma = new PrismaClient();

    public create = async <T>(model: string, data: T): Promise<void> => {
        try{
            // @ts-ignore
            const result = await this.prisma[model].create({
                data:data,
            })
        
        } catch (error) {
            throw new Error("Falha ao salvar no banco de dados: "+error)
        }
    }
}
