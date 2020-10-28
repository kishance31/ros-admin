import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import RecurringInvoiceActionButtons from './RecurringInvoiceActionButtons';
import ExpandedRecurringInvoice from './ExpandedRecurringInvoice';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import { useSelector, useDispatch } from 'react-redux';
import { orderInvoiceAction } from '../../../actions/orderInvoice.action'
import { NoRecordsFoundMessage, PleaseWaitMessage } from "../../../../_metronic/_helpers";
import { Pagination } from "../../../../_metronic/_partials/controls";

const RecurringInvoice = ({ recurringInvoiceData, firstRecurringFlag }) => {

	const dispatch = useDispatch();

	const {
		isLoading,
		totalRecords,
		pageNumber,
		pageSize } = useSelector(state => state.orderInvoice)

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
		},
	];

	const expandRow = {
		renderer: (row) => (
			<ExpandedRecurringInvoice invoiceRow={row} firstRecurringFlag={firstRecurringFlag} />
		),
		showExpandColumn: true,
		expandByColumnOnly: true,
	};

	const paginationOptions = {
		custom: true,
		// totalSize: totalRecords,
		totalSize: 10,
		sizePerPageList: [
			{ text: "3", value: 3 },
			{ text: "5", value: 5 },
			{ text: "10", value: 10 }
		],
		sizePerPage: pageSize,
		page: pageNumber,
	};

	const noDataIndication = () => {
		return (
			<>
				{
					isLoading ? (
						<PleaseWaitMessage entities={null} />
					) : (
							<NoRecordsFoundMessage entities={recurringInvoiceData} />
						)
				}
			</>
		)
	}

	const onTableChange = (type, newState) => {
		if (type === "pagination") {
			if (newState.page && newState.page !== pageNumber) {
				dispatch(orderInvoiceAction.setPage(newState.page));
			}
			if (newState.sizePerPage !== pageSize) {
				dispatch(orderInvoiceAction.setPageSize(newState.sizePerPage));
			}
		}
	}


	return (
		<PaginationProvider pagination={paginationFactory(paginationOptions)}>
			{({ paginationProps, paginationTableProps }) => {
				return (
					<Pagination
						isLoading={isLoading}
						paginationProps={paginationProps}
					>
						<BootstrapTable
							keyField='_id'
							data={recurringInvoiceData || []}
							classes="center-last-col"
							columns={columns}
							bordered={false}
							expandRow={expandRow}
							{...paginationTableProps}
							noDataIndication={noDataIndication}
							onTableChange={onTableChange}
						/>
					</Pagination>
				);
			}}
		</PaginationProvider>
	);
};
export default RecurringInvoice;
