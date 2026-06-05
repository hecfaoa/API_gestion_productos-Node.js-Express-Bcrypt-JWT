import { AppDataSource } from "../database.js";
import jwt from "jsonwebtoken";
import config from "../config.js";
import UserSchema, { comparePassword, encryptPassword } from "../models/users.model.js";
import RoleSchema from "../models/roles.model.js";

export const register = async (req, res) => {
  try {
    const { username, email, password, roleName } = req.body;

    const userRepository = AppDataSource.getRepository(UserSchema);
    const roleRepository = AppDataSource.getRepository(RoleSchema);

    // Verificar si el rol existe
    const role = await roleRepository.findOne({
      where: { name: roleName },
    });

    if (!role) {
      return res.status(400).json({ message: "Role don't found" });
    }

    // Crear el usuario
    const user = userRepository.create({
      username,
      email,
      password: await encryptPassword(password),
      role,
    });

    await userRepository.save(user);

    const token = jwt.sign({ id: user.id }, config.SECRET, { expiresIn: "1h"  });

    console.log("token ",token);
    res.status(201).json({ message: "User registered successfully", user,token:token });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userRepository = AppDataSource.getRepository(UserSchema);

    // Verificar si el usuario existe
    const user = await userRepository.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ message: "User don't found" });
    }

    // Verificar la contraseña (en un caso real, deberías hashear las contraseñas)
    comparePassword(password, user.password).then((isMatch) => {
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid password" });
        }
        const token = jwt.sign({ id: user.id, role: user.role }, config.SECRET, { expiresIn: "1h"  });
        res.status(200).json({ message: "Login successful", user, token });
    });


    
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
