import React from "react";
// import { Category } from "./components/Category.jsx";
import { Category } from "./components/pages/Category.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Dashboard } from "../dashboard/components/dashboardlayout/Dashboard.jsx";
// import Transaction from "../transactions/components/Transaction.jsx";
export const App = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Category />} />
			</Routes>
		</Router>
	);
};
export default App;
