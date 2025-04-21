import { Request, Response } from "express"
import Pessoa from "../entities/pessoa"
import { IRepository } from "../interfaces/irepository"

import { PrismaClient } from '../generated/prisma';


export default class PessoasController
{
    private repository:IRepository

    private prisma = new PrismaClient()

    constructor(repository:IRepository)
    {
        this.repository = repository
    }

    createNew = async(req: Request, res: Response):Promise<void> => {
        const { apelido, nome, nascimento, stack } = req.body
        try {
            console.log("entrou no controller")
            const pessoa = new Pessoa(apelido, nome, nascimento, stack)
            console.log(`objeto lançado no prista: ${pessoa.toString()}`)
            await this.prisma.pessoa.create({data:pessoa.toObjectLiteral()})
            // await this.repository.create("pessoa",pessoa)
            res.status(200).send()
        } 
        catch (error){
            res.status(404).send()
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