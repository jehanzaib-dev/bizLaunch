import express from "express";
import { generateBlueprint } from "../controllers/blueprintController.js";


const router = express.Router();

router.route('/generate').post(generateBlueprint);

export default router;