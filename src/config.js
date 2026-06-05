export default {
  SECRET: "products-api-secret",
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "1234",
  database: "products_db",
  synchronize: true,
  logging: false,
  entities: ["src/models/**/*.js"],
  migrations: ["src/migrations/**/*.js"],
  subscribers: ["src/subscribers/**/*.js"],
};
