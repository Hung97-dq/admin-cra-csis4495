import express from "express";
import {
  getPredicts,
  getCustomers,
  deleteCustomer
} from "../controllers/client.js";

const router = express.Router();

router.get("/predicts", getPredicts);
router.get("/customers", getCustomers);
router.delete("/customers/:id", deleteCustomer);

export default router;