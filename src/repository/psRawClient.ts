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
    private table:string = '"RinhaBackend2023Q3"."Pessoa"'
    private selectall:string = "id, apelido, nome, nascimento, stack"

    constructor() {
        console.log(process.env.DATABASE_URL)
        this.client = new Client({
            connectionString: process.env.DATABASE_URL,
        })
        this.connectToDatabase()
    }

    private async connectToDatabase() {
        try {
            // Tentativa de conexão
            await this.client.connect();
            console.log('Conexão com o banco de dados estabelecida com sucesso!');

        } catch (err) {
            console.error('Erro ao conectar ao banco de dados:', err);
        }
    }

    public create = async <T>(model: string, data: T): Promise<void> => {
        if (data instanceof Pessoa) {
            const query = `
                INSERT INTO ${this.table} (id, apelido, nome, nascimento, stack, termo)
                VALUES ($1, $2, $3, $4, $5, $6)
            `;
    
            try {
                const values = [data.id, data.apelido, data.nome, data.nascimento, data.stack, `'${data.apelido} ${data.nome} ${data.stack.toLocaleString()}'`];

                await this.client.query(query, values);
                console.log("Registro inserido com sucesso.");
            } catch (err) {
                throw new Error(`Erro ao inserir dados: ${err}`);
            }
        } else {
            console.error("Os dados não são uma instância de Pessoa.");
        }
    };
    

    public getById = async (param:string): Promise<IEntitie|null> => {
        if (stringIsNullOrWhiteSpace(param))
            throw new Error("É necessário fornecer id para consulta.")

        const query = `SELECT ${this.selectall} FROM ${this.table} WHERE id='${param}';`

        try {
            const entitie = iEntitieFactory((await this.client.query(query)).rows[0])
            return entitie
        } catch (err) {
            throw new Error(`Erro na consulta ao banco de dados: ${err}`)
        }
    }

    public async getByTerm(paramid: string): Promise<IEntitie[] | []> {
        if (stringIsNullOrWhiteSpace(paramid))
            throw new Error("É necessário fornecer id para consulta.");
    
        const query = `SELECT ${this.selectall} FROM ${this.table} WHERE termo ILIKE '%${paramid}%';`;

        const ientities: IEntitie[] = [];
    
        try {
            const result = await this.client.query(query);
            
            if (result.rows.length > 0) {
                for (const r of result.rows) {
                    let ie = iEntitieFactory(r)
                    if (ie != null) ientities.push(ie);
                }
            }
            return ientities;
        } catch (error) {
            throw new Error("Erro ao realizar a consulta no banco de dados. "+ error);
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
