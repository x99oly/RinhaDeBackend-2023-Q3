import dotenv from 'dotenv'
import express from "express"
import RouterPessoas from "./routes/pessoas_router"
import PrismaRepository from "./repository/prismaClient"
// import PsRawRepository  from "./repository/psRawClient"

dotenv.config()

const app = express()
const port = process.env.PORT || 3000
const url = `${String(process.env.BASE_URL || "http://localhost")}:${port}`

const repository = new PrismaRepository()
// const repository = new PsRawRepository()
const routerPessoas = new RouterPessoas(repository, url)

// midleware para permitir req json
app.use(express.json())
app.use("/", routerPessoas.getRouter())

app.listen(port, ()=> {
    console.log(`Server is running on ${url}`)
})
