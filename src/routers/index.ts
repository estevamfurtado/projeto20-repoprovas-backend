import { Router } from "express";
import auth from "./auth.router";
import passes from "./passes.router";

const router = Router();
router.use('/', auth);
router.use('/passes', passes);

export default router;