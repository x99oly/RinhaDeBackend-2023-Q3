import { Request, Response } from "express"

export default class PessoasController
{
    createNew = async(req: Request, res: Response):Promise<void> => {
        const { apelido, nome, nascimento, stack } = req.body
        if (!apelido) res.status(402)

        res.status(200)
    }

    getPessoaById = async(req: Request, res: Response):Promise<void> => {

    }

    getPessoaByTerm = async(req: Request, res: Response):Promise<void> => {
        const termo = req.query.t as string
    }

    getCountPessoas = async(req: Request, res: Response):Promise<void> => {

    }
}