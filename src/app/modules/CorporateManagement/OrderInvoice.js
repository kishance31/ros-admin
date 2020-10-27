import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Form } from 'react-bootstrap';
import RecurringInvoice from './OrderInvoice/RecurringInvoice';
import { getCorporateOrderInvoiceAsync } from '../../actions/orderInvoice.action';

const OrderInvoice = () => {
	const [firstRecurringFlag, setFirstRecurringFlag] = useState("first");
	const orderInvoiceData = useSelector(
		(state) => state.orderInvoice.orderInvoiceData, shallowEqual
	);

	const dispatch = useDispatch();

	useEffect(() => {
		if (firstRecurringFlag === "first") {
			dispatch(getCorporateOrderInvoiceAsync(false))
		} else {
			dispatch(getCorporateOrderInvoiceAsync(true))
		}
	}, [firstRecurringFlag])

	return (
		<div className='p-4'>
			<div className='d-flex justify-content-start'>
				<div className='d-flex justify-content-start' style={{ maxWidth: "fit-content" }}>
					<Form.Control as="select"
						value={firstRecurringFlag}
						onChange={e => setFirstRecurringFlag(e.target.value)}
					>
						<option value="first">First Invoice</option>
						<option value="recurring">Recurring Invoice</option>
					</Form.Control>
				</div>
			</div>
			<RecurringInvoice
				recurringInvoiceData={orderInvoiceData}
				firstRecurringFlag={firstRecurringFlag}
			/>
		</div>
	);
};

export default OrderInvoice;
