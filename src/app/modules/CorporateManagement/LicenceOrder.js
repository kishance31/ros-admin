import React, { useEffect, useState } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import {ActionButtons} from './LicenceOrder/ActionButtons';
import {
	displayCorporateManageLicenseDataAsync,
} from '../../actions/corporateManageLicense.action';
import ViewModal from './LicenceOrder/ViewModal';
import {
	NoRecordsFoundMessage, generateLicensePDF
} from "../../../_metronic/_helpers";

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
		pageSize,
		pageNo,
	} = useSelector((state) => state.corporateManageLicense, shallowEqual);

	useEffect(() => {
		dispatch(displayCorporateManageLicenseDataAsync());
	}, [dispatch]);

	const onDownloadPdf = (row) => {
		generateLicensePDF({data: row, corporate: row.corporateDetails})
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

	const noDataIndication = () => {
		return (
			<NoRecordsFoundMessage />
		)
	}

	

	return (
		<>
			<BootstrapTable
				keyField='_id'
				data={corporateManageLicenseData}
				columns={columns}
				bordered={false}
				noDataIndication={noDataIndication}
			/>
			<ViewModal
				show={show}
				handleClose={handleClose}
				orderDetails={selectedRow}
			/>
		</>
	);
};

export default LicenceOrder;
