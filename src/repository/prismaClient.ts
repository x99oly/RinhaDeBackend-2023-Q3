import { PrismaClient } from '../generated/prisma'
import { stringIsNullOrWhiteSpace } from '../aid/string_aid'
import { IEntitie } from '../interfaces/ientitie'
import { IRepository } from '../interfaces/irepository'
import iEntitieFactory from '../factorys/ientitie_factory'

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

    public getById = async <T extends IEntitie> (paramid:string):Promise<IEntitie | null> => {
        if (stringIsNullOrWhiteSpace(paramid))
            throw new Error(`ID informado é inválido: ${paramid}`)

        try{
            const pessoa = iEntitieFactory(
                await this.prisma.pessoa.findUnique({
                    where: {
                        id: paramid,
                    }
                })
            )
            if (!pessoa)
                throw new Error(`Não foram encontrados dados para o parâmetro 'id:${paramid}'`)

            return pessoa
            
        } catch (error) {
            throw error
        }
    } 

    public clearDb = async(): Promise<void> => {
        await this.prisma.pessoa.deleteMany({})
    }
}
