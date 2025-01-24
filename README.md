# Proyecto de Gestión de Productos, Carritos, Usuarios y Tickets con Node.js, Express y MongoDB

## Descripción

Este proyecto consiste en un sistema de gestión de productos, usuarios, carritos y tickets de compra, implementado con **Node.js**, **Express**, **MongoDB**, **Mongoose**, **Passport** y **BCrypt**. Además, utiliza **Nodemailer** para recuperación de contraseñas.

## Funcionalidades

Según el tipo de rol asignado para cada usuario existen diferentes funcionalidades dentro de la aplicación:

- **Rol admin:** Crear, actualizar y eliminar productos en el sistema.
- **Rol user:** Crear carritos y agregar productos a los mismos. Comprar carritos.

## Tecnologías

- **Node.js:** Para la ejecución del servidor.
- **Express:** Para la creación de APIs RESTful.
- **MongoDB:** Para la persistencia de datos.
- **Mongoose:** Para interactuar con MongoDB desde el servidor.
- **Passport:** Como estrategia de autenticación.
- **BCrypt:** Para manejo de contraseñas.
- **JsonWebToken:** Para autenticación mediante tokens.
- **Nodemailer:** Para envio de correos electronicos.


## Instalación

Para ejecutar esta aplicación en tu entorno local, sigue los siguientes pasos:

1. **Clona el repositorio:**

`git clone https://github.com/pablojanb/backend-2.git`

2. **Navega a la carpeta del proyecto:**

`cd backend-2`

3. **Instala las dependencias:**

`npm install`

4. **Configura tus variables de entorno:**

`PORT = 8080`
`MONGO = mongodb://localhost:27017/mydb?retryWrites=true&w=majority`
`JWT_SECRET = df83kGSd62Mf8UvgF428JJh8`
`EMAIL_NODEMAILER = my@mail.com`
`PASS_NODEMAILER = xxxx xxxx xxxx xxxx`

5. **Inicia el servidor de desarrollo:**

`npm run dev`