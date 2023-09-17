## Инструкция по развертыванию проекта

1) В начале надо склонировать проект с удаленного репозитория
```bash
$ git clone git@github.com:Miroslau/task-sub-task.git
```

2) После клонирования необходимо удалить папку pgdata

3) Далее нужно установить node modules в папке client и server используя команду

```bash
$ npm install
```

4) Далее нужно запустить docker и выполнить комманду 

```bash
$  docker-compose build 
```
и потом запустить комманду
```bash
$  docker-compose up 
```
(Нужно будет немного подождать, так как в начале бэк будет выкидывать ошибку ERROR [TypeOrmModule] Unable to connect to the database. Retrying.
Но потом он подключиться и вывидет сообщение server started on PORT 5000. После этого можно переходить к 5-му шагу)
5) После того как комманда выполнится создается сервер базы данных куда подключится бэк после его подключения
надо зайти в папку server/.env и в переменной TYPEORM_HOST поставить localhost.
6) Далее надо запустить миграцию с использованием комманды
```bash
$  npm run migration:run
```
7) После всех выполненых комманд можно переходить к проекту
front-end: http://localhost/
swagger: http://localhost/api-docs
