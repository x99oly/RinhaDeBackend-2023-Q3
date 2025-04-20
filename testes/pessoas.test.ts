import PessoasController from "../src/controller/pessoas_controller"
import { Request, Response } from "express"

describe("PessoasController", ()=> {
    it("should return 402 if apelido is missing", async () => {
        const req = {
            body: {
                nome:"samuel",
                nascimento:"1999-04-01",
                stack: ["c#","node"]
            }
        } as Request

        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        } as unknown as Response

        const controller = new PessoasController()
        await controller.createNew(req,res)

        expect(res.status).toHaveBeenCalledWith(402)
    })
})

