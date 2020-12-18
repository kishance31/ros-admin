import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';

const ViewModal = ({
	show,
	handleClose,
	row,
	orderId,
	manageOrderDispatchUpdate,
}) => {

	const [dispatchDate, setDispatchDate] = useState(row.dispatchDate ? new Date(row.dispatchDate) : "");
	const [deliveryDate, setDeliveryDate] = useState(row.deliveryDate ? new Date(row.deliveryDate) : "");
	const [deliveryStatus, setDispatchStatus] = useState(
		row.deliveryStatus
	);

	const [errorMsg, setErrorMsg] = useState('');

	const saveAction = () => {
		console.log(row)
		if (deliveryStatus !== "pending" && !dispatchDate) {
			setErrorMsg('Select delivery or dispatch date.');
		} else if(dispatchDate && deliveryStatus === "pending") {
			setErrorMsg('Change the order status to dispatched/delivered.');
		} else if (moment(dispatchDate).isAfter(deliveryDate)) {
			setErrorMsg('Delivery date must be after dispatch date');
		} else {
			setErrorMsg('');
			manageOrderDispatchUpdate(
				row._id,
				deliveryStatus,
				dispatchDate,
				deliveryDate,
				row.employeeDetails
			);
			handleClose();
		}
	};

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Order Details</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className='h4 mb-5'>
					Order confirmation date: {new Date(row.orderDate).toLocaleDateString()}
				</div>
				<Form className='container mt-5'>
					<Form.Group className='row'>
						<Form.Label>Order Status:</Form.Label>
						<Form.Control
							as='select'
							value={deliveryStatus}
							onChange={(e) => setDispatchStatus(e.target.value)}
						>
							<option value="pending">Pending</option>
							<option value="dispatched">Dispatched</option>
							<option value="delivered">Delivered</option>
						</Form.Control>
					</Form.Group>
					<Form.Group className='row'>
						<Form.Group className='col-6 pl-0'>
							<Form.Label>Dispatch Date (MM/DD/YYYY)</Form.Label>
							<DatePicker
								className='form-control'
								selected={dispatchDate}
								onChange={(date) => setDispatchDate(date)}
								dateFormat='MM/dd/yyyy'
							/>
						</Form.Group>
						<Form.Group className='col-6 pr-0'>
							<Form.Label>Delivery Date (MM/DD/YYYY)</Form.Label>
							<DatePicker
								className='form-control'
								selected={deliveryDate}
								onChange={(date) => setDeliveryDate(date)}
								dateFormat='MM/dd/yyyy'
							/>
						</Form.Group>
					</Form.Group>
					<Form.Label className='row text-danger'>{errorMsg}</Form.Label>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant='primary' onClick={() => handleClose()} className="mr-10">
					Close
        </Button>
				<Button
					className={row.status === 'approved' ? 'd-none' : ''}
					variant='success'
					onClick={saveAction}
				>
					Save
        </Button>
			</Modal.Footer>
		</Modal>
	);
};

export default ViewModal;
