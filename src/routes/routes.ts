import { Router } from "express";

export const path = "";
export const router = Router();

import * as userRouter from "./userRoutes";

router.use(userRouter.path, userRouter.router);
