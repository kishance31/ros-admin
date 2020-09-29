import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';

const ViewModal = ({ show, handleClose, orderDetails }) => {
  const columns = [
    {
      dataField: 'orderId',
      text: 'Sr no.',
    },

    {
      dataField: 'licenceType',
      text: 'Licence Type',
    },
    {
      dataField: 'noOfLicence',
      text: 'No of Licence',
    },
    {
      dataField: 'licenceCost',
      text: 'Licence Cost',
    },
  ];

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Order Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <BootstrapTable
          keyField='orderId'
          data={orderDetails === null ? [] : orderDetails}
          columns={columns}
          bordered={false}
          noDataIndication='No records found!'
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant='primary' onClick={() => handleClose()}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewModal;
