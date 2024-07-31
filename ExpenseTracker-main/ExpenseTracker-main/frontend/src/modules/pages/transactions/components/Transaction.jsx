import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select, message, Table } from "antd";
// import axios from "axios";
import { getTransApi } from "../../../../shared/services/api-trans.js";
import { Header } from "../../../../shared/components/heading/Header.jsx";
import { Footer } from "../../../../shared/components/footing/Footer.jsx";
// import { getTransTwoApi } from "../../../../shared/services/api-trans-two.js";
// import { useNavigate } from "react-router-dom";

export const Transaction = () => {
	const [showModal, setShowModal] = useState(false);
	// const [loading, setLoading] = useState(false);
	const [allTransaction, setAllTransaction] = useState([]);
	// const [selectedExpenses] = useState(JSON.stringify(selectedExpenses)); // Replace with your actual state management
	// const [categoryIds, setCategoryIds] = useState([]);
	const columns = [
		{ title: "name", dataIndex: "name" },
		{ title: "type", dataIndex: "type" },
		{ title: "amount", dataIndex: "amount" },
		{ title: "date_time", dataIndex: "date_time" },
	];

	const getAllTransaction = async () => {
		// try {
		// 	const user = JSON.parse(localStorage.getItem("user"));
		// 	// setLoading(true);
		// 	// const res = await axios.post("/transaction/get-transaction", {
		// 	// 	user_id: user,
		// 	// });
		// 	const res = await getTransApi({
		// 		user_id: user,
		// 	});
		// 	// setLoading(false);
		// 	setAllTransaction(res.data);
		// 	console.log(res.data);
		// } catch (error) {
		// 	console.log(error);
		// 	message.error("fetch issue with transaction");
		// }
		// const { name, type, amount, date_time } =
		// console.log();
	};
	useEffect(() => {
		getAllTransaction();
	}, []);
	// useEffect(() => {
	// 	const fetchCategoryIds = async () => {
	// 		try {
	// 			const res = await getTransTwoApi({ selectedExpenses });
	// 			setCategoryIds(res.data);
	// 		} catch (err) {
	// 			console.error("Error fetching category IDs:", err);
	// 		}
	// 	};
	// 	if (selectedExpenses.length > 0) {
	// 		fetchCategoryIds();
	// 	}
	// }, [selectedExpenses]);
	// const navigate = useNavigate();
	const handleSubmit = async (values) => {
		try {
			const user = JSON.parse(localStorage.getItem("user"));
			console.log(user);
			// setLoading(true);
			// await axios.post("/transaction/add-transaction", {
			// 	...values,
			// 	user_id: user,
			// });
			const res = await getTransApi({
				...values,
				user_id: user,
			});
			await res.save();
			// setLoading(false);
			message.success("Transaction Added Successfully");
			setShowModal(false);
		} catch (error) {
			// setLoading;
			message.error("Failed to add transaction");
		}
	};
	const handleSave = async (e) => {
		e.preventDefault();
		try {
			// const response = await getApi({
			// 	name,
			// 	type,
			// 	amount,
			// 	date_time,
			// });
			const { name, type, amount, date_time } = JSON.parse(
				localStorage.getItem("category")
			);
			const response = await getTransApi({
				name,
				type,
				amount,
				date_time,
			});
			console.log(response.data.message);
			if (response.data.success) {
				alert("Transaction Added.");
				// navigate("/dashboard");
			} else {
				console.error("failed.");
			}
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<div>
			<Header />
			<div className="filters">
				<div>range filters</div>
				<div>
					<button
						className="btn btn-primary"
						onClick={() => setShowModal(true)}
					>
						Add New
					</button>
				</div>
			</div>
			<div className="content">
				<Table columns={columns} dataSource={allTransaction} />
			</div>
			<Modal
				title="Add Transaction"
				open={showModal}
				onCancel={() => setShowModal(false)}
				footer={false}
			>
				<Form layout="vertical" onFinish={handleSubmit}>
					<Form.Item label="Name" name="name">
						<Input type="text" />
					</Form.Item>
					<Form.Item label="Type" name="type">
						<Select initialvalue={"Select an option"}>
							<Select.Option value="income">Income</Select.Option>
							<Select.Option value="expense">
								Expense
							</Select.Option>
						</Select>
					</Form.Item>
					<Form.Item label="Amount" name="amount">
						<Input type="text" />
					</Form.Item>
					<Form.Item label="Date" name="date_time">
						<Input type="date" />
					</Form.Item>

					<div className="d-flex justify-content-end">
						<form onSubmit={handleSave}>
							<button type="submit" className="btn btn-primary">
								{" "}
								SAVE
							</button>
						</form>
					</div>
				</Form>
			</Modal>
			<Footer />
		</div>
	);
};
export default Transaction;
