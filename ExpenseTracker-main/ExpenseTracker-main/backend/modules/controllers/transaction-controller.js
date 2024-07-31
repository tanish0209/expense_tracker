// const { add_transaction } = require("../services/transaction-operations.js");
// const { add_transaction } = require("../services/transaction-operations.js");
import {
	add_transaction,
	get_transaction,
} from "../services/transaction-operations.js";
import { getFromCategoryIds } from "../services/category-operations.js";
export const getAllTransaction = async (req, res) => {
	try {
		// console.log("REDC");
		const { userId } = await req.params;
		console.log({ userId });
		const newTransaction = await get_transaction(userId);
		console.log(newTransaction);
		if (newTransaction && newTransaction._id) {
			res.status(201).json({ success: true, data: newTransaction });
		}

		await newTransaction.save();
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
};

export const addTransaction = async (req, res) => {
	try {
		const doc = await req.body;
		// res.send("hello");
		const newTransaction = await add_transaction(doc);
		console.log(newTransaction);
		if (newTransaction && newTransaction._id) {
			res.status(201).send("Transaction Created: " + newTransaction);
		}
		await newTransaction.save();
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
};
// module.exports={getAllTransaction,addTransaction};
export const get_Category_Ids = async (req, res) => {
	try {
		const categoryIds = await getFromCategoryIds.getCategoryIds(
			req.body.selectedExpenses
		);
		res.json(categoryIds);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Failed to fetch category IDs" });
	}
};
