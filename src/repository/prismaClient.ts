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

    public getById = async (paramid:string):Promise<IEntitie | null> => {
        if (stringIsNullOrWhiteSpace(paramid))
            throw new Error(`ID informado é inválido: ${paramid}`)

        try{
            console.log("paramid: "+paramid)
            const pessoa = iEntitieFactory(
                await this.prisma.pessoa.findFirst({
                    where: {
                        id: paramid,
                    }
                })
            )
            console.log("pessoa: "+ pessoa)
            if (!pessoa)
                throw new Error(`Não foram encontrados dados para o parâmetro 'id:${paramid}'`)

            return pessoa
            
        } catch (error) {
            throw error
        }
    } 

    public countEntities(): Promise<number> {
        try {
            return this.prisma.pessoa.count()
        
        } catch (error) {
            throw new Error(`Falha na contagem de dados: ${error}`)
        }
    }

    public getByTerm = async (paramString: string): Promise<IEntitie[] | []> => {
        try {
            const pessoas:IEntitie[] = []
            const entities = await this.prisma.pessoa.findMany({
                where: {
                    termo: {
                        contains: paramString,
                        mode: 'insensitive',
                    }
                }
            })

            entities.forEach((e)=> {
                let p = iEntitieFactory(e)
                if(p) pessoas.push(p)                    
            })
            
            return pessoas
        } catch (error) {
            throw new Error(`Falha ao recuperar dados do banco de dados: ${error}`)
        }
    }

    /**
     * @test-only
     * Executa uma query crua. NÃO usar em produção.
     */
    public runUnsafeQuery = async (param: string): Promise<void> => {
        try{
            await this.prisma.$queryRawUnsafe(param)        
        } catch (error) {
            throw error
        }
    }

    public clearDb = async(): Promise<void> => {
        await this.prisma.pessoa.deleteMany({})
    }
}
