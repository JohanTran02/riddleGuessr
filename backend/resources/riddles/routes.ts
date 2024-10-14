import express from "express"
import { getRiddles } from "./controller";
// create router for riddles 
const router = express.Router();

router.post("", getRiddles)

export default router;
