import React from 'react';
import { Button } from 'react-bootstrap';

export const ActionButtons = (cell, row, rowIdx, {handleShow, onDownloadPdf}) => {

  return (
    <>
      <Button
        className='mx-3'
        size='sm'
        variant='outline-primary'
        onClick={() => handleShow(row)}
      >
        Order Details
      </Button>
      {/* <Button className='mx-3' size='sm' variant='outline-success'>
        View Invoice
      </Button>
      <Button className='mx-3' size='sm' variant='outline-warning'>
        Resend Invoice
      </Button> */}
      <Button className='mx-3' size='sm' variant='outline-info'
        onClick={() => onDownloadPdf(row)}
      >
        Download
      </Button>
    </>
  );
};
