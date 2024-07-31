import React from "react";
import "./expense.css";
export const Expense = () => {
	return (
		<div className="card" id="exp">
			<div className="card-body">
				<h2 className="card-title">Expense</h2>
				<p className="card-text" id="showexp">
					$3927
				</p>
			</div>
		</div>
	);
};
