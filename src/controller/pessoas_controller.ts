import { Request, Response } from "express"
import Pessoa from "../entities/pessoa"
import { IRepository } from "../interfaces/irepository"

export default class PessoasController
{
    private repository: IRepository

    constructor(repository: IRepository)
    {
        this.repository = repository
    }

    createNew = async (req: Request, res: Response): Promise<void> => {
        const { apelido, nome, nascimento, stack } = req.body
        try {
            const pessoa = new Pessoa(apelido, nome, nascimento, stack)
            await this.repository.create("pessoa", pessoa)
            res.status(200).send("Pessoa criada com sucesso")
        } catch (error) {
            res.status(404).send("Erro ao salvar no banco de dados")
        }
    }

    getPessoaById = async(req: Request, res: Response):Promise<void> => {

    }

    getPessoaByTerm = async(req: Request, res: Response):Promise<void> => {
        const termo = req.query.t as string
    }

    getCountPessoas = async(req: Request, res: Response):Promise<void> => {

    }
    
}