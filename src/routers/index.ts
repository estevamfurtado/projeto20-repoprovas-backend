import { Router } from "express";
import auth from "./auth.router.js";
import tests from "./tests.router.js";

const router = Router();
router.use('/', auth);
router.use('/tests', tests);

export default router;