import dotenv from 'dotenv'
import express from "express"
import RouterPessoas from "./routes/pessoas_router"
// import PrismaRepository from "./repository/prismaClient"
import PsRawRepository  from "./repository/psRawClient"

dotenv.config()

const app = express()
const port = process.env.PORT || 3000
const base_url = process.env.BASE_URL || 'http://envnaorecuperado'
const url = `${base_url}:${port}`

const repository = new PsRawRepository()
// const repository = new PsRawRepository()
const routerPessoas = new RouterPessoas(repository, url)

// midleware para permitir req json
app.use(express.json())
app.use("/", routerPessoas.getRouter())

app.listen(port, ()=> {
    console.log(`Server is running on ${url}`)
})
