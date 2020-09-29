import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ViewModal = ({ show, handleClose, row, approveRejectAction }) => {
  const approveAction = () => {
    approveRejectAction(row.companyId, 'approved');
    handleClose();
  };
  const rejectAction = () => {
    approveRejectAction(row.companyId, 'rejected');
    handleClose();
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Corporate Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className='container'>
          <Form.Group className='row'>
            <Form.Label className='col-3 align-self-center'>
              Company Name:
            </Form.Label>
            <Form.Control
              className='col-9'
              type='text'
              placeholder={row.companyName}
              readOnly
            />
          </Form.Group>
          <Form.Group className='row'>
            <Form.Label className='col-3 align-self-center'>
              First Name:
            </Form.Label>
            <Form.Control
              className='col-9'
              type='text'
              placeholder={row.firstName}
              readOnly
            />
          </Form.Group>
          <Form.Group className='row'>
            <Form.Label className='col-3 align-self-center'>
              Last Name:
            </Form.Label>
            <Form.Control
              className='col-9'
              type='text'
              placeholder={row.lastName}
              readOnly
            />
          </Form.Group>
          <Form.Group className='row'>
            <Form.Label className='col-3 align-self-center'>
              Email ID:
            </Form.Label>
            <Form.Control
              className='col-9'
              type='text'
              placeholder={row.emailId}
              readOnly
            />
          </Form.Group>
          <Form.Group className='row'>
            <Form.Label className='col-3 align-self-center'>Mobile:</Form.Label>
            <Form.Control
              className='col-9'
              type='text'
              placeholder={row.mobile}
              readOnly
            />
          </Form.Group>
          <Form.Group className='row'>
            <Form.Label className='col-3 align-self-center'>Status:</Form.Label>
            <Form.Control
              className='col-9'
              type='text'
              placeholder={row.status}
              readOnly
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className={row.status === 'approved' ? 'd-none' : ''}
          variant='success'
          onClick={approveAction}
        >
          Approve
        </Button>
        <Button
          className={row.status === 'rejected' ? 'd-none' : ''}
          variant='danger'
          onClick={rejectAction}
        >
          Reject
        </Button>
        <Button variant='primary' onClick={() => handleClose()}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewModal;
