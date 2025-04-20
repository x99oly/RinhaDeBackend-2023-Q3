import express from "express"
import RouterPessoas from "./routes/pessoas_router"

const app = express()
const port = 3000

// midleware para permitir req json
app.use(express.json())
app.use("/", RouterPessoas)

app.listen(port, ()=> {
    console.log(`Server is running on http://localhost:${port}`)
})
