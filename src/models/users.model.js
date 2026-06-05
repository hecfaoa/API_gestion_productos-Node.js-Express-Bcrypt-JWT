import { EntitySchema } from "typeorm";
import bcrypt from "bcryptjs";

const UserSchema = new EntitySchema({
  name: "User",
  tableName: "users",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    username: {
      type: "varchar",
      unique: true,
    },
    email: {
      type: "varchar",
      unique: true,
    },
    password: {
      type: "varchar",
    },
    role_id: {
      type: "int",
      nullable: true,
    },
    create_at: {
      type: "datetime",
      default: () => "CURRENT_TIMESTAMP",
    },
    update_at: {
      type: "datetime",
      default: () => "CURRENT_TIMESTAMP",
      onUpdate: "CURRENT_TIMESTAMP",
    },
  },
  relations: {
    role: {
      // En singular, porque tendrá un solo rol
      type: "many-to-one",
      target: "Role",
      joinColumn: { name: "role_id" }, // 🔥 Mueve la llave foránea física aquí
      inverseSide: "users",
      onDelete: "SET NULL", //si alguien llega a eliminar un Rol de la tabla roles. Específicamente, SET NULL significa: "Si el rol se borra, no borres al usuario; simplemente limpia su celda dejándola vacía (NULL)".
    },
  },
});

export const encryptPassword = async (password)=> {
  // Aquí podrías implementar un hash de contraseña real usando bcrypt o similar
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

export default UserSchema;
