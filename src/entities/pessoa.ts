import { stringIsNullOrWhiteSpace } from "../aid/string_aid"
import { v4 as uuidv4 } from 'uuid'

export default class Pessoa {
    id:string
    apelido: string
    nome: string
    nascimento: Date
    stack?: string[] = []

    constructor(ape: string, name: string, nas: string, stack?: string[]) {
        try {
            this.validateStringOrThrow(ape, 32) 
            this.validateStringOrThrow(name, 100) 
            const data = this.validateAndParseDate(nas)
            if (stack && stack.length > 0){
                this.validateStacksOrThrow(stack, 32) 
                this.stack = stack
            }
            this.id = uuidv4()
            this.apelido = ape
            this.nome = name
            this.nascimento = data

        } catch (err) {
            if (err instanceof Error){
                throw Error(`Erro ao criar Pessoa: ${err.message}`)
            }else{
                throw err
            }
        }
    }

    private validateStringOrThrow(str: string, maxLength: number): void {
        if (stringIsNullOrWhiteSpace(str) || str.length > maxLength) {
            throw new Error("Não há dados no texto informado.")
        }
    }

    private validateAndParseDate(str: string): Date {
        const arr = str.split("-")
        if (isNaN(new Date(str).getTime()) || arr[0].length < 4) {
            throw new Error("data de nascimento inválida")
        }
        return new Date(str)
    }

    private validateStacksOrThrow(stack: string[], maxLength: number): void {
        for (let i = 0; i < stack.length; i++) {
            if (stack[i].length > maxLength){
                throw new Error(`Parâmetro maior que o aceitável: length:${maxLength} | string:${stack[i]}`)
            }
        }
    } 

    
    toObjectLiteral() {
        return {
            id: this.id,
            apelido: this.apelido,
            nome: this.nome,
            nascimento: this.nascimento,
            stack: this.stack,
        }
    }
    
    public toString():string 
    {
        return `id:${this.id}\nnome:${this.nome}\nnascimento:${this.nascimento}\nstack:${this.stack??[]}`
    }
    
}
