import jwt from "jsonwebtoken";
import config from "../config.js";
import { AppDataSource } from "../database.js";
import UserSchema from "../models/users.model.js";
import RoleSchema from "../models/roles.model.js";

const verifyToken = (req, res, next) => {
  try {
    let token = req.headers["x-access-token"] || req.headers.authorization;

    if (!token) {
      return res.status(403).send({ message: "No token provided." });
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7);
    }

    jwt.verify(token, config.SECRET, async (err, decoded) => {
      if (err) {
        console.log("Error to decodified token:", err);
        return res.status(401).send({ message: "Unauthorized." });
      }

      req.userId = decoded.id;
      const userId = req.userId;

      const userRepository = AppDataSource.getRepository(UserSchema);
      const user = await userRepository.find({ where: { id: userId } });

      if (!user) {
        return res.status(404).send({ message: "User not found." });
      }

      const [{ role_id }] = user;
      req.roleId = role_id;
      next();
    });
  } catch (error) {
    console.error("Error verifying token:", error);
  }
};

const isAuthorized = async (req, res, next) => {
  console.log("USER_ROLE : ", req.roleId);

  try {
    const userRole = req.roleId; // Asegúrate de que el rol esté disponible en el objeto req.user

    const roleRepository = AppDataSource.getRepository(RoleSchema);
      const role = await roleRepository.find({ where: { id: userRole } });

      if (!role) {
        return res.status(404).send({ message: "Role not found." });
      }

      const [{name}]= role;

      switch (name) {
        case "admin":
            next();
          break;
        case "manager":
            next();
          break;
      
        default:
            return res.status(401).send({ message: "Your current role does not have permission to perform this action." }); 
         break;
      }

  } catch (error) {
    console.error("Error verifying authorization:", error);
    return res.status(500).send({ message: "Internal server error." });
  }
};

export { verifyToken, isAuthorized };
