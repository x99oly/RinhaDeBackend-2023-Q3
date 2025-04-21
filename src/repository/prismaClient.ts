import { PrismaClient } from '../generated/prisma'
import { IEntitie } from '../interfaces/ientitie'
import { IRepository } from '../interfaces/irepository'

export default class PrismaRepository implements IRepository {
    private prisma = new PrismaClient()

    public create = async <T extends IEntitie>(model: string, data: T): Promise<void> => {
        if (!(model in this.prisma)){
            throw new Error(`Modelo '${model}' não encontrado no Prisma.`)
        }

        try {
            // @ts-ignore
            const result = await this.prisma[model as keyof PrismaClient].create({
                data: data.toObjectLiteral(),
            })
        } catch (error) {
            throw new Error("Falha ao salvar no banco de dados: " + error)
        }
    }
}
