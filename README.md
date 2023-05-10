# API-NODE
API Projetada para rodar em plataforma Node >= 18.*.

Recomenda-se utilizar o NVM para fazer o switch para a versão correta/testada do node presente no arquivo .nvmrc deste projeto.
## Como executar:
```
npm install
npm start
```

Para executar em modo debug:
```
npm run dev
```

## Rotas disponíveis:
* **GET** _/departamentos_: lista todos departamentos.
* **POST** _/departamentos_: adiciona um departamento.
* **PUT** _/departamentos/:idDepartamento_: atualiza um departamento.
* **DELETE** _/departamentos/:idDepartamento_: remove um departamento.
* **GET** _/departamentos/:idDepartamento_: lista UM departamento específico.

## Banco de Dados
Utilize um banco de dados MySQL (você pode usar o XAMPP) e importe a estrutura do arquivo SQL do diretório [SQL](/nodejs-be/api-node/sql/dump-empresa.sql) deste projeto.

## Acesso ao banco de dados
Este projeto utiliza o "dotenv" para ler do ambiente as variáveis de conexão do banco de dados. Portanto, é necessário criar dentro do diretório raiz desta aplicação um arquivo '.env' e popular as variáveis conforme sintaxe a seguir:

```
DB_HOST=""
DB_USER=""
DB_PASS=""
DB_NAME=""
```

## Swagger
Acesse o Swagger para ver as rotas e realizar os testes da API:
```
http://localhost:3030/swagger-ui
```

