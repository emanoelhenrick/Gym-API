# APP

GymPass Style app.

# Requisitos Funcionais (O que o usuário pode fazer)

Deve ser possivel:
- [x] se cadastrar;
- [x] se autenticar;
- [x] obter o perfil de um usuário logado;
- [ ] obter o numero de check-ins realizados peo usuário logado;
- [ ] o usuário obter seu histórico de check-ins;
- [ ] o usuário buscar academias próximas;
- [ ] o usuário buscar academias pelo nome;
- [ ] o usuário realizar check-in em uma academia;
- [ ] validar o check-in de um usuário;
- [ ] cadastrar uma academia;

# Regras de negócio (quais as condições da funcionalidade)

- [x] O usuário não deve poder se cadatrar com um e-mail duplicado;
- [x] O usuario nao pode fazer 2 check-ins no mesmo dia;
- [x] O usuario nao pode fazer check-in se nao estiver perto (100m) da academia;
- [ ] O check-in só pode ser validado ate 20 minutos após criado;
- [ ] O check-in so pode ser validado por adms;
- [ ] A academia so pode ser cadastrada por adms;

# Requisitos Não-Funcionais (nao partem do cliente, técnicos)

- [x] A senha do usuario precisa estar criptografada;
- [x] Os dados da aplicacao precisam estar persistidos em um banco PostgreSQL;
- [ ] Todas as listas de dados precisam estar paginadas com 20 itens por pagina;
- [ ] O usuario deve ser identificado por um JWT (JSON Web Token);

## Conteudos aprendidos
1 - .npmrc para manter as versões das dependencias fixas
2 - Prisma ORM para manipulacao de banco de dados (Migrations, Prisma Studio e relações)
3 - PostgreSQL
4 - Docker e Docker Compose
5 - Vitest (Coverage, UI, Units)
6 - In Memory Database para não precisar bater no banco de dados
7 - Sut com Factory para instanciar classes dentro de testes unitarios
8 - Factory pra instanciar use cases
9 - encriptacao com bcrypt
10 - manipulacao de datas com o dayjs