import { Router, Request, Response } from "express";
import PessoasController from "../controller/pessoas_controller";
import { IRepository } from "../interfaces/irepository";

class RouterPessoas {
    private router: Router;
    private pessoasController: PessoasController;

    constructor(repository: IRepository) {
        this.router = Router();
        this.pessoasController = new PessoasController(repository);

        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post("/pessoas", (req: Request, res: Response) => {
            this.pessoasController.createNew(req, res);
        });

        this.router.get("/pessoas/:id", (req: Request, res: Response) => {
            this.pessoasController.getPessoaById(req, res);
        });

        this.router.get("/pessoas", (req: Request, res: Response) => {
            this.pessoasController.getPessoaByTerm(req, res);
        });

        this.router.get("/contagem-pessoas", (req: Request, res: Response) => {
            this.pessoasController.getCountPessoas(req, res);
        });
    }

    public getRouter() {
        return this.router;
    }
}

export default RouterPessoas;
