import * as express from "express";
import { getProducts } from '../controllers/client'
import { getCustomers } from "../controllers/client"
import { getTransactions } from '../controllers/client'
import { getGeography } from '../controllers/client'

const router = express.Router()

router.get("/products", getProducts)
router.get("/customers", getCustomers)
router.get("/transactions", getTransactions);
router.get("/geography", getGeography);

export default router