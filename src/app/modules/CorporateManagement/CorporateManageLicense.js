import React, { useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, {
	PaginationProvider,
} from 'react-bootstrap-table2-paginator';
import { Pagination } from '../../../_metronic/_partials/controls';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import SubTableLicenseType from './CorporateManageLicense/SubTableLicenseType';
import SubTableLicenseNo from './CorporateManageLicense/SubTableLicenseNo';
import ActionButtons from './CorporateManageLicense/ActionButtons';
import {
	corporateManageLicenseAction,
	displayCorporateManageLicenseDataAsync,
	activatePurchaseLicenseAsync
} from '../../actions/corporateManageLicense.action';
import {
	NoRecordsFoundMessage,
} from "../../../_metronic/_helpers";

const CorporateManageLicense = () => {
	const dispatch = useDispatch();
	const {
		corporateManageLicenseData,
		isLoading,
		totalCount,
		pageSize,
		pageNumber,
	} = useSelector((state) => state.corporateManageLicense, shallowEqual);

	const activeDeactiveAction = (_id, isActive) => {
		dispatch(
			activatePurchaseLicenseAsync(
				_id,
				isActive
			)
		);
	};

	useEffect(() => {
		dispatch(displayCorporateManageLicenseDataAsync());
	}, [dispatch]);

	const indexingSrNo = (cell, row, rowIndex) => {
		return rowIndex + 1;
	};

	const calculateTotalLicenceCost = (cell, row) => {
		let totalLicenseCost = 0;
		totalLicenseCost = row.purchasedLicenses
			.map((licence) => licence.totalPrice)
			.reduce((prev, next) => prev + next);
		return totalLicenseCost;
	};

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

	const columns = [
		{
			dataField: 'srNo',
			text: 'Sr no.',
			formatter: indexingSrNo,
		},
		{
			dataField: 'orderId',
			text: 'Lic. Order No',
		},
		{
			dataField: 'createdAt',
			text: 'Order Date',
			formatter: cell => new Date(cell).toLocaleDateString(),
		},
		{
			dataField: 'purchasedLicenses.type',
			text: 'License Type',
			formatter: SubTableLicenseType,
		},
		{
			dataField: 'purchasedLicenses.quantity',
			text: 'No of License',
			formatter: SubTableLicenseNo,
		},
		{
			dataField: 'purchasedLicenses.totalPrice',
			text: 'License Cost (USD)',
			formatter: calculateTotalLicenceCost,
		},

		//commented as status field is not coming from API.
		// {
		//   dataField: 'status',
		//   text: 'Status',
		// },

		{
			dataField: 'action',
			text: 'Action',
			formatter: ActionButtons,
			formatExtraData: {
				activeDeactiveAction: activeDeactiveAction,
			},
		},
	];

	const noDataIndication = () => {
		return (
			<NoRecordsFoundMessage />
		)
	}

	return (
		<>
			<PaginationProvider pagination={paginationFactory(paginationOptions)}>
				{({ paginationProps, paginationTableProps }) => {
					return (
						<Pagination isLoading={isLoading} paginationProps={paginationProps}>
							<BootstrapTable
								keyField='orderId'
								bordered={false}
								data={
									corporateManageLicenseData
										? corporateManageLicenseData
										: []
								}
								columns={columns}
								remote
								noDataIndication={noDataIndication}
								{...paginationTableProps}
								onTableChange={onTableChange}
							/>
						</Pagination>
					);
				}}
			</PaginationProvider>
		</>
	);
};


export default CorporateManageLicense;
