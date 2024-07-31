import express from "express";
import {
	add_Custom_Category,
	create_Category,
	get_Category,
} from "../controllers/category-controller.js";
export const categoryRoutes = express.Router();
// categoryRoutes.post("/add-category", create_Category);
categoryRoutes.get("/get-category", get_Category);
categoryRoutes.post("/add-custom-category", add_Custom_Category);
