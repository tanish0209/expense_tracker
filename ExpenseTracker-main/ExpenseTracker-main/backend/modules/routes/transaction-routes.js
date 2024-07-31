import {
	addTransaction,
	getAllTransaction,
} from "../controllers/transaction-controller.js";
import express from "express";
import { get_Category_Ids } from "../controllers/transaction-controller.js";
export const router = express.Router();
router.post("/add-transaction", addTransaction);
router.get("/:userId/get-transaction", getAllTransaction);
router.get("/get-category-ids", get_Category_Ids);
