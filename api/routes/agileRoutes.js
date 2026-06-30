import express from "express";
import { BlueprintController } from "../controllers/blueprintController.js";


const router = express.Router();

router.route('/generate').post(BlueprintController);

export default router;