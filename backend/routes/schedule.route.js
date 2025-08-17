import express from "express";

import { createSchedules, deleteSchedules, getSchedules, updateSchedules } from "../controllers/schedules.controller.js";

const router = express.Router();

router.get("/", getSchedules);
router.post("/", createSchedules);
router.put("/:id", updateSchedules);
router.delete("/:id", deleteSchedules);

export default router;