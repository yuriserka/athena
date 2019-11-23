# Athena

[![license](https://img.shields.io/github/license/onwwward/laravel-bugherd.svg?maxAge=2592000)]()

Sistema de busca e ranqueamento de notícias Sala de Situação em Saúde - FS.

## Como instalar?

Primeiramente, clone este repositório com o seguinte comando:

```
git clone https://github.com/yuriserka/athena
```

Em seguida, navegue até a pasta athena:

```
cd athena
```

## Para desenvolvimento

Inicie o servidor:

```
cd api
yarn install
yarn dev
```

Inicie o cliente:

```
cd front
yarn install
yarn serve 
```

## Para Simular a versão final

Gere a versão de distribuição do cliente:

```
cd front
yarn install
yarn build
```

Inicie o servidor que irá servir estáticamente os arquivos gerados:

```
cd api
yarn install
yarn start 
```

# TODO(Docker)
Feito isto, crie a imagem do docker

```
 docker build -t athena .
```

Em seguida, execute a aplicação:

```
 docker run -p 8081:8081 athena
```

## Autores

- [Leonardo Maffei da Silva](https://github.com/maffei2443)
- [Thales Menezes](https://github.com/thaleslim)
- [Yuri Serka do Carmo Rodrigues](https://github.com/yuriserka)

## Tecnologias Utilizadas:

- [Express](https://expressjs.com/pt-br/)
- [VueJS](https://vuejs.org/)
- [Docker](https://www.docker.com/)

## Licença

Este projeto está licenciado sob a licença MIT.
