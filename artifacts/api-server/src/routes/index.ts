import { Router, type IRouter } from "express";
import healthRouter from "./health";
import auditionsRouter from "./auditions";
import sponsorshipsRouter from "./sponsorships";
import statsRouter from "./stats";

const router: IRouter = Router();

router.use(healthRouter);
router.use(auditionsRouter);
router.use(sponsorshipsRouter);
router.use(statsRouter);

export default router;
