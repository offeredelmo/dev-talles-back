<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Pasos para ejecutar la apI
1. Clonar el proyecto
```
  git clone https://github.com/offeredelmo/dev-talles-back.git
```
2. instalar las dependencias del proyecto con
``` 
  npm install 
```
3. Crea un archivo .env, estas son las variables que usaras
```
  DB_PASSWORD=
  DB_NAME=
  DB_HOST=
  DB_PORT=
  DB_USERNAME=
  PORT=
  JWT_SECRET=
``` 
5. Levantar base de datos para dev, ve al archivo ```docker-compose``` y ejecuta el siguiente comando

``` 
docker-compose up -d
```

6.  Por ultimo ejecuta el comando para correr el entorno de pruebas
```
  npm run start:dev
```