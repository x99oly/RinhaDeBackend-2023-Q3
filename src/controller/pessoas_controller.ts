import { Request, Response } from "express"
import Pessoa from "../entities/pessoa"
import { IRepository } from "../interfaces/irepository"
import { IEntitie } from "../interfaces/ientitie"
import { stringIsNullOrWhiteSpace } from "../aid/string_aid"

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
            console.log("#")
            const pessoa = new Pessoa(apelido, nome, nascimento, stack)
            console.log("#")
            await this.repository.create("pessoa", pessoa)
            console.log("#")
            res.status(201).send(`${this.url}/pessoas/${pessoa.id}`)

        } catch (error) {
            let errstring
            if (error instanceof Error){
                errstring = error.message
            }
            res.status(400).send(`Falha ao cadastrar dado: ${errstring ?? error}`)
        }
    }

    getPessoaById = async(req: Request, res: Response):Promise<void> => {
        const { id } = req.params

        try{
            const entitie:IEntitie | null = await this.repository.getById(id)
            if (!entitie)
                res.status(200).send([])
            res.status(200).send(entitie?.toObject())
        } catch (error) {
            let errstring
            if (error instanceof Error){
                errstring = error.message
            }
            res.status(400).send(`Falha ao recuperar dado: ${errstring ?? error}`)
        }
    }

    getPessoaByTerm = async(req: Request, res: Response):Promise<void> => {
        const termo = req.query.t as string;
        console.log(termo)
        
        if (stringIsNullOrWhiteSpace(termo))
            res.status(400).send("Não foram enviados parâmetros para a consulta: ")
        
        try {
            const pessoas = await this.repository.getByTerm(termo)
            
            res.status(200).send(pessoas)
        } catch (error) {
            let errString
            if (error instanceof Error) {
                errString = error.message
            }
            res.status(400).send(`Falha ao recuperar dados: ${errString ?? error}`)
        }
    }

    getCountPessoas = async(req: Request, res: Response):Promise<void> => {
        try {
            const total = await this.repository.countEntities()
            res.status(200).send(total)
        } catch (error) {
            let errstring
            if (error instanceof Error){
                errstring = error.message
            }
            res.status(400).send(`Falha na contagem: ${errstring ?? error}`)
        }
    }
    
}