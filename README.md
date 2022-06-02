# Nest SQS Integration

## Description

[Nest](https://github.com/nestjs/nest) SQS integration using [aws-sdk](https://www.npmjs.com/package/aws-sdk), [nest-aws-sdk](https://www.npmjs.com/package/nest-aws-sdk) and [localstack](https://hub.docker.com/r/localstack/localstack) container to simulate environment locally.

The process of creating the queue, sending and receiving messages is done manually through the execution of routes. Import the [collection configuration file](./postman-collection/sqs-integration.postman_collection.json) into Postman for ease of use :)

## Installation

```bash
$ yarn
```

## Configure the env

Duplicate the [.env.common](./.env.common) file and rename it to .env

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev
```

## Running the container

```bash
# create and start the container
$ docker-compose up

# stop and remove the container
$ docker-compose down -v
```

## License

[MIT licensed](LICENSE).
