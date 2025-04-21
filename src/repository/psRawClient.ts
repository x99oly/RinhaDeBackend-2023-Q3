import { IRepository } from "../interfaces/irepository"
import { Client } from "pg"
import dotenv from 'dotenv'
import Pessoa from "../entities/pessoa"

dotenv.config()

export default class PsRawRepository implements IRepository {
    private client: Client

    constructor() {
        this.client = new Client({
            connectionString: process.env.DATABASE_URL,
        })
    }

    public create = async <T>(model: string, data: T): Promise<void> => {
        if (data instanceof Pessoa){
            const query = `
            INSERT INTO pessoa (id, apelido, nome, nascimento, stack)
            VALUES ($1, $2, $3, $4, $5)
        `
    
            try {
                const values = [data.id, data.apelido, data.nome, data.nascimento, data.stack]
                await this.client.query(query, values)
                console.log("Registro inserido com sucesso.")
            } catch (err) {
                console.error(`Erro ao inserir dados: ${err}`)
            }
        }

    }

    public createPessoa = async (data: Pessoa): Promise<void> => {
        const query = `
            INSERT INTO pessoa (id, apelido, nome, nascimento, stack)
            VALUES ($1, $2, $3, $4, $5)
        `;
    
        try {
            const values = [data.id, data.apelido, data.nome, data.nascimento, data.stack]
            await this.client.query(query, values)
            console.log("Registro inserido com sucesso.")
        } catch (err) {
            console.error(`Erro ao inserir dados: ${err}`)
        }
    }
    

    public close = async (): Promise<void> => {
        await this.client.end()
        console.log("Conexão com o banco de dados encerrada.")
    }
}
