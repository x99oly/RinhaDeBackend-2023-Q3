import { Request, Response } from "express"
import { stringIsNullOrWhiteSpace } from "../aid/string_aid"

export default class PessoasController
{
    createNew = async(req: Request, res: Response):Promise<void> => {
        const { apelido, nome, nascimento, stack } = req.body
        if (
            !this.valideString(32,apelido) 
            || !this.valideString(100,nome)
            || !this.valideData(nascimento)
            || !this.valideStacks(32,stack)
        ) res.status(402)

        res.status(200)
    }

    getPessoaById = async(req: Request, res: Response):Promise<void> => {

    }

    getPessoaByTerm = async(req: Request, res: Response):Promise<void> => {
        const termo = req.query.t as string
    }

    getCountPessoas = async(req: Request, res: Response):Promise<void> => {

    }

    valideString( numChars:number, str:string):boolean
    {
        return stringIsNullOrWhiteSpace(str) && str.length <= numChars
    }

    valideData(str:string):boolean
    {
        return isNaN(new Date(str).getTime())
    }

    valideStacks(numChars:number, stack:string[]):boolean
    {
        if(!stack) return true
        if (!Array.isArray(stack)) return false
        if (stack.length == 0 ) return true

        for (const c in stack)
        {
            if (!this.valideString(c,numChars)) return false
        }
        return true
    }
    
}