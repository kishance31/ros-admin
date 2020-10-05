import React from 'react';
import { Button } from 'react-bootstrap';

const RecurringInvoiceActionButtons = () => {
  return (
    <>
      <Button className='mx-1' size='sm' variant='outline-primary'>
        View Invoice
      </Button>
      <Button className='mx-1' size='sm' variant='outline-success'>
        Resend Invoice
      </Button>
      <Button className='mx-1' size='sm' variant='outline-info'>
        Download
      </Button>
    </>
  );
};

export default (cell, row, rowIndex) => <RecurringInvoiceActionButtons />;
