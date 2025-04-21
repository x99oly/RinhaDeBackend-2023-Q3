import express from "express"
import RouterPessoas from "./routes/pessoas_router"
import PrismaRepository from "./repository/prismaClient"

const app = express()
const port = 3000

const repository = new PrismaRepository()
const routerPessoas = new RouterPessoas(repository)

// midleware para permitir req json
app.use(express.json())
app.use("/", routerPessoas.getRouter())

app.listen(port, ()=> {
    console.log(`Server is running on http://localhost:${port}`)
})
