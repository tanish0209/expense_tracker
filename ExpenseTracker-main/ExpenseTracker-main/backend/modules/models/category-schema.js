import mongoose, { SchemaTypes } from "mongoose";
const categorySchema = mongoose.Schema({
	name: {
		type: SchemaTypes.String,
		required: true,
		unique: true,
	},
	color: {
		type: SchemaTypes.String,
		required: true,
	},
	user_id: {
		type: SchemaTypes.ObjectId,
	},
	custom_category: {
		type: SchemaTypes.ObjectId,
		required: false,
	},
});
export const categoryModel = mongoose.model("categories", categorySchema);
