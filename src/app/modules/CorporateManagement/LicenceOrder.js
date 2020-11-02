import React, { useEffect, useState } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import { ActionButtons } from './LicenceOrder/ActionButtons';
import {
	corporateManageLicenseAction,
	displayCorporateManageLicenseDataAsync
} from '../../actions/corporateManageLicense.action';
import ViewModal from './LicenceOrder/ViewModal';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import { Pagination } from '../../../_metronic/_partials/controls';
import { NoRecordsFoundMessage, generateLicensePDF } from "../../../_metronic/_helpers";

const LicenceOrder = () => {

	const dispatch = useDispatch();

	const [show, setShow] = useState(false);
	const [selectedRow, setSelectedRow] = useState(null);

	const handleClose = () => {
		setShow(false);
		setSelectedRow(null);
	};

	const handleShow = (row) => {
		setShow(true);
		setSelectedRow(row);
	};

	const {
		corporateManageLicenseData,
		totalCount,
		pageNumber,
		pageSize,
		isLoading,
	} = useSelector((state) => state.corporateManageLicense, shallowEqual);

	useEffect(() => {
		dispatch(displayCorporateManageLicenseDataAsync());
	}, []);

	const onDownloadPdf = (row) => {
		generateLicensePDF({ data: row, corporate: row.corporateDetails })
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
			dataField: 'orderId',
			text: 'Ord. No',
		},
		{
			dataField: 'createdAt',
			text: 'Ord. Date',
			formatter: cell => new Date(cell).toLocaleDateString(),
		},
		{
			dataField: 'purchasedLicenses',
			text: 'Ord. Cost(USD)',
			formatter: cell => (`$${cell.reduce((acc, val) => acc += val.totalPrice, 0)}`),
		},
		{
			dataField: 'action',
			text: 'Action',
			formatter: ActionButtons,
			formatExtraData: {
				handleShow,
				onDownloadPdf
			}
		},
	];
	const paginationOptions = {
		custom: true,
		totalSize: totalCount,
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
			<NoRecordsFoundMessage />
		)
	}

	const onTableChange = (type, newState) => {
		if (type === "pagination") {
			if (newState.page && newState.page !== pageNumber) {
				dispatch(corporateManageLicenseAction.setPage(newState.page));
			}
			if (newState.sizePerPage !== pageSize) {
				dispatch(corporateManageLicenseAction.setPageSize(newState.sizePerPage));
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
							data={corporateManageLicenseData}
							columns={columns}
							bordered={false}
							{...paginationTableProps}
							noDataIndication={noDataIndication}
							onTableChange={onTableChange}
						/>
						<ViewModal
							show={show}
							handleClose={handleClose}
							orderDetails={selectedRow}
						/>
					</Pagination>
				);
			}}
		</PaginationProvider>
	);
};
export default LicenceOrder;
