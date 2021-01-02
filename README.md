# expressjs-pugjs-mysql-contact-web
Pagina de contactos usando express.js como backend, usando pugjs como motor de plantillas.

![image-muestra](https://github.com/Will2020-cpu/expressjs-pugjs-mysql-contact-web/blob/master/public/images/img.png)

## Scripts disponibles
  En el proyecto puedes correr :
  
### `npm start`
Se abrira el server en el modo desarrollo en https://localhost:3000
usando la libreria nodemon


### `key.js`
Crea tu archivo keys con la informacion de tu base de datos de la siguiente manera

``` javascript
   module.exports ={
      database:{
        host:'localhost',
        user:'tu_user',
        password:'tu_password',
        databse:'tu_databse_name'
      }
   }
```
