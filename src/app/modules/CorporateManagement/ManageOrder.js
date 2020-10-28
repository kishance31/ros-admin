import React, { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import ExpandedRowLevelOne from './ManageOrder/ExpandedRowLevelOne';
import { manageOrderAction, getCorporateOrdersAsync } from '../../actions/manageOrder.action';
import { NoRecordsFoundMessage, PleaseWaitMessage } from "../../../_metronic/_helpers";
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import { Pagination } from '../../../_metronic/_partials/controls';

const ManageOrder = () => {

	const dispatch = useDispatch();
	const {
		manageOrderData,
		refreshOrderData,
		totalCount,
		isLoading,
		pageNumber,
		pageSize } = useSelector(state => state.manageOrder, shallowEqual);

	useEffect(() => {
		if (refreshOrderData) {
			dispatch(getCorporateOrdersAsync())
		}
	}, [refreshOrderData])

	const confirmNewOrder = () => {
	};

	const manageOrderDispatchUpdate = () => {
	};

	const columns = [
		{
			dataField: 'corporateId',
			text: 'corporateId',
			hidden: true
		},
		{
			dataField: 'companyName',
			text: 'Corporate Name',
		},
		{
			dataField: 'contactPerson',
			text: 'Contact Person',
		},
		{
			dataField: 'email',
			text: 'Contact Email',
		},
	];

	const expandRow = {
		renderer: (row) => (
			<ExpandedRowLevelOne
				row={row}
				confirmNewOrder={confirmNewOrder}
				manageOrderDispatchUpdate={manageOrderDispatchUpdate}
			/>
		),
		showExpandColumn: true,
		expandByColumnOnly: true,
	};

	const paginationOptions = {
		custom: true,
		totalSize: 10,
		//totalSize: totalCount,
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
							<NoRecordsFoundMessage entities={manageOrderData} />
						)
				}
			</>
		)
	}

	const onTableChange = (type, newState) => {
		if (type === "pagination") {
			if (newState.page && newState.page !== pageNumber) {
				dispatch(manageOrderAction.setPage(newState.page));
			}
			if (newState.sizePerPage !== pageSize) {
				dispatch(manageOrderAction.setPageSize(newState.sizePerPage));
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
							keyField='corporateId'
							data={manageOrderData === null ? [] : manageOrderData}
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


export default ManageOrder;
