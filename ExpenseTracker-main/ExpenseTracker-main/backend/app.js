import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import { userRoutes } from "./modules/routes/user-routes.js";
import { createConnection } from "./shared/db/connection.js";
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(
	session({
		secret: process.env.SECRETKEY,
		resave: false,
		saveUninitialized: true,
	})
);
app.use("/", userRoutes);
const promise = createConnection();
promise
	.then(() => {
		console.log("Connection established.");
		const server = app.listen(process.env.PORT || 1111, (err) => {
			if (err) {
				console.log("Error found.");
			} else {
				console.log("Server up and running.", server.address().port);
			}
		});
	})
	.catch((err) => {
		console.log("Server down...", err);
		throw err;
	});
// app.get("/", (req, res) => {
// 	if (req.session.user) {
// 		const userID = req.session.user._id; // Access user ID from session
// 		// ... rest of your logic
// 	} else {
// 		res.status(401).json({ error: "Unauthorized" });
// 	}
// });
app.post("/login", (req, res) => {
	// Authentication logic
	if (authSuccessful) {
		req.session.userId = user._id; // Store user ID in session
		res.json({ success: true }); // Or redirect to a specific route
	} else {
		// Handle authentication failure
	}
});
