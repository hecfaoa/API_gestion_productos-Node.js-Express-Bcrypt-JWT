import { Router } from "express";
import * as usercontroller from "../controllers/users.controller.js";

const router = Router();

router.get("/",     usercontroller.getUsers);
router.get("/:id", usercontroller.getUserById);
/* router.post("/", usercontroller.createUser); */
router.put("/:id", usercontroller.updateUser);
router.delete("/:id", usercontroller.deleteUser);   

export default router;