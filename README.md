# APP

GymPass Style app.

# Requisitos Funcionais (O que o usuário pode fazer)

Deve ser possivel:
- [ ] se cadastrar;
- [ ] se autenticar;
- [ ] obter o perfil de um usuário logado;
- [ ] obter o numero de check-ins realizados peo usuário logado;
- [ ] o usuário obter seu histórico de check-ins;
- [ ] o usuário buscar academias próximas;
- [ ] o usuário buscar academias pelo nome;
- [ ] o usuário realizar check-in em uma academia;
- [ ] validar o check-in de um usuário;
- [ ] cadastrar uma academia;

# Regras de negócio (quais as condições da funcionalidade)

- [ ] O usuário não deve poder se cadatrar com um e-mail duplicado;
- [ ] O usuario nao pode fazer 2 check-ins no mesmo dia;
- [ ] O usuario nao pode fazer check-in se nao estiver perto (100m) da academia;
- [ ] O check-in só pode ser validado ate 20 minutos após criado;
- [ ] O check-in so pode ser validado por adms;
- [ ] A academia so pode ser cadastrada por adms;

# Requisitos Não-Funcionais (nao partem do cliente, técnicos)

- [ ] A senha do usuario precisa estar criptografada;
- [ ] Os dados da aplicacao precisam estar persistidos em um banco PostgreSQL;
- [ ] Todas as listas de dados precisam estar paginadas com 20 itens por pagina;
- [ ] O usuario deve ser identificado por um JWT (JSON Web Token);