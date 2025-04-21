// @ts-nocheck

import PessoasController from "../../src/controller/pessoas_controller"
import { Request, Response } from "express"
import PrismaRepository from "../../src/repository/prismaClient"
import { v4 as uuidv4 } from 'uuid'

describe("Gets in PessoasController", () => {

    let repository: PrismaRepository
    let controller: PessoasController
    let req: Request
    let res: Response

    // Constantes definidas no início
    const FIND_STATUS = 200
    const ERROR_STATUS = 400
    const FIND_MESSAGE = `undefined/pessoas`
    const ERROR_MESSAGE = "Erro ao salvar no banco de dados"

    beforeEach(async () => {
        repository = new PrismaRepository()  // Usando o repositório real
        controller = new PessoasController(repository)
        req = {} as Request
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        } as unknown as Response

        await repository.clearDb()
    })

    afterEach(async () => {
        await repository.clearDb()
    })

    describe("1 - should return 200 when pessoa is successfully recover from bd.", () => {
        it("should return 200", async () => {
            const id = "e1d3f72a-1bc6-4f70-a6f7-30b8c29b4e57"
            const apelido = "Samuel"
            const nome = "Samuel Oliveira"
            const nascimento = "1999-04-01"

            await repository.runUnsafeQuery(
                `INSERT INTO "RinhaBackend2023Q3"."Pessoa" (id, apelido, nome, nascimento)
                 VALUES ('${id}', '${apelido}', '${nome}', '${nascimento}')`
            )

            req.params = {
                id: "e1d3f72a-1bc6-4f70-a6f7-30b8c29b4e57"
            }
        
            await controller.getPessoaById(req,res)
            expect(res.status).toHaveBeenCalledWith(FIND_STATUS)
        })
    })

    describe("1 - should return error when pessoa is unsuccessfully recover from bd.", () => {
        it("should return 200", async () => {
            await repository.clearDb()

            req.params = {
                id: "e1d3f72a-1bc6-4f70-a6f7-30b8c29b4e58"
            }
        
            await controller.getPessoaById(req,res)
            expect(res.status).toHaveBeenCalledWith(ERROR_STATUS)
        })
    })

    describe("3 - should return 200 when pessoa is successfully counted.", () => {
        it("should return 200", async () => {
            await repository.clearDb()
            const list = []
            for (let i = 0; i < 10; i++) {
                list.push({
                    id: uuidv4(),
                    apelido: `Samuel ${i}`,
                    nome: "Samuel Oliveira",
                    nascimento: "1999-04-01"
                })
            }            

            for (const c of list)
            {
                await repository.runUnsafeQuery(
                    `INSERT INTO "RinhaBackend2023Q3"."Pessoa" (id, apelido, nome, nascimento)
                     VALUES ('${c.id}', '${c.apelido}', '${c.nome}', '${c.nascimento}')`
                )
            }

            await controller.getCountPessoas(req,res)
            expect(res.send).toHaveBeenCalledWith(10)
        })
    })

})