# 💎 GraphQL API

API Graphql desenvolvida com JavaScript, Apollo-Server, Express, Knex QueryBuilder e outras libs. Essa API se conecta com outra API Rest que serve dados de usuários e posts de uma suposta rede social e se conecta também a um banco MySql com Knex para obter os comentários de cada post.

Essa API disponibiliza conexão WebSocket através de Subscriptions e serviço de cache de requisições ao banco e a Rest API por meio de dataSources.

Desenvolvida para fins didáticos não deve ser usada em produçao, mas para executa-la localmente siga os passos abaixo:


- Instalar pacotes:
````
$ yarn install
````

- Iniciar API JSON Server de Users e Posts:
````
$ yarn server
````

- Iniciar Apollo Server em modo desenvolvimento:
````
$ yarn dev
````
