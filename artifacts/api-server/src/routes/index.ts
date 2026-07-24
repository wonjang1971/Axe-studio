import { Router, type IRouter } from "express";
import healthRouter from "./health";
import auditionsRouter from "./auditions";
import sponsorshipsRouter from "./sponsorships";
import statsRouter from "./stats";
import newsRouter from "./news";

const router: IRouter = Router();

router.use(healthRouter);
router.use(auditionsRouter);
router.use(sponsorshipsRouter);
router.use(statsRouter);
router.use(newsRouter);

export default router;
