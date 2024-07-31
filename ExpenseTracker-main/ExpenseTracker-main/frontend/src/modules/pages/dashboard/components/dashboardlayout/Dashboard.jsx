import React from "react";
import { Header } from "../../../../../shared/components/heading/Header.jsx";
import { Slider } from "../sliderexp/Slider.jsx";
import { Income } from "../income/Income.jsx";
import { Expense } from "../expense/Expense.jsx";
import { ExpenseButton } from "../expbut/ExpenseButton.jsx";
import { TransactionButton } from "../transactionsbutton/TransactionButton.jsx";
import { Footer } from "../../../../../shared/components/footing/Footer.jsx";

export const Dashboard = () => {
	return (
		<div>
			<div className="head">
				<Header />
			</div>
			<div className="slide">
				<Slider />
			</div>
			<div className="cont">
				<div className="row">
					<div className="col-6">
						<Income />
						<Expense />
					</div>
					<div className="col-6">
						<ExpenseButton />
						<TransactionButton />
					</div>
				</div>
			</div>
			<div className="footer">
				<Footer />
			</div>
		</div>
	);
};
