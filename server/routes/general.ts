import * as express from "express";
import {getUser, getDashboardStats} from "../controllers/general"

const router = express.Router()

router.get("/user/:id", getUser)
router.get("/dashboard/:date", getDashboardStats)


export default router