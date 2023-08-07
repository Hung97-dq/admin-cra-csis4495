import express from "express";
import {
  getPredicts,
  getCustomers,
  getTransactions,
  deleteCustomer
} from "../controllers/client.js";

const router = express.Router();

router.get("/predicts", getPredicts);
router.get("/customers", getCustomers);
router.delete("/customers/:id", deleteCustomer);
router.get("/transactions", getTransactions);

export default router;