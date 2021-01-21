import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import NewOrder from './NewOrder';
// import PastOrder from './PastOrder';

const ExpandedRowLevelOne = ({
	row,
	confirmNewOrder,
	manageOrderDispatchUpdate,
}) => {
	const [newPastFlag, setNewPastFlag] = useState("new");
	return (
		<div className='p-4'>
			<div className='d-flex justify-content-start' style={{ maxWidth: "fit-content" }}>
				<Form.Control as="select"
					value={newPastFlag}
					onChange={e => setNewPastFlag(e.target.value)}
				>
					<option value="new">Pending Order</option>
					<option value="past">Dispatched/Delivered Order</option>
				</Form.Control>
			</div>
			<NewOrder
				row={newPastFlag === "new" ? row.newOrder : row.pastOrder}
				confirmNewOrder={confirmNewOrder}
				manageOrderDispatchUpdate={manageOrderDispatchUpdate}
			/>
		</div>
	);
};

export default ExpandedRowLevelOne;
