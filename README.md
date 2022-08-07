# Todolist
## About this project
  This todolist project is an open source backend, I used these technologies:
  - Node.js
  - Serverless Framework
  - Typescript
  - AWS Lambda
  - DynamoDB 
  - Eslint

## How to execute this project
### 1 - install AWS CLI
<p>AWS CLI is required in this project, follow these steps: https://aws.amazon.com/cli/</p>


### 2 - The first step is to configure the file .env

change the .env.dev.yml according your preferences:
```yml
 dynamodb_table: dev_users
 aws_region: sa-east-1
 NODE_ENV: development
 jwt_secret: test

```
### 3 - Download dependencies and start the project
The project use yarn, then:
```ts
yarn // Download dependencies
yarn deploy:dev // deploy to AWS
Obs: It is necessary to create 2 indexes in DynamoDB (email : email-index and sk: sk-index) 
yarn dev // start the project
```
Done, the project is running! Now, start the client-side here: https://github.com/GuilhermeBarroso-sys/todolist-react-ts </strong> <br>
