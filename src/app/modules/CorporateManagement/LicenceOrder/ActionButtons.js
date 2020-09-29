import React from 'react';
import ViewModal from './ViewModal';
import { Button } from 'react-bootstrap';

const ActionButtons = ({ row }) => {
  const [show, setShow] = React.useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  return (
    <>
      <Button
        className='mx-3'
        size='sm'
        variant='outline-primary'
        onClick={() => handleShow()}
      >
        Order Details
      </Button>
      <ViewModal
        show={show}
        handleClose={handleClose}
        orderDetails={row.orderDetails}
      />
      <Button className='mx-3' size='sm' variant='outline-success'>
        View Invoice
      </Button>
      <Button className='mx-3' size='sm' variant='outline-warning'>
        Resend Invoice
      </Button>
      <Button className='mx-3' size='sm' variant='outline-info'>
        Download
      </Button>
    </>
  );
};

export default (cell, row, rowIndex) => <ActionButtons row={row} />;
