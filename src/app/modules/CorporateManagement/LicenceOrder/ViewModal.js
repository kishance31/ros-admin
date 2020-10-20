import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';

const ViewModal = ({ show, handleClose, orderDetails }) => {
  const columns = [
    {
      dataField: '_id',
      text: 'id',
      hidden: true,
    },

    {
      dataField: 'licenceType',
      text: 'Licence Type',
      formatter: (cell, row, rowIdx) => orderDetails.licenseDetails[rowIdx].type
    },
    {
      dataField: 'quantity',
      text: 'No of Licence',
    },
    {
      dataField: 'totalPrice',
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
          keyField='_id'
          data={orderDetails && orderDetails.purchasedLicenses ? orderDetails.purchasedLicenses : []}
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
