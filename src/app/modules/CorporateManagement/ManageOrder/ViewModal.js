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
  const [dispatchDate, setDispatchDate] = useState(row.dispatchDate);
  const [deliveryDate, setDeliveryDate] = useState(row.deliveryDate);
  const [dispatchStatus, setDispatchStatus] = useState(
    row.dispatchStatus ? 'Yes' : 'No'
  );
  const [errorMsg, setErrorMsg] = useState('');

  const saveAction = () => {
    if (
      dispatchDate === '' ||
      dispatchDate === null ||
      deliveryDate === '' ||
      deliveryDate === null ||
      dispatchStatus === 'No'
    ) {
      setErrorMsg('Not valid dispatch status / Date');
    } else if (moment(dispatchDate).isAfter(deliveryDate)) {
      setErrorMsg('Not valid dispatch Date');
    } else {
      manageOrderDispatchUpdate(
        orderId,
        row.newOrderId,
        dispatchStatus,
        dispatchDate,
        deliveryDate
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
          Order confirmation date: {row.orderConfirmDate}
        </div>
        <Form className='container mt-5'>
          <Form.Group className='row'>
            <Form.Label>Dispatch Status:</Form.Label>
            <Form.Control
              as='select'
              value={dispatchStatus}
              onChange={(e) => setDispatchStatus(e.target.value)}
            >
              <option>No</option>
              <option>Yes</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className='row'>
            <Form.Group className='col-6 pl-0'>
              <Form.Label>Dispatch Date</Form.Label>
              <DatePicker
                className='form-control'
                selected={dispatchDate}
                onChange={(date) => setDispatchDate(date)}
                dateFormat='dd/MM/yyyy'
              />
            </Form.Group>
            <Form.Group className='col-6 pr-0'>
              <Form.Label>Delivery Date</Form.Label>
              <DatePicker
                className='form-control'
                selected={deliveryDate}
                onChange={(date) => setDeliveryDate(date)}
                dateFormat='dd/MM/yyyy'
              />
            </Form.Group>
          </Form.Group>
          <Form.Label className='row text-danger'>{errorMsg}</Form.Label>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className={row.status === 'approved' ? 'd-none' : ''}
          variant='success'
          onClick={saveAction}
        >
          Save
        </Button>
        <Button variant='primary' onClick={() => handleClose()}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewModal;
