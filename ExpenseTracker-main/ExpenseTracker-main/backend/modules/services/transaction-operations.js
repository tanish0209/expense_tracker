// const { Transaction } = require("../models/Transaction.js");
import { transactionModel } from "../models/transaction-schema";
export const add_transaction = async (doc) => {
	try {
		const user = await transactionModel(doc);
		return user;
	} catch (err) {
		throw err;
	}
};
// return !!user;
export const get_transaction = async (id) => {
	try {
		console.log("hello");
		const user = await transactionModel.findOne({ user_id: id });
		console.log(user);
		return user;
	} catch (err) {
		throw err;
	}
};
// export const get_category_ids = async()=>
// module.exports = add_transaction;
