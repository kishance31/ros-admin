import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { RecurringInvoiceActionButtons } from './RecurringInvoiceActionButtons';
import ExpandedRecurringInvoice from './ExpandedRecurringInvoice';
import { generateInvoicePDF } from '../../../../_metronic/_helpers';

const RecurringInvoice = ({ recurringInvoiceData, firstRecurringFlag }) => {

	const onDownloadPdf = (row) => {
		generateInvoicePDF({data: row, isRecurring: firstRecurringFlag === "first" ? true : false, corporate: row.corporateDetails})
	}

	const columns = [
		{
			dataField: '_id',
			text: 'id',
			hidden: true,
		},
		{
			dataField: 'corporateDetails.companyName',
			text: 'Corporate Name',
		},
		{
			dataField: 'employeeDetails',
			text: 'Employee Name',
			formatter: cell => `${cell.firstName} ${cell.lastName}`,
		},
		{
			dataField: 'orderId',
			text: 'Order. No',
		},
		{
			dataField: 'firstInvoiceDate',
			text: 'Order Date',
			formatter: cell => new Date(cell).toLocaleDateString()
		},
		{
			dataField: 'invoiceDetails',
			text: 'Invoice Amt.',
			formatter: (cell, row) => {
				if (firstRecurringFlag === "first") {
					return `$${parseFloat((
						((row.productDetails.reduce((acc, prod) => acc + prod.ros_cost, 0)) / 12)
						* row.firstPaymentTerm))
						.toFixed(2)
						}`
				} else {
					return `$${parseFloat((
						(
							(row.productDetails.reduce((acc, prod) => acc + prod.ros_cost, 0)) -
							(((row.productDetails.reduce((acc, prod) => acc + prod.ros_cost, 0)) / 12)
								* row.firstPaymentTerm)) / row.recurringMonthsNo
					) * row.invoiceDetails.length
					).toFixed(2)
						}`
				}
			}
		},
		{
			dataField: 'action',
			text: 'Action',
			formatter: RecurringInvoiceActionButtons,
			formatExtraData: {
				onDownloadPdf,
			}
		},
	];

	const expandRow = {
		renderer: (row) => (
			<ExpandedRecurringInvoice invoiceRow={row} firstRecurringFlag={firstRecurringFlag} />
		),
		showExpandColumn: true,
		expandByColumnOnly: true,
	};

	return (
		<BootstrapTable
			keyField='_id'
			data={recurringInvoiceData || []}
			classes="center-last-col"
			columns={columns}
			bordered={false}
			noDataIndication='No records found!'
			expandRow={expandRow}
		/>
	);
};

export default RecurringInvoice;
