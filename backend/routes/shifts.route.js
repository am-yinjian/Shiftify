import express from "express";
import { createShifts, deleteShifts, getShifts, updateShifts } from "../controllers/shifts.controller.js";

const router = express.Router();

router.get("/", getShifts);

router.post("/", createShifts);

router.put("/:id", updateShifts);

router.delete("/:id", deleteShifts);

export default router;