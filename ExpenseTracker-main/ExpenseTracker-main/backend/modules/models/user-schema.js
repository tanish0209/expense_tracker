import mongoose, { SchemaTypes } from "mongoose";
import jwt from "jsonwebtoken";

import passwordComplexity from "joi-password-complexity";
const userSchema = mongoose.Schema({
	name: {
		type: SchemaTypes.String,
		required: true,
	},
	username: {
		type: SchemaTypes.String,
		required: true,
		unique: true,
	},
	password: {
		type: SchemaTypes.String,
		required: true,
	},
	customCategories: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "category",
		},
	],
});

// userSchema.methods.generateAuthToken = function () {
// 	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
// 		expiresIn: "1h",
// 	});
// 	return token;
// };

export const userModel = mongoose.model("users", userSchema);

// export const validate_signup = (data) => {
// 	const schema = Joi.object({
// 		name: Joi.string().required().label("Name"),
// 		email: Joi.string().email().required().label("Email"),
// 		password: passwordComplexity().required().label("Password"),
// 	});
// 	return schema.validate_signup(data);
// };

// export const validate_login = (data) => {
// 	const schema = Joi.object({
// 		email: Joi.string().email().required().label("Email"),
// 		password: passwordComplexity().required().label("Password"),
// 	});
// 	return schema.validate_login(data);
// };
