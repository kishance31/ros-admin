import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';

const ExpandedRowNewOrder = ({ order }) => {

	const columns = [
		{
			dataField: '_id',
			text: 'id',
			hidden: true,
		},
		{
			dataField: 'product_name',
			text: 'Item Name',
		},
		{
			dataField: 'ros_code',
			text: 'Item ID',
		},
		{
			dataField: 'ros_cost',
			text: 'Item Cost (USD)',
			formatter: (cell) => `$${cell}`
		},
		{
			dataField: 'firstPaymentTerm',
			text: 'First Time Cost (USD)',
			formatter: (cell, row) => `$${parseFloat((
				(row.ros_cost / 12)
				* order.firstPaymentTerm))
				.toFixed(2)}`
		},
	];

	return (
		<div className='jumbotron bg-light p-4'>
			<BootstrapTable
				keyField='_id'
				data={order.productDetails || []}
				columns={columns}
				bordered={false}
				noDataIndication='No records found!'
			/>
		</div>
	);
};

export default ExpandedRowNewOrder;
