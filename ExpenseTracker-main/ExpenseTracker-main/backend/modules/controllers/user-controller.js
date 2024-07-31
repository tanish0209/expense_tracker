import {
	addUser,
	checkUser,
	getUserByUsername,
} from "../services/user-operations.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import nodemailer from "nodemailer";

// import { userModel, validate_login, validate_signup } from "../models/user-schema.js";

export const add_User = async (req, res) => {
	// res.send("I am in User Add");
	const user = req.body;
	console.log("required data is...", user);
	try {
		const doc = await addUser(user);
		console.log(doc);
		if (doc && doc._id) {
			res.status(200).json({
				success: true,
				message: "New User Added!",
				doc: doc,
			});
		}
	} catch (err) {
		console.log(err);
		res.status(400).json({ message: "Unable to add." });
	}
};
export const check_User = async (req, res) => {
	const { username, password } = req.body;
	try {
		const doc = await checkUser({ username, password });
		console.log(doc);

		if (!doc) {
			return res
				.status(401)
				.json({ message: "Invalid username.", success: false });
		} else {
			const user = await getUserByUsername(req.body.username);
			const isMatch = await bcrypt.compare(password, user.password);
			if (isMatch) {
				res.status(401).json({ message: "Invalid password." });
			}
			if (req.session) {
				req.session.user = user;
			} else {
				console.error("Session not available"); // Handle session not available
			}
			res.status(202).json({ message: "Success!", success: true });
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Server Error." });
	}
};
// export const register_User = async (req, res) => {
// 	try {
// 		const { error } = validate_signup(req.body);
// 		if (error) {
// 			res.status(400).send({ message: error.details[0].message });
// 		}
// 		const user = await registerUser({ email: req.body.email });
// 		if (user) {
// 			res.status(409).send({
// 				message: "User with this email already exists.",
// 			});
// 		}
// 		const salt = await bcrypt.genSalt(Number(process.env.SALT));
// 		const hashPassword = await bcrypt.hash(req.body.password, salt);
// 		await new userModel({ ...req.body, password: hashPassword }).save();
// 		res.status(201).send({ message: "User created successfully." });
// 	} catch (err) {
// 		res.status(500).send({ message: "Internal Server Error." });
// 	}
// };

// export const login_User = async (req, res) => {
// 	try{
// 		const {error} = validate_login(req.body);
// 		if (error) {
// 			res.status(400).send({message: error.details[0].message})
// 		}
// 		const user = await
// 	}
// };

const transporter = nodemailer.createTransport({
	// Replace with your actual email service credentials
	host: `${process.env.host}`,
	port: process.env.PORT,
	secure: false, // Adjust based on your email service requirements
	auth: {
		user: `${process.env.email}`,
		pass: "12345678",
	},
});

export async function send_Email(to, subject, text, html = "") {
	try {
		const mailOptions = {
			from: `${process.env.email}`,
			to,
			subject,
			text,
			html,
		};
		const info = await transporter.sendMail(mailOptions);
		console.log(`Email sent: ${info.response}`);
	} catch (err) {
		console.log(`Error sending email: ${err.message}`);
	}
}

export const forgot_Password = async (req, res) => {
	const { email } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		const resetToken = crypto.randomBytes(32).toString("hex");
		const resetTokenExpiry = Date.now() + 3600000;
		user.resetPasswordToken = resetToken;
		user.resetPasswordExpiry = resetTokenExpiry;
		await user.save();
		const resetUrl = `https://your-frontend-url/reset-password/${resetToken}`;
		await send_Email(
			user.email,
			"Password Reset",
			`Click here to reset your password: ${resetUrl}`
		);
		res.status(200).json({ message: "Password reset email sent" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};
export const reset_Password = async (req, res) => {
	const { resetToken, newPassword } = req.body;
	try {
		const user = await User.findOne({
			resetPasswordToken,
			resetPasswordExpiry: { $gt: Date.now() },
		});
		if (!user) {
			return res.status(400).json({ message: "Invalid token" });
		}
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(newPassword, salt);
		user.password = hashedPassword;
		user.resetPasswordToken = undefined;
		user.resetPasswordExpiry = undefined;
		await user.save();
		res.status(200).json({ message: "Password reset successful" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};
