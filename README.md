# APP
GymPass Style app.

# Requisitos Funcionais (O que o usuário pode fazer)

Deve ser possivel:
- [x] se cadastrar;
- [x] se autenticar;
- [x] obter o perfil de um usuário logado;
- [x] obter o numero de check-ins realizados pelo usuário logado;
- [x] o usuário obter seu histórico de check-ins;
- [x] o usuário buscar academias próximas;
- [x] o usuário buscar academias pelo nome;
- [x] o usuário realizar check-in em uma academia;
- [x] validar o check-in de um usuário;
- [x] cadastrar uma academia;

# Regras de negócio (quais as condições da funcionalidade)

- [x] O usuário não deve poder se cadatrar com um e-mail duplicado;
- [x] O usuario nao pode fazer 2 check-ins no mesmo dia;
- [x] O usuario nao pode fazer check-in se nao estiver perto (100m) da academia;
- [x] O check-in só pode ser validado ate 20 minutos após criado;
- [x] O check-in so pode ser validado por adms;
- [x] A academia so pode ser cadastrada por adms;

# Requisitos Não-Funcionais (nao partem do cliente, técnicos)

- [x] A senha do usuario precisa estar criptografada;
- [x] Os dados da aplicacao precisam estar persistidos em um banco PostgreSQL;
- [x] Todas as listas de dados precisam estar paginadas com 20 itens por pagina;
- [x] O usuario deve ser identificado por um JWT (JSON Web Token);