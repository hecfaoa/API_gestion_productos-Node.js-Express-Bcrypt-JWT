import { DataSource } from "typeorm";
import  ProductSchema  from "./models/products.model.js";
import UserSchema from "./models/users.model.js";
import RoleSchema from "./models/roles.model.js";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "127.0.0.1",
    port: 3306,
    username: "root",
    password: "",
    database: "api_auth_typeorm",
    synchronize: false,
    logging: true,
    entities: [ ProductSchema, UserSchema, RoleSchema ],
    subscribers: [],
    migrations: [],
})