import React from 'react';
import { Button } from 'react-bootstrap';

const RecurringInvoiceActionButtons = () => {
  return (
    <>
      <Button className='mx-1 btn_blue' size='sm' variant=''>
        View Invoice
      </Button>
      <Button className='mx-1 btn-success' size='sm' variant=''>
        Resend Invoice
      </Button>
      <Button className='mx-1 btn-danger' size='sm' variant=''>
        Download
      </Button>
    </>
  );
};

export default (cell, row, rowIndex) => <RecurringInvoiceActionButtons />;
