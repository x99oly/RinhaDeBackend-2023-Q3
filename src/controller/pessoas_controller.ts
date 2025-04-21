import { Request, Response } from "express"
import Pessoa from "../entities/pessoa"
import { IRepository } from "../interfaces/irepository"

export default class PessoasController
{
    private repository: IRepository
    private url:string

    constructor(repository: IRepository, url:string)
    {
        this.repository = repository
        this.url = url
    }

    createNew = async (req: Request, res: Response): Promise<void> => {
        const { apelido, nome, nascimento, stack } = req.body
        try {
            const pessoa = new Pessoa(apelido, nome, nascimento, stack)
            await this.repository.create("pessoa", pessoa)
            res.status(201).send(`${this.url}/pessoas/${pessoa.id}`)
        } catch (error) {
            res.status(400).send("Erro ao salvar no banco de dados")
        }
    }

    getPessoaById = async(req: Request, res: Response):Promise<void> => {
        const { id } = req.params

        try{
            
            
        } catch (error) {

        }
    }

    getPessoaByTerm = async(req: Request, res: Response):Promise<void> => {
        const termo = req.query.t as string
    }

    getCountPessoas = async(req: Request, res: Response):Promise<void> => {

    }
    
}