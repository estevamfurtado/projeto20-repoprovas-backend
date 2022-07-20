import { Router } from "express";
import auth from "./auth.router";
import tests from "./tests.router";

const router = Router();
router.use('/', auth);
router.use('/tests', tests);

export default router;