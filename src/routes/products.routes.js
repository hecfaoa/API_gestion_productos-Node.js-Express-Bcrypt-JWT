import { Router } from "express";
import * as productcontroller from "../controllers/products.controller.js";
import { verifyToken } from "../middlewares/index.js";
import { isAuthorized } from "../middlewares/authJwt.middleware.js";

const router = Router();

router.get("/",     productcontroller.getProducts);
router.get("/:id", productcontroller.getProductById);
router.post("/", [verifyToken, isAuthorized], productcontroller.createProduct);
router.put("/:id", verifyToken, productcontroller.updateProduct);
router.delete("/:id", [verifyToken], productcontroller.deleteProduct);

export default router;