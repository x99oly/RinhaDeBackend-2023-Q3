import { Request, Response } from "express"
import Pessoa from "../entities/pessoa"
export default class PessoasController
{
    createNew = async(req: Request, res: Response):Promise<void> => {
        const { apelido, nome, nascimento, stack } = req.body
        try {
            const pessoa = new Pessoa(apelido, nome, nascimento, stack)
            res.status(200).send()
        } 
        catch (error){
            res.status(402).send()
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