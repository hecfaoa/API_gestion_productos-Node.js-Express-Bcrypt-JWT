import { Router } from "express";
import * as rolecontroller from "../controllers/roles.controller.js";

const router = Router();

router.get("/",     rolecontroller.getRoles);
router.get("/:id", rolecontroller.getRoleById);
router.post("/", rolecontroller.createRole);
router.put("/:id", rolecontroller.updateRole);
router.delete("/:id", rolecontroller.deleteRole);

export default router;