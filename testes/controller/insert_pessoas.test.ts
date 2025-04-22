// @ts-nocheck

import PessoasController from "../../src/controller/pessoas_controller"
import { Request, Response } from "express"
import PrismaRepository from "../../src/repository/prismaClient"  // Importando o repositório real

describe("Inserts in PessoasController", () => {

    let repository: PrismaRepository
    let controller: PessoasController
    let req: Request
    let res: Response

    // Constantes definidas no início
    const CREATED_STATUS = 201
    const ERROR_STATUS = 400
    const CREATED_MESSAGE = `undefined/pessoas`
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

    describe("1 - should return 200 when pessoa is successfully created", () => {
        it("should return 200", async () => {
            req.body = {
                apelido: "Samuel",
                nome: "Samuel Oliveira",
                nascimento: "1999-04-01",
                stack: ["c#", "node"],
            }

            await controller.createNew(req, res)
            expect(res.status).toHaveBeenCalledWith(CREATED_STATUS)
        })
    })

    describe("3 - should return error when apelido is already taken", () => {
        it("should return 404 for duplicate apelido", async () => {
            req.body = {
                apelido: "Samuel-Sussegado",
                nome: "Samuel Oliveira",
                nascimento: "1999-04-01",
                stack: ["c#", "node"]            
            }
            await controller.createNew(req, res)

            await controller.createNew(req, res)
            expect(res.status).toHaveBeenCalledWith(ERROR_STATUS)
        })
    })

    describe("4 - should return 404 when nome is null", () => {
        it("should return 404 for null nome", async () => {
            req.body = {
                apelido: "byPrisma",
                nome: null,  // nome é null, deve falhar
                nascimento: "1999-01-04",
                stack: null
            }

            await controller.createNew(req, res)
            expect(res.status).toHaveBeenCalledWith(ERROR_STATUS)
        })
    })

    describe("5 - should return 404 when apelido is null", () => {
        it("should return 404 for null apelido", async () => {
            req.body = {
                apelido: null, // Apelido não pode ser null
                nome: "Ana Barbosa",
                nascimento: "1985-01-23",
                stack: null
            }

            await controller.createNew(req, res)
            expect(res.status).toHaveBeenCalledWith(ERROR_STATUS)
        })
    })

    describe("6 - should return 404 when nome is a number.", () => {
        it("should return 404 for number in name", async () => {
            req.body = {
                apelido: "Samuel1",
                nome: 1,
                nascimento: "1999-04-01",
                stack: ["c#", "node"]
            }

            await controller.createNew(req, res)
            expect(res.status).toHaveBeenCalledWith(ERROR_STATUS)
        })
    })

    describe("7 - should return 404 when some of stacks is a number.", () => {
        it("should return 404 for number in stack", async () => {
            req.body = {
                apelido: "Samuel1",
                nome: "Samuel Araujo",
                nascimento: "1999-04-01",
                stack: [1, "node"]
            }

            await controller.createNew(req, res)
            expect(res.status).toHaveBeenCalledWith(ERROR_STATUS)
        })
    })
})
