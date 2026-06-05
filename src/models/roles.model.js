import { EntitySchema } from "typeorm";

const RoleSchema = new EntitySchema({
  name: "Role", // Nombre de la entidad interna
  tableName: "roles", // Nombre de la tabla en MySQL
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name: {
      type: "varchar",
      unique: true,
    },
  },
  relations: {
    users: {
      // En plural, porque un rol tiene muchos usuarios
      type: "one-to-many",
      target: "User",
      inverseSide: "role", // Apunta a la propiedad 'role' de UserSchema
    },
  },
});

export default RoleSchema;
