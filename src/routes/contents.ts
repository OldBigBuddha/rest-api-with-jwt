import express from "express";

import * as ContentController from "../controllers/ContentController";

const router = express.Router();

router.get("/", ContentController.findAll);
router.post("/", ContentController.addOne);

router.get("/:id", ContentController.findOne);
router.put("/:id", ContentController.updateOne);
router.delete("/:id", ContentController.deleteOne);

export default router;
