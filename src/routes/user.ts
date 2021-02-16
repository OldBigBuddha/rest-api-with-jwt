import express from "express";

import * as UserController from "../controllers/UserController";

const router = express.Router();

router.get("/", UserController.findAll);
router.post("/", UserController.addOne);

router.get("/:id", UserController.findOne);
router.put("/:id", UserController.updateOne);
router.delete("/:id", UserController.deleteOne);

// JWT 検証
router.get("/:id/tokens");
// JWT 取得
router.post("/:id/tokens", UserController.getToken);

export default router;
