# Todolist
## Sobre o projeto
  Esse projeto é um back-end de uma aplicação todolist. As seguintes tecnologias foram utilizadas:
  - Node.js
  - Serverless Framework
  - Typescript
  - AWS Lambda
  - DynamoDB 
  - Eslint

## Como executar o projeto
### 1 - Configurar AWS CLI
<p>Um dos pré requisitos deste projeto é a AWS CLI, siga esses passos da própria Amazon para realizar a instalação: https://aws.amazon.com/cli/</p>
<p> Depois de instalar AWS CLI, basta realizar a configuração digitando no terminal: </p>

```zsh

aws configure

```
<p> Caso queira um exemplo de configuração, basta seguir esse da própria documentação da Amazon: </p>

```zsh

AWS Access Key ID [None]: AKIAIOSFODNN7EXAMPLE
AWS Secret Access Key [None]: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
Default region name [None]: us-west-2
Default output format [None]: json

```

### 2 - Configurar Variáveis de ambiente
Para executar o projeto, primeiro é preciso configurar o .env.[ambiente desejado]

Para configurar um env de desenvolvimento, configure o .env.dev.yml:
```yml
 dynamodb_table: dev_users
 aws_region: sa-east-1
 NODE_ENV: development
 jwt_secret: test

```
### 3 - Baixar dependências e startar o projeto
Nesse Projeto eu utilizei o yarn, então:
```ts
yarn // Baixar dependências  
yarn deploy:dev // realizar o deploy na AWS
Obs: É necessario criar 2 indexes no DynamoDB (email : email-index e sk: sk-index) 
yarn dev // iniciar o projeto
```

Pronto, o projeto está rodando! <br>
<strong>Caso queira configurar o client-side do projeto entre nesse repositório:  https://github.com/GuilhermeBarroso-sys/todolist-react-ts </strong> <br>
<strong>Caso queira ver o projeto em produção, acesse aqui: https://todo.devgui.info </strong> <br>
 
    
Atenciosamente <br>
Guilherme
