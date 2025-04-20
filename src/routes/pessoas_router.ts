import { Router, Request, Response } from "express"
import PessoasController from "../controller/pessoas_controller"

const RouterPessoas = Router()
const pc = new PessoasController()

RouterPessoas.post("/pessoas", (req:Request,res:Response)=>{
    pc.createNew(req,res)
})

RouterPessoas.get("/pessoas/:id", (req:Request,res:Response)=>{
    pc.getPessoaById(req,res)
})

RouterPessoas.get("/pessoas", (req:Request,res:Response)=>{
    pc.getPessoaByTerm(req,res)
})

RouterPessoas.get("/contagem-pessoas", (req:Request,res:Response)=>{
    pc.getCountPessoas(req,res)
})

export default RouterPessoas