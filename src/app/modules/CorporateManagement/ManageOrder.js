import React, { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import {
	NoRecordsFoundMessage,
} from "../../../_metronic/_helpers";
import ExpandedRowLevelOne from './ManageOrder/ExpandedRowLevelOne';
import { getCorporateOrdersAsync, updateOrderDispatchDateAsync, confirmCorporateOrderAsync } from '../../actions/manageOrder.action';

const ManageOrder = () => {
	const dispatch = useDispatch();
	const manageOrderData = useSelector(
		state => state.manageOrder.manageOrderData,
		shallowEqual
	);
	const refreshOrderData = useSelector(
		state => state.manageOrder.refreshOrderData,
		shallowEqual
	);

	useEffect(() => {
		if(refreshOrderData) {
			dispatch(getCorporateOrdersAsync())
		}
	}, [refreshOrderData])

	const confirmNewOrder = (row) => {
		dispatch(confirmCorporateOrderAsync(row._id));
	};

	const manageOrderDispatchUpdate = (
		id,
		deliveryStatus,
		dispatchDate,
		deliveryDate
	) => {
		dispatch(updateOrderDispatchDateAsync(id, {deliveryStatus, dispatchDate, deliveryDate}));
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

	const noDataIndication = () => {
		return (
			<>
				<NoRecordsFoundMessage entities={null} />
			</>
		)
	}

	return (
		<BootstrapTable
			keyField='corporateId'
			data={manageOrderData === null ? [] : manageOrderData}
			columns={columns}
			bordered={false}
			noDataIndication='No records found!'
			expandRow={expandRow}
			noDataIndication={noDataIndication}
		// pagination={paginationFactory(options)}
		/>
	);
};

export default ManageOrder;
