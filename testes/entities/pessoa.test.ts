// @ts-nocheck
import Pessoa from "../../src/entities/pessoa"

describe("1. Pessoa constructor with valid data", () => {
    it("should create a Pessoa", () => {
        const pessoa = new Pessoa("apelido", "nome", "1990-01-01", ["node", "ts"])
        expect(pessoa.apelido).toBe("apelido")
        expect(pessoa.nome).toBe("nome")
        expect(pessoa.nascimento).toBeInstanceOf(Date)
        expect(pessoa.stack).toEqual(["node", "ts"])
    })
})

describe("2. Pessoa constructor with long apelido", () => {
    it("should throw error", () => {
        expect(() => new Pessoa("a".repeat(33), "nome", "1990-01-01", ["node"])).toThrow()
    })
})

describe("3. Pessoa constructor with long nome", () => {
    it("should throw error", () => {
        expect(() => new Pessoa("apelido", "n".repeat(101), "1990-01-01", ["node"])).toThrow()
    })
})

describe("4. Pessoa constructor with invalid nascimento", () => {
    it("should throw error", () => {
        expect(() => new Pessoa("apelido", "nome", "invalid-date", ["node"])).toThrow()
    })
})

describe("5. Pessoa constructor with wrong date format", () => {
    it("should throw error", () => {
        expect(() => new Pessoa("apelido", "nome", "04-01-1999", ["node"])).toThrow()
    })
})

describe("6. Pessoa constructor with invalid stack item", () => {
    it("should throw error", () => {
        expect(() => new Pessoa("apelido", "nome", "1990-01-01", ["ok", "a".repeat(33)])).toThrow()
    })
})

describe("7. Pessoa constructor with null apelido", () => {
    it("should throw error", () => {
        expect(() => new Pessoa(null, "nome", "1990-01-01", ["node"])).toThrow()
    })
})

describe("8. Pessoa constructor with null nome", () => {
    it("should throw error", () => {
        expect(() => new Pessoa("apelido", null, "1990-01-01", ["node"])).toThrow()
    })
})

describe("9. Pessoa constructor with null nascimento", () => {
    it("should throw error", () => {
        expect(() => new Pessoa("apelido", "nome", null, ["node"])).toThrow()
    })
})

describe("10. Pessoa constructor with null stack", () => {
    it("should pass", () => {
        const pessoa = new Pessoa("apelido", "nome", "1990-01-01", null)
        expect(pessoa.stack).toStrictEqual([])
    })
})

describe("11. Pessoa constructor with stack containing null", () => {
    it("should throw error", () => {
        expect(() => new Pessoa("apelido", "nome", "1990-01-01", [null])).toThrow()
    })
})
