module.exports = {
  roots: ["<rootDir>/testes"], // Direciona para a pasta "testes"
  testMatch: ["**/*.test.ts"], // Só executa arquivos .ts
  transform: {
    "^.+\\.ts$": "ts-jest", // Transpila os testes TypeScript
  },
  testPathIgnorePatterns: ["/dist/"], // Ignora a pasta dist
};
