import { IRepository } from "../interfaces/irepository"
import { Client } from "pg"
import dotenv from 'dotenv'
import Pessoa from "../entities/pessoa"
import { IEntitie } from "../interfaces/ientitie"
import { stringIsNullOrWhiteSpace } from "../aid/string_aid"
import iEntitieFactory from "../factorys/ientitie_factory"

dotenv.config()

export default class PsRawRepository implements IRepository
{
    private client: Client
    private table:string = "rinha_backend.pessoa"
    private secall:string = "id, apelido, nome, nascimento, stack"

    constructor() {
        console.log(process.env.DATABASE_URL)
        this.client = new Client({
            connectionString: process.env.DATABASE_URL,
        })
    }

    public create = async <T>(model: string, data: T): Promise<void> => {
        if (data instanceof Pessoa) {
            const query = `
                INSERT INTO ${this.table} (id, apelido, nome, nascimento, stack)
                VALUES ($1, $2, $3, $4, $5)
            `;
    
            try {
                console.log("#")
                const values = [data.id, data.apelido, data.nome, data.nascimento, data.stack];
                console.log("#")
                await this.client.query(query, values);
                console.log("Registro inserido com sucesso.");
            } catch (err) {
                console.error(`Erro ao inserir dados: ${err}`);
            }
        } else {
            console.error("Os dados não são uma instância de Pessoa.");
        }
    };
    

    public getById = async (param:string): Promise<IEntitie|null> => {
        if (stringIsNullOrWhiteSpace(param))
            throw new Error("É necessário fornecer id para consulta.")

        const query = `SELECT ${this.secall} FROM ${this.table} WHERE id='${param}';`

        try {
            return iEntitieFactory(await this.client.query(query))
        } catch (err) {
            throw new Error(`Erro na consulta ao banco de dados: ${err}`)
        }
    }

    public async getByTerm(paramid: string): Promise<IEntitie[] | []> {
        if (stringIsNullOrWhiteSpace(paramid))
            throw new Error("É necessário fornecer id para consulta.");
    
        const query = `SELECT ${this.secall} FROM ${this.table} WHERE termo ILIKE $1`;
    
        const ientities: IEntitie[] = [];
    
        try {
            const result = await this.client.query(query, [`%${paramid}%`]);
            
            if (result.rows.length > 0) {
                for (const r of result.rows) {
                    let ie = iEntitieFactory(r)
                    if (ie != null) ientities.push(ie);
                }
            }
            return ientities;
        } catch (error) {
            // Tratando e logando o erro
            console.error("Erro ao consultar banco de dados:", error);
            throw new Error("Erro ao realizar a consulta no banco de dados.");
        }
    }
    
    public async countEntities(): Promise<number> {
        const res = await this.client.query(
            `SELECT COUNT(*) AS total FROM ${this.table};`
        )

        return parseInt(res.rows[0].total, 10)
    }

    public clearDb = async (): Promise<void> => {
        try {
            await this.client.query(
                `DELETE FROM ${this.table};`
            )
        
        } catch (err) {
            throw new Error(`Erro ao limpar dados: ${err}`)
        } 
    }

    public runUnsafeQuery = async (param: string): Promise<void> => {
        if (stringIsNullOrWhiteSpace(param))
            throw new Error("Não há parâmetros a serem rodados.")

        try {
            await this.client.query(param)
        
        } catch (err) {
            throw new Error(`Erro ao rodar query insegura: ${err}`)
        }
    }

    public close = async (): Promise<void> => {
        await this.client.end()
        console.log("Conexão com o banco de dados encerrada.")
    }
}
