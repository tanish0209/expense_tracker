import {
	createCategory,
	getCategory,
	addCustomCategory,
} from "../services/category-operations";

export const create_Category = async (req, res) => {
	try {
		const category = await createCategory(req.body);
		res.status(201).json({ doc: category });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
export const get_Category = async (req, res) => {
	try {
		const category = await getCategory();
		res.status(200).json(category);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
export const add_Custom_Category = async (req, res) => {
	try {
		const userID = req.user._id;
		const categoryData = req.body;
		const newCategory = await addCustomCategory(userID, categoryData);
		res.status(201).json(newCategory);
	} catch (err) {}
	res.status(500).json({ error: err.message });
};
