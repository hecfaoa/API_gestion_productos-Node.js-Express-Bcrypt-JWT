# 🚀 API de Gestión de Productos con Autenticación yAuthorizacón

## 📌 Descripción

API REST desarrollada en **Node.js, con Express, TypeORM y MySQL** para la gestión de **productos, usuarios y control de accesos**.
Este proyecto permite administrar de forma eficiente un catálogo de productos, incorporando capas avanzadas de seguridad mediante el hash de contraseñas con **Bcrypt**, generación de tokens con **JWT** y un sistema de autorización basado en roles.

---

## 🎯 Problema que resuelve

En las aplicaciones comerciales, proteger los datos sensibles y el inventario es crítico. Esta API permite:

* ✅ Centralizar el catálogo de productos y su disponibilidad.
* ✅ Proteger la información de los usuarios mediante encriptación irreversible.
* ✅ Controlar quién puede alterar el inventario mediante accesos restringidos.
* ✅ Prevenir accesos no autorizados a endpoints administrativos.

---

## ⚙️ Tecnologías utilizadas

* **Node.js**
* **Express**
* **TypeORM**
* **MySQL**
* **Bcrypt** (Hash de contraseñas)
* **JSON Web Tokens (JWT)** (Autenticación y Sesiones)
* **REST API**

---

## 🧠 Arquitectura y enfoque

El proyecto sigue buenas prácticas de desarrollo backend enfocadas en la seguridad y modularidad:

* Separación clara por capas (controladores, rutas, modelos, base de datos).
* Middlewares personalizados para la verificación de tokens y validación de roles de usuario.
* Uso de ORM para mapeo eficiente y seguro de la base de datos, previniendo inyecciones SQL.
* Estructura limpia utilizando módulos modernos de JavaScript (ES Modules).

---

## 🗂️ Estructura del proyecto

```bash
/src
  /controllers
  /libs
  /middlewares
  /models
  /routes
  /db
```

---
## 🔐 Autenticación y Usuarios

* `POST /auth/register` → Registrar un nuevo usuario (encripta la contraseña automáticamente).
* `POST /auth/login`    → Autenticar un usuario y obtener el Token de acceso (JWT).

## 📦 Productos

* `GET /products`        → Obtener el listado de todos los productos disponibles.
* `POST /products`       → Crear un nuevo producto en el catálogo 🔒 *(Requiere rol Admin)*.
* `PUT /products/:id`    → Actualizar la información completa de un producto 🔒 *(Requiere rol Admin)*.
* `PATCH /products/:id`  → Modificar campos específicos de un producto (ej. precio o stock) 🔒 *(Requiere rol Admin)*.
* `DELETE /products/:id` → Eliminar un producto permanentemente del sistema 🔒 *(Requiere rol Admin)*.


## ▶️ Cómo ejecutar el proyecto

### 1. Clonar repositorio

```bash
git clone [https://github.com/hecfaoa/API_gestion_productos-Node.js-Express-Bcrypt-JWT.git](https://github.com/hecfaoa/API_gestion_productos-Node.js-Express-Bcrypt-JWT.git)

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo .env en la raíz del proyecto basándote en el archivo .env.example y completa tus credenciales locales.

### 4. Ejecutar el proyecto

```bash
npm run dev
```

---

## 📈 Resultados

* 📊 Control estricto y seguro sobre el flujo de inventario y catálogo de productos
* 🔒 Almacenamiento seguro de credenciales de usuario mediante hashes criptográficos
* ⚡ API rápida, eficiente y protegida contra accesos no autorizados

---

## 💡 Aprendizajes

* Implementación de flujos de autenticación modernos y seguros utilizando JWT
* Uso de Bcrypt para la protección y encriptación de datos sensibles en la base de datos
* Creación y encadenamiento de Middlewares en Express para el control de accesos basado en roles
* Buenas prácticas de arquitectura backend enfocadas en la seguridad del sistema

---

## 🚀 Mejoras futuras

* 📄 Documentación interactiva de los endpoints con Swagger
* 🧪 Implementación de pruebas unitarias y de integración para las rutas protegidas
* ☁️ Despliegue automatizado en la nube (AWS / Render / Railway)

---

## 👨‍💻 Autor

**Héctor Fabio Olaya Álvarez**

Desarrollador Backend apasionado por Node.js, Express y MySQL. Actualmente explorando la integración de modelos de lenguaje locales y herramientas de desarrollo asistido por IA para crear soluciones de software más eficientes y modernas.

📫 Contacto:

* LinkedIn: www.linkedin.com/in/hector-olaya
* Email: hector.olaya@outlook.com
