import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { RecurringInvoiceActionButtons } from './RecurringInvoiceActionButtons';
import ExpandedRecurringInvoice from './ExpandedRecurringInvoice';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import { useSelector, useDispatch } from 'react-redux';
import { orderInvoiceAction } from '../../../actions/orderInvoice.action'
import { generateInvoicePDF, NoRecordsFoundMessage } from "../../../../_metronic/_helpers";
import { Pagination } from "../../../../_metronic/_partials/controls";

const RecurringInvoice = ({ recurringInvoiceData, firstRecurringFlag }) => {

	const dispatch = useDispatch();

	const {
		isLoading,
		totalRecords,
		pageNumber,
		pageSize } = useSelector(state => state.orderInvoice)

	const onDownloadPdf = (row) => {
		generateInvoicePDF({ data: row, isRecurring: firstRecurringFlag === "first" ? true : false, corporate: row.corporateDetails })
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
			dataField: 'invoiceNo',
			text: 'Invoice. No',
		},
		{
			dataField: 'invoiceDate',
			text: 'Invoice Date',
			formatter: cell => new Date(cell).toLocaleDateString()
		},
		{
			dataField: 'invoiceAmt',
			text: 'Invoice Amt.(USD)',
			formatter: (cell, row) => (`$${row.isReccuring ? row.recurringCost.toFixed(2) : row.firstTimeCost.toFixed(2)}`)
		},
		{
			dataField: 'paymentDone',
			text: 'Payment Status',
			formatter: (cell, row) => (cell  ? "Done" : "Pending")
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

	const paginationOptions = {
		custom: true,
		totalSize: totalRecords,
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
			<NoRecordsFoundMessage entities={recurringInvoiceData} />
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
