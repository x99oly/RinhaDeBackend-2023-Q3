# 🧠 Projeto: Rinha de Backend 2023 Q3 (Reprodução Póstuma)

## 🎯 Objetivo

Reproduzir o desafio da Rinha de Backend 2023 (Q3), **não como competição**, mas como exercício de boas práticas, performance e arquitetura. O foco é:

- Manter **organização** e **separação clara de responsabilidades**
- Usar **testes estruturados**
- Aplicar ferramentas reais de mercado (ORM, containerização)
- Estudar performance e deploy com **Docker**

---

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** `v20`
- **TypeScript**
- **Prisma** (ORM)
- **PostgreSQL**

### Testes
- **Jest**
  - Estrutura: múltiplos `describe`, cada um com 1 `it`
  - Organização em pastas por funcionalidade

### Infraestrutura
- **Docker** com dois estágios:
  - `build`: instala deps, gera Prisma, compila TS
  - `production`: copia artefatos e roda com `npm start`
- (Futuro: **Docker Compose** com Nginx e múltiplas instâncias)

---

## ⚙️ Estrutura de Pastas (resumida)

```text
📁 RinhaDeBackend-2023-Q3
│
├── 📁 prisma                # Configuração e migrações do banco (Prisma)
│   ├── schema.prisma
│   └── migrations/
├── 📁 src                   # Código-fonte principal
│   ├── aid/                # Funções auxiliares e utilitárias
│   ├── controller/         # Camada de controle (recebe requisições)
│   ├── entities/           # Tipos e estruturas de dados
│   ├── factorys/           # Instanciadores (injeção de dependências, etc.)
│   ├── generated/          # Arquivos gerados (ex: Prisma client)
│   ├── interfaces/         # Contratos entre camadas
│   ├── repository/         # Acesso ao banco de dados
│   ├── routes/             # Definição das rotas da API
│   └── index.ts            # Entrada principal da aplicação
📁 testes                    # Testes unitários e de integração
│
├── 📁 aid/                  # Testes de funções utilitárias
│   └── ...                 # Ex: validações, helpers, etc.
├── 📁 controller/           # Testes de endpoints
│   ├── get_pessoas.test.ts     # Testa listagem de pessoas
│   └── insert__pessoas.test.ts # Testa criação de pessoas
├── 📁 entities/             # Testes de estruturas e modelos de dados
│   └── ...
├── .dockerignore
├── .env
├── .gitignore
├── dockerfile
├── env.txt                  # Configurações de ambiente para docker
```

## 📦 Considerações Técnicas

### Prisma

O Prisma foi escolhido por diversos motivos:

- Integração simples e direta com TypeScript  
- Muito requisitado no mercado  
- Excelente performance para operações comuns  
- Permite **inserção de SQL puro**, dando maior controle e flexibilidade

No ambiente Docker usamos:

- `npx prisma generate`
- `npx prisma migrate deploy`

---

### Docker

Problemas enfrentados e resolvidos:

- `.env` não era lido → resolvido com `COPY .env .env`  
- Erros com geração do Prisma → evitado ao remover `migrate dev`  
- API roda dentro do container com sucesso  

Próximo passo: configurar exposição correta para acesso via `localhost:3000`

---

## 🤔 Decisões Tomadas

- Organização dos testes por granularidade de responsabilidade  
- Uso de `migrate deploy` para evitar permissões problemáticas no Docker  
- `.dockerignore` configurado para build limpo  
- `docker-compose` e balanceamento ficarão para depois  

---

## ✅ Status Atual

- Projeto builda e roda no Docker  
- API está funcional  
- **Ainda não acessível via `localhost:3000`** — pendente configuração de rede ou porta no Docker  
